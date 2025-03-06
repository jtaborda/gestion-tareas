# Usamos una imagen base de Node.js para construir la aplicación
FROM node:16 AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el package.json y el package-lock.json
COPY package*.json ./

# Instalamos las dependencias de la aplicación
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Generamos la versión de producción de la aplicación Angular
RUN npm run build --prod

# Ahora, usamos una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copiamos los archivos generados de la etapa de construcción al contenedor Nginx
COPY --from=build /app/dist/gestion-tareas /usr/share/nginx/html

# Exponemos el puerto 80 para acceder a la aplicación
EXPOSE 80

# Usamos el servidor Nginx para servir la aplicación
CMD ["nginx", "-g", "daemon off;"]
