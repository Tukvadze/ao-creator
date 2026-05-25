# Git & GitHub - Полное Руководство для AO Creator

## 📍 Где находится твой код сейчас

### Локально (на твоём компьютере)
```
C:\AI\AO Creator\
├── .git/                    ← Git репозиторий (история всех изменений)
├── src/                     ← Исходный код
├── backend/                 ← Backend код
└── ... все файлы проекта
```

**Ветка:** `main`
**Коммитов:** 6
**Статус:** Всё сохранено локально, но НЕ на GitHub

### На GitHub (в интернете)
**Статус:** 🔴 **Репозиторий ещё не создан!**

URL будет: `https://github.com/Tukvadze/ao-creator`

---

## 🔄 Как работает Git + GitHub

### Схема:

```
┌─────────────────────────────────────┐
│   Твой компьютер (Local)            │
│   C:\AI\AO Creator\                 │
│                                     │
│   Working Directory                 │
│   (файлы, которые ты редактируешь)  │
│           ↓                         │
│   git add .                         │
│           ↓                         │
│   Staging Area                      │
│   (файлы готовые к коммиту)         │
│           ↓                         │
│   git commit -m "..."               │
│           ↓                         │
│   Local Repository (.git/)          │
│   (история всех коммитов)           │
│           ↓                         │
│   git push                          │
└───────────┼───────────────────────┘
            │ интернет
            ↓
┌─────────────────────────────────────┐
│   GitHub (Remote)                   │
│   https://github.com/Tukvadze/      │
│         ao-creator                  │
│                                     │
│   Remote Repository                 │
│   (код доступен всем)               │
└─────────────────────────────────────┘
```

---

## 📝 Что такое Коммит (Commit)?

**Коммит = снимок всех изменений**

Это как "сохранить игру" в определённый момент:
- Ты можешь вернуться к любому коммиту
- У каждого коммита есть автор, дата, описание
- Коммиты связаны в цепочку (история)

### Пример коммитов в AO Creator:

```
6a5c73e ← HEAD (где ты сейчас)
│ Add hidden startup script without CMD window
│
9ae6faa
│ Add release summary
│
68bd5fd
│ Add GitHub setup instructions
│
22bf474
│ Add comprehensive GitHub README
│
5c2b40a
│ Add GitHub deployment configuration
│
bd0155d ← Первый коммит
  Initial release of AO Creator v1.0
```

---

## 🎯 Куда Коммитится Код?

### Когда ты делаешь `git commit`:

Код сохраняется **ТОЛЬКО локально** в:
```
C:\AI\AO Creator\.git\
```

Это **скрытая папка** с историей всех изменений.

**НЕ** отправляется на GitHub автоматически!

### Чтобы отправить на GitHub нужен `git push`

---

## 🚀 Пошаговая Инструкция: От Изменения До GitHub

### Сценарий: Ты изменил файл

```bash
# 1. Проверь что изменилось
cd "C:\AI\AO Creator"
git status

# Увидишь:
# modified:   src/App.jsx

# 2. Добавь изменения в staging area
git add .

# Или конкретный файл:
# git add src/App.jsx

# 3. Проверь что добавилось
git status

# Увидишь:
# Changes to be committed:
#   modified:   src/App.jsx

# 4. Сделай коммит с описанием
git commit -m "Fix bug in App.jsx

Detailed description of what you changed and why.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Увидишь:
# [main abc1234] Fix bug in App.jsx
#  1 file changed, 5 insertions(+), 2 deletions(-)

# 5. Отправь на GitHub
git push

# Увидишь:
# Counting objects: 3, done.
# Writing objects: 100% (3/3), 312 bytes | 312.00 KiB/s, done.
# To https://github.com/Tukvadze/ao-creator.git
#    6a5c73e..abc1234  main -> main
```

---

## 📤 Git Push - Когда и Как

### Когда пушить на GitHub?

**Хорошие моменты:**
- ✅ Завершил фичу (например, добавил новую кнопку)
- ✅ Исправил баг
- ✅ В конце рабочего дня (чтобы не потерять работу)
- ✅ Перед переключением на другую задачу
- ✅ Когда хочешь поделиться с командой

**Не стоит пушить:**
- ❌ После каждой строчки кода
- ❌ Если код не работает (сломан)
- ❌ Если забыл добавить commit message
- ❌ Если в коде есть пароли/токены (проверь .gitignore!)

### Как пушить:

```bash
cd "C:\AI\AO Creator"

# Простой push (если уже настроено)
git push

# Первый push (устанавливает связь с GitHub)
git push -u origin main

# Push с проверкой
git status              # Проверь что коммиты есть
git log --oneline -3    # Посмотри последние коммиты
git push                # Отправь
```

