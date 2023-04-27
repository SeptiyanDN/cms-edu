# menggunakan base image dari Node.js terbaru
FROM node:latest

# menentukan working directory untuk aplikasi
WORKDIR /app

# menyalin package.json dan package-lock.json ke working directory
COPY package*.json ./

# menjalankan perintah npm install untuk menginstall dependencies
RUN npm install

# menyalin seluruh source code ke working directory
COPY . .

# menjalankan perintah build untuk membangun aplikasi Next.js
RUN npm run build

# menentukan environment variable untuk menjalankan aplikasi Next.js
ENV NODE_ENV production

# menentukan port yang akan digunakan
EXPOSE 3501

# menjalankan perintah start untuk menjalankan aplikasi Next.js
CMD ["npm", "start"]

# Start the app
# CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]