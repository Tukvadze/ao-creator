#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Confluence 3D Card Creator - CLI Version
Принимает параметры через командную строку для автоматического создания карточки
"""

import sys
import os
import argparse
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


def setup_logging(verbose=False):
    """Настройка логирования"""
    log_dir = Path(__file__).parent / "logs"
    log_dir.mkdir(exist_ok=True)

    level = logging.DEBUG if verbose else logging.INFO

    logging.basicConfig(
        level=level,
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


def create_card_auto(folder_name: str, card_name: str, verbose: bool = False) -> dict:
    """
    Автоматическое создание карточки без интерактивного ввода

    Args:
        folder_name: Название папки (например "Attachments 2026")
        card_name: Название карточки (например "[3D att] T90M_01")
        verbose: Подробный вывод

    Returns:
        dict с результатом: {"success": bool, "url": str, "error": str}
    """
    setup_logging(verbose)
    logger = logging.getLogger(__name__)

    try:
        # Загрузка конфигурации
        config = load_config()

        # Подключение к Confluence
        if verbose:
            print("🔄 Подключение к Confluence...")

        client = ConfluenceClient()

        if not client.test_connection():
            return {"success": False, "error": "Failed to connect to Confluence"}

        if verbose:
            print(f"✓ Подключен к {client.url}")

        # Поиск родительской страницы
        parent_title = config['confluence']['parent_page_title']
        parent_page = client.get_page_by_title(parent_title)

        if not parent_page:
            return {"success": False, "error": f"Parent page not found: {parent_title}"}

        # Поиск шаблона
        template_title = config['confluence']['template_page_title']
        template_page = client.get_page_by_title(template_title)

        if not template_page:
            return {"success": False, "error": f"Template not found: {template_title}"}

        # Получение списка папок
        child_pages = client.get_child_pages(parent_page['id'])

        # Поиск целевой папки
        target_folder = None
        excluded_folders = config['folders']['exclude_from_selection']

        for page in child_pages:
            title = page.get('title', '')
            if title == folder_name and title not in excluded_folders:
                target_folder = page
                break

        if not target_folder:
            available = [p['title'] for p in child_pages if p['title'] not in excluded_folders]
            return {
                "success": False,
                "error": f"Folder '{folder_name}' not found. Available: {', '.join(available)}"
            }

        if verbose:
            print(f"✓ Найдена папка: {target_folder['title']}")
            print(f"🔄 Создание карточки: {card_name}")

        # Копирование карточки
        new_page = client.copy_page(
            source_page_id=template_page['id'],
            parent_page_id=target_folder['id'],
            new_title=card_name
        )

        if not new_page:
            return {"success": False, "error": "Failed to copy template"}

        # Получение URL
        page_url = client.get_page_url(new_page['id'])

        logger.info(f"✓ Карточка создана: {card_name} -> {page_url}")

        return {
            "success": True,
            "url": page_url,
            "page_id": new_page['id'],
            "folder": target_folder['title'],
            "card_name": card_name
        }

    except Exception as e:
        logger.error(f"Ошибка создания карточки: {e}", exc_info=True)
        return {"success": False, "error": str(e)}


def main():
    """Точка входа CLI"""
    parser = argparse.ArgumentParser(
        description='Create Confluence 3D ATT card automatically'
    )
    parser.add_argument(
        '--folder',
        required=True,
        help='Target folder name (e.g., "Attachments 2026")'
    )
    parser.add_argument(
        '--name',
        required=True,
        help='Card name (e.g., "[3D att] T90M_01")'
    )
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Verbose output'
    )
    parser.add_argument(
        '--json',
        action='store_true',
        help='Output result as JSON'
    )

    args = parser.parse_args()

    # Создание карточки
    result = create_card_auto(args.folder, args.name, args.verbose)

    # Вывод результата
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        if result['success']:
            print(f"\n✅ КАРТОЧКА СОЗДАНА!")
            print(f"📄 Название: {result['card_name']}")
            print(f"📂 Папка: {result['folder']}")
            print(f"🔗 URL: {result['url']}\n")
        else:
            print(f"\n❌ ОШИБКА: {result['error']}\n")
            sys.exit(1)


if __name__ == "__main__":
    main()