---

## 🏗️ Как Правильно Создать Репозиторий на GitHub

### Сейчас у тебя:
- ✅ Локальный Git репозиторий (6 коммитов)
- ✅ Remote настроен: `origin → https://github.com/Tukvadze/ao-creator.git`
- ❌ Репозиторий на GitHub **не создан**

### Пошагово:

#### Шаг 1: Создай репозиторий на GitHub

1. Открой: **https://github.com/new**

2. Заполни форму:
   ```
   Repository name: ao-creator
   Description: Create Confluence 3D Attachment cards with ease
   Visibility: ● Public  ○ Private
   
   ⚠️ ВАЖНО: НЕ СТАВЬ ГАЛОЧКИ!
   ☐ Add a README file          ← НЕ СТАВЬ! (у тебя уже есть)
   ☐ Add .gitignore             ← НЕ СТАВЬ! (у тебя уже есть)
   ☐ Choose a license           ← НЕ СТАВЬ!
   ```

3. Нажми **"Create repository"**

4. GitHub покажет инструкции. **НЕ СЛЕДУЙ ИМ!** У тебя уже всё настроено.

#### Шаг 2: Запушь код

```bash
cd "C:\AI\AO Creator"

# Проверь что remote правильный
git remote -v
# Должно быть: origin  https://github.com/Tukvadze/ao-creator.git

# Запушь все 6 коммитов
git push -u origin main
```

Увидишь что-то вроде:
```
Enumerating objects: 150, done.
Counting objects: 100% (150/150), done.
Delta compression using up to 8 threads
Compressing objects: 100% (120/120), done.
Writing objects: 100% (150/150), 52.34 KiB | 3.27 MiB/s, done.
Total 150 (delta 35), reused 0 (delta 0)
remote: Resolving deltas: 100% (35/35), done.
To https://github.com/Tukvadze/ao-creator.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

#### Шаг 3: Проверь

Открой: **https://github.com/Tukvadze/ao-creator**

Должен увидеть:
- ✅ Все файлы
- ✅ README.md (красиво отображается)
- ✅ 6 коммитов в истории
- ✅ Зелёную кнопку "Code"

---

## 🔄 Ежедневный Workflow

### Утром (обновить код):

```bash
cd "C:\AI\AO Creator"
git pull    # Скачивает изменения с GitHub (если работаешь в команде)
```

### В течение дня (работаешь):

```bash
# Делаешь изменения в файлах
# ...

# Периодически сохраняешь локально
git add .
git commit -m "Описание изменений"

# Можешь делать несколько коммитов
# Они сохраняются локально в .git/
```

### Вечером (сохранить на GitHub):

```bash
git push    # Отправляет ВСЕ локальные коммиты на GitHub
```

---

## 📊 Полезные Команды

### Проверка Статуса

```bash
# Что изменилось?
git status

# Какие коммиты есть?
git log --oneline

# Последние 5 коммитов
git log --oneline -5

# Красивая история с графом
git log --oneline --graph --all

# Что изменилось в файлах?
git diff

# Где мой код (локально или на GitHub)?
git remote -v
```

### Работа с Коммитами

```bash
# Создать коммит
git commit -m "Краткое описание

Подробное описание что и зачем изменил.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Добавить файлы к последнему коммиту (если забыл)
git add забытый_файл.txt
git commit --amend --no-edit

# Посмотреть детали коммита
git show 6a5c73e
```

### Работа с GitHub

```bash
# Отправить на GitHub
git push

# Скачать с GitHub
git pull

# Скачать только если есть изменения (безопаснее)
git fetch
git merge origin/main
```

---

## 🎯 Типичные Сценарии

### Сценарий 1: Первая Публикация (сейчас)

```bash
# 1. Создай репозиторий на GitHub (через браузер)
#    https://github.com/new

# 2. Запушь код
cd "C:\AI\AO Creator"
git push -u origin main

# Готово! Код на GitHub
```

### Сценарий 2: Добавил Новую Фичу

```bash
cd "C:\AI\AO Creator"

# Внёс изменения в файлы...

# Сохранить локально
git add .
git commit -m "Add new feature: bulk card creation

Added ability to create multiple cards at once.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Отправить на GitHub
git push
```

### Сценарий 3: Исправил Баг

```bash
cd "C:\AI\AO Creator"

# Исправил баг...

# Сохранить и отправить
git add .
git commit -m "Fix token expiration detection bug

The warning was not showing when token expired.
Fixed comparison logic in CreateCardForm.jsx.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

git push
```

### Сценарий 4: Работа в Конце Дня

```bash
cd "C:\AI\AO Creator"

# Проверить что есть несохранённое
git status

# Если есть изменения
git add .
git commit -m "Work in progress: refactoring backend

