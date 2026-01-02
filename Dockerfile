# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm ci --legacy-peer-deps

# Copiar código fuente
COPY . .

# Construir la aplicación Astro
RUN npm run build

# Production stage - Usar node para ejecutar el servidor
FROM node:22-alpine

WORKDIR /app

# Instalar solo dependencias de producción
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps

# Copiar la aplicación construida desde el builder
COPY --from=builder /app/dist ./dist

# Copiar archivos públicos si es necesario
COPY --from=builder /app/public ./public

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Comando para ejecutar la aplicación Astro
CMD ["node", "./dist/server/entry.mjs"]
