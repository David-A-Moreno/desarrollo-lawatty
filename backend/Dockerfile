#Use an official Node.js
FROM node:18



# Establece el directorio de trabajo
WORKDIR /app/backend

# Copia los archivos de package.json y package-lock.json al directorio de trabajo
COPY package*.json ./



# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del backend al directorio de trabajo
COPY . .

# Expone el puerto 4000 en el contenedor
EXPOSE 4000

# Ejecuta el servidor de Node.js
CMD ["npm", "start"]