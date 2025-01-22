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

# Build aplikasi
RUN npm run build

# Expose port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "start"]