brew install k6
export PATH=:/usr/local/Cellar/k6/0.41.0/bin

k6 run student_curator_chat/test.js

common/settings.js - для настройки соединений 
common/setup.js - для настройки пользователей 
common/option.js - для настройки продолжительности теста 
{duration (продолжительность стадии теста): '20s', target (количество пользователей): 20, vus (максимальное колличество одновременных пользователей): 20},