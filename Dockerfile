# Estágio de base
FROM node:16 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Estágio de desenvolvimento
FROM base AS development
CMD ["npm", "run", "start:dev"]

# Estágio de produção
FROM base AS production
COPY . .
RUN npm run build
CMD ["node", "dist/main"]
