#!/usr/bin/env sh

# Нам нужны собранные и доступные по http вендорные файлы фрагмента
yarn serve-static &
yarn serve-hat &
# Теперь можно стартануть сборку компоновщика
{ rimraf dist/composer/* && webpack -c src/client/composer/webpack.config.dll.js && webpack -c src/client/composer/webpack.config.js; } &
# Ждём завершения последнего процесса в бекграунде
wait $!
# Теперь можно остановить серверы, запущенные в бекграунде в начале
pkill -P $$

