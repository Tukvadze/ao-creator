#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Get available Confluence folders
Returns list of child pages (folders) under parent page
"""

import sys
import os
import json
import logging
from pathlib import Path

# Добавляем текущую директорию в путь для импорта
sys.path.insert(0, str(Path(__file__).parent))

from agent.confluence_client import ConfluenceClient

# Исправление кодировки для Windows
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.detach())
    os.environ['PYTHONIOENCODING'] = 'utf-8'


def setup_logging():
    """Настройка логирования"""
    log_dir = Path(__file__).parent / "logs"
    log_dir.mkdir(exist_ok=True)

    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_dir / 'operations.log', encoding='utf-8')
        ]
    )


def load_config():
    """Загрузка конфигурации"""
    config_path = Path(__file__).parent / "config" / "settings.json"
    with open(config_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def get_folders() -> dict:
    """
    Получить список доступных папок из Confluence

    Returns:
        dict с результатом: {"success": bool, "folders": [str], "error": str}
    """
    setup_logging()
    logger = logging.getLogger(__name__)

    try:
        # Загрузка конфигурации
        config = load_config()

        # Подключение к Confluence
        client = ConfluenceClient()

        if not client.test_connection():
            return {"success": False, "error": "Failed to connect to Confluence"}

        # Поиск родительской страницы
        parent_title = config['confluence']['parent_page_title']
        parent_page = client.get_page_by_title(parent_title)

        if not parent_page:
            return {"success": False, "error": f"Parent page not found: {parent_title}"}

        # Получение списка папок
        child_pages = client.get_child_pages(parent_page['id'])

        # Фильтрация - исключаем шаблон и другие служебные страницы
        excluded_folders = config['folders']['exclude_from_selection']
        folders = [
            page['title']
            for page in child_pages
            if page['title'] not in excluded_folders
        ]

        # Сортировка по названию
        folders.sort()

        logger.info(f"✓ Найдено папок: {len(folders)}")

        return {
            "success": True,
            "folders": folders
        }

    except Exception as e:
        logger.error(f"Ошибка получения папок: {e}", exc_info=True)
        return {"success": False, "error": str(e)}


def main():
    """Точка входа CLI"""
    result = get_folders()
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