Not finished yet, will continue tomorrow.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Отправить на GitHub (чтобы не потерять)
git push
```

---

## 🔐 Безопасность

### Что НИКОГДА не коммитить:

```bash
# Проверь .gitignore:
cat .gitignore

# Должно быть:
.env                              ← ТОКЕНЫ!
backend/confluence-agent/.env     ← ТОКЕНЫ!
node_modules/                     ← Зависимости
backend/confluence-agent/venv/    ← Python окружение
*.log                             ← Логи
```

### Перед каждым коммитом:

```bash
git status    # Посмотри что добавляется
git diff      # Посмотри изменения

# Убедись что НЕТ:
# - backend/confluence-agent/.env
# - Файлов с токенами/паролями
# - node_modules/
```

---

## 📈 Как Проверить Что Всё Работает

### После Push на GitHub:

1. **Открой репозиторий:**
   ```
   https://github.com/Tukvadze/ao-creator
   ```

2. **Проверь:**
   - ✅ Файлы все на месте?
   - ✅ README отображается?
   - ✅ Commits → видны все коммиты?
   - ✅ Actions → workflow запустился? (если настроен GitHub Pages)

3. **Проверь локально:**
   ```bash
   cd "C:\AI\AO Creator"
   git log --oneline
   git status
   # Должно быть: "nothing to commit, working tree clean"
   ```

---

## 🆚 Сравнение: AO Tracker vs AO Creator

### AO Tracker (уже на GitHub)

```bash
cd "C:\AI\AO Tracker"
git remote -v
# origin  https://github.com/Tukvadze/ao-tracker.git

git push    # ← Работает, репозиторий существует
```

### AO Creator (пока только локально)

```bash
cd "C:\AI\AO Creator"
git remote -v
# origin  https://github.com/Tukvadze/ao-creator.git

git push    # ← НЕ работает, репозиторий НЕ создан на GitHub
```

**Решение:** Создай репозиторий на GitHub (https://github.com/new)

---

## 📋 Чек-лист Для Первой Публикации

- [ ] Локальный Git репозиторий создан (у тебя ✅)
- [ ] Есть коммиты (у тебя ✅ 6 штук)
- [ ] Remote настроен (у тебя ✅)
- [ ] .gitignore настроен (у тебя ✅)
- [ ] Нет .env файлов в git (у тебя ✅)
- [ ] **Создать репозиторий на GitHub** (❌ сделай это)
- [ ] **Запушить код** `git push -u origin main` (❌ после создания репо)
- [ ] Проверить что всё на месте (❌ после push)

---

## 🎓 Итоговая Шпаргалка

### Каждый раз когда меняешь код:

```bash
cd "C:\AI\AO Creator"

# 1. Посмотреть что изменилось
git status

# 2. Добавить всё
git add .

# 3. Сделать коммит
git commit -m "Краткое описание

Подробности.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 4. Отправить на GitHub (по желанию)
git push
```

### Первый раз (сейчас):

```bash
# 1. Создай репо на GitHub: https://github.com/new
#    Имя: ao-creator
#    Галочки: НЕ ставить!

# 2. Запушь код
cd "C:\AI\AO Creator"
git push -u origin main

# Готово!
```

---

## ❓ FAQ

**Q: Сколько коммитов делать в день?**
A: Сколько хочешь! Каждый раз когда закончил логическую часть работы.

**Q: Как часто пушить на GitHub?**
A: Минимум раз в день (вечером). Чаще - лучше.

**Q: Что если ошибся в commit message?**
A: До push: `git commit --amend`. После push: оставь как есть или сделай новый коммит.

**Q: Можно удалить коммит?**
A: Локально - да (`git reset`). С GitHub - нежелательно если кто-то уже скачал.

**Q: Что делать если забыл .gitignore и запушил токен?**
A: 
1. Удали файл: `git rm backend/confluence-agent/.env`
2. Коммит: `git commit -m "Remove .env file"`
3. Push: `git push`
4. **ОБЯЗАТЕЛЬНО:** Смени токен на Confluence!

**Q: Как посмотреть что на GitHub?**
A: Открой https://github.com/Tukvadze/ao-creator в браузере

---

## 🎯 Твои Следующие Шаги

1. **Создай репозиторий на GitHub:**
   - Открой: https://github.com/new
   - Имя: `ao-creator`
   - Без галочек!
   - Create repository

2. **Запушь код:**
   ```bash
   cd "C:\AI\AO Creator"
   git push -u origin main
   ```

3. **Проверь результат:**
   - https://github.com/Tukvadze/ao-creator

4. **Дальше используй постоянно:**
   ```bash
   git add .
   git commit -m "..."
   git push
   ```

**Удачи! 🚀**
