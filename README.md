### Hexlet tests and linter status:
[![Actions Status](https://github.com/Ledloy/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Ledloy/qa-auto-engineer-javascript-project-87/actions)

[![CI](https://github.com/Ledloy/qa-auto-engineer-javascript-project-87/actions/workflows/ci.yml/badge.svg)](https://github.com/Ledloy/qa-auto-engineer-javascript-project-87/actions)

[![Maintainability](https://sonarcloud.io/api/project_badges/measure?project=Ledloy%3Aqa-auto-engineer-javascript-project-87&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=Ledloy%3Aqa-auto-engineer-javascript-project-87)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Ledloy%3Aqa-auto-engineer-javascript-project-87&metric=coverage)](https://sonarcloud.io/dashboard?id=Ledloy%3Aqa-auto-engineer-javascript-project-87)

# Вычислитель отличий (QA JS)

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

## Возможности утилиты

- Поддержка разных входных форматов: **yaml**, **json**
- Генерация отчета в виде **plain text**, **stylish** и **json**

## Пример использования

<details>
<summary><strong>Этап 1: Сравнение JSON файлов</strong> (нажмите, чтобы развернуть)</summary>

Первоначальная реализация поддерживала только JSON формат.

[![asciicast](https://asciinema.org/a/A5QhDAJCExzyCZoP.svg?cols=80&rows=15)](https://asciinema.org/a/A5QhDAJCExzyCZoP)

**Команда:** `gendiff fixtures/file1.json fixtures/file2.json`

</details>

<details>
<summary><strong>Этап 2: Сравнение YAML файлов</strong> (нажмите, чтобы развернуть)</summary>

Добавлена поддержка YAML файлов (.yml, .yaml) наряду с JSON.

[![asciicast](https://asciinema.org/a/QL7pLajMH2z0Dr5l.svg?cols=80&rows=15)](https://asciinema.org/a/QL7pLajMH2z0Dr5l)

**Команды:**

- `gendiff __fixtures__/before.yml __fixtures__/after.yml` — stylish формат
- `gendiff __fixtures__/before.yml __fixtures__/after.yml -f plain` — plain формат
- `gendiff __fixtures__/before.yml __fixtures__/after.yml -f json` — json формат

</details>

## Установка

```bash
npm install
npm link
```
## Быстрый старт

#### 1. Клонировать репозиторий
```bash
git clone <url-репозитория>
```
```bash
cd (ваша директория проекта)
```

#### 2. Установить зависимости
```bash
npm install
```
#### 3. Сделать утилиту доступной глобально
```bash
npm link
```

#### 4. Проверить работу
```bash
gendiff --version
```

## Запуск тестов
```bash
npm test
npm run test-coverage
```

### YAML файлы (stylish по умолчанию)
```bash
gendiff path/to/file1.yml path/to/file2.yml
```
### JSON файлы
```bash
gendiff path/to/file1.json path/to/file2.json
```
### С указанием формата
```bash
gendiff path/to/file1.yml path/to/file2.yml -f stylish
gendiff path/to/file1.yml path/to/file2.yml -f plain
gendiff path/to/file1.yml path/to/file2.yml -f json
```

## Поддерживаемые форматы
#### JSON (.json)|YAML (.yml, .yaml)
