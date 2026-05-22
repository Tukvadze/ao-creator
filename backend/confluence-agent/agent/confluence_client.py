"""
Confluence API Client
Управление подключением и базовыми операциями с Confluence
"""

import os
import urllib.parse
from atlassian import Confluence
from dotenv import load_dotenv
from typing import Optional, Dict, List
import logging

logger = logging.getLogger(__name__)


class ConfluenceClient:
    """Клиент для работы с Confluence API"""

    def __init__(self):
        load_dotenv()

        self.url = os.getenv('CONFLUENCE_URL')
        self.email = os.getenv('CONFLUENCE_EMAIL')
        self.api_token = os.getenv('CONFLUENCE_API_TOKEN')

        if not all([self.url, self.api_token]):
            raise ValueError(
                "❌ Не найдены credentials в .env файле!\n"
                "Убедитесь что заданы: CONFLUENCE_URL, CONFLUENCE_API_TOKEN"
            )

        # Для Personal Access Token используем token-based auth
        self.confluence = Confluence(
            url=self.url,
            token=self.api_token,
            cloud=False  # Wargaming использует on-premise Confluence
        )

        logger.info(f"Подключение к Confluence: {self.url}")

    def test_connection(self) -> bool:
        """Проверка подключения к Confluence"""
        try:
            # Простой запрос для проверки авторизации
            self.confluence.get_all_spaces(start=0, limit=1)
            logger.info("✓ Успешное подключение к Confluence")
            return True
        except Exception as e:
            logger.error(f"❌ Ошибка подключения: {e}")
            return False

    def get_page_by_title(self, title: str, space_key: Optional[str] = None) -> Optional[Dict]:
        """Получить страницу по названию"""
        try:
            result = self.confluence.get_page_by_title(
                space=space_key,
                title=title,
                expand='body.storage,version,ancestors'
            )

            if result:
                logger.info(f"✓ Найдена страница: {title}")
                return result
            else:
                logger.warning(f"⚠ Страница не найдена: {title}")
                return None

        except Exception as e:
            logger.error(f"❌ Ошибка поиска страницы '{title}': {e}")
            return None

    def get_child_pages(self, page_id: str) -> List[Dict]:
        """Получить дочерние страницы"""
        try:
            children = self.confluence.get_page_child_by_type(
                page_id=page_id,
                type='page',
                expand='version',
                start=0,
                limit=100
            )

            logger.info(f"✓ Найдено дочерних страниц: {len(children)}")
            return children

        except Exception as e:
            logger.error(f"❌ Ошибка получения дочерних страниц: {e}")
            return []

    def copy_page(
        self,
        source_page_id: str,
        parent_page_id: str,
        new_title: str
    ) -> Optional[Dict]:
        """Копировать страницу"""
        try:
            # Получаем контент исходной страницы
            source_page = self.confluence.get_page_by_id(
                page_id=source_page_id,
                expand='body.storage,space'
            )

            if not source_page:
                logger.error("❌ Не удалось получить исходную страницу")
                return None

            # Создаем новую страницу с тем же контентом
            new_page = self.confluence.create_page(
                space=source_page['space']['key'],
                title=new_title,
                body=source_page['body']['storage']['value'],
                parent_id=parent_page_id
            )

            logger.info(f"✓ Страница скопирована: {new_title}")
            return new_page

        except Exception as e:
            logger.error(f"❌ Ошибка копирования страницы: {e}")
            return None

    def get_page_url(self, page_id: str) -> str:
        """Получить URL страницы в правильном формате"""
        try:
            # Получаем информацию о странице
            page = self.confluence.get_page_by_id(
                page_id=page_id,
                expand='space'
            )

            if page:
                space_key = page['space']['key']
                # URL-encode названия для правильной ссылки
                title_encoded = urllib.parse.quote(page['title'], safe='')
                # Правильный формат: /spaces/SPACE/pages/ID/Title
                return f"{self.url}/spaces/{space_key}/pages/{page_id}/{title_encoded}"
            else:
                # Fallback на старый формат если не удалось получить данные
                return f"{self.url}/wiki/pages/viewpage.action?pageId={page_id}"

        except Exception as e:
            logger.warning(f"⚠ Не удалось построить URL, используем fallback: {e}")
            return f"{self.url}/wiki/pages/viewpage.action?pageId={page_id}"
