[![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

repo link: https://github.com/ds-sev/express-mesto-gha

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
`/middlewares` - папка с промежуточными обработчиками авторизации, ошибок и валидации  
`/utils` - папка для хранения переиспользуемых переменных и регулярных выражений

📝 **ТЗ:**

* Разработать бэкенд для ранее созданного проекта Место. 

⚙️ **Реализованный функционал:** 

* Регистрация, аутентификация и авторизация пользователя
* Обновление данных пользователя
* Получение информации о зарегистрированных в базе пользователях по id
* Получение информации о текущем пользователе
* Получение списка всех загруженных карточек
* Добавление новой карточки
* Удаление своей ранее созданной карточки
* Постановка и снятие лайков для карточек
* Валидация пользовательского ввода и запрет отправки запроса к серверу при невалидных данных
* Централизованная обработка ошибок

🛠️ **Примененные технологии:**

* NodeJS
* Express
* Mongoose
* MongoDB

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
