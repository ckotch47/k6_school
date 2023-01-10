brew install k6
export PATH=:/usr/local/Cellar/k6/0.41.0/bin

k6 run student_curator_chat/test.js

common/settings.js - для настройки соединений


для настройки id класса нового пользователя, тарифа и роли. Так же указывается количество пользователей для регистрации и для логина


common/setup.js - для студентов берет данные из файла.


common/option.js - для настройки теста


перед первым запуском запустить скрипт для регисрации пользователей helper/register.student.js. И скрипт для авторизации пользователей helper/login.student.js
