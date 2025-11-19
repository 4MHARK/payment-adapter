FROM node:18-slim

# Install OpenSSL (required for Prisma engines)
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Install deps based on package.json
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Generate Prisma client for Linux inside the container
RUN npx prisma generate

# Build TypeScript into dist/
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]