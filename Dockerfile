# Используем официальный образ Node.js для сборки приложения
FROM node:22 AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app


# Копируем остальные файлы приложения в контейнер
COPY . .


# Устанавливаем зависимости
RUN npm install

# Экспонируем порт 80 для доступа к приложению
EXPOSE 3001

# Запускаем nginxtou
CMD ["node", "server.js"]
