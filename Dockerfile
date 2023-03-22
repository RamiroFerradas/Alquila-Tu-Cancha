# Etapa 1: construir la aplicación
FROM node:lts-bullseye as build

# Establecer el directorio de trabajo para la aplicación
WORKDIR /app

# Copiar los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias usando npm ci
RUN npm ci

# Copiar el resto del código fuente de la aplicación al directorio de trabajo
COPY . .

# Construir la aplicación usando el comando "build" especificado en package.json
RUN npm run build

# Etapa 2: servir la aplicación usando nginx
FROM nginx:alpine

# Copiar el archivo de configuración de nginx al directorio apropiado
ADD ./config/default.conf /etc/nginx/conf.d/default.conf

# Copiar la aplicación construida desde la etapa "build" al directorio apropiado en el contenedor de nginx
COPY --from=build /app/dist /var/www/app/

# Exponer el puerto 80 para conexiones externas
EXPOSE 80

# Iniciar nginx y mantenerlo en ejecución en primer plano
CMD ["nginx", "-g", "daemon off;"]