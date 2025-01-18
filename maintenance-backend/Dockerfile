# Gunakan image Node.js
FROM node:19.9.0

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode aplikasi
COPY . .

# Jalankan perintah Prisma
RUN npx prisma generate

# Expose port aplikasi
EXPOSE 4000

# Jalankan aplikasi
CMD ["npm", "run", "dev"]