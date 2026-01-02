# eCommerce.cat - Landing Page

Agència especialitzada en eCommerce a Catalunya. Landing page per captar leads.

## 📋 Requisits

- Node.js 22+
- npm o pnpm
- Docker (opcional, per a despliegue)

## 🚀 Inici ràpid

### Desenvolupament local

```bash
# Instalar dependències
npm install --legacy-peer-deps

# Crear arxiu .env amb les variables necessàries
cp .env.example .env

# Omplir les variables d'entorn
# DIRECTUS_URL, DIRECTUS_TOKEN, RESEND_API_KEY, etc.

# Iniciar servidor de desenvolupament
npm run dev

# Accedir a http://localhost:3000
```

### Build per a producció

```bash
npm run build
npm run preview
```

## 🐳 Despliegue amb Docker

### Construcció local

```bash
# Construir imatge Docker
docker build -t ecommerce-cat:latest .

# Executar contenidor
docker run -p 3000:3000 \
  -e DIRECTUS_URL=https://your-directus.com \
  -e DIRECTUS_TOKEN=your_token \
  -e RESEND_API_KEY=your_key \
  -e CONTACT_EMAIL=info@ecommerce.cat \
  -e ADMIN_EMAIL=admin@ecommerce.cat \
  ecommerce-cat:latest
```

### Amb Docker Compose

```bash
# Crear arxiu .env amb les variables
cp .env.example .env

# Executar
docker-compose up -d

# Veure logs
docker-compose logs -f web

# Detenir
docker-compose down
```

## 🔧 Configuració de variables d'entorn

Crea un arxiu `.env` basant-te en `.env.example`:

```env
# Directus (CMS para gestionar leads)
DIRECTUS_URL=https://your-directus-instance.com
DIRECTUS_TOKEN=your_directus_token_here

# Resend (Servicio de email)
RESEND_API_KEY=your_resend_api_key_here

# Email
CONTACT_EMAIL=info@ecommerce.cat
ADMIN_EMAIL=admin@ecommerce.cat

# Sitio
SITE_URL=https://ecommerce.cat
```

## 📁 Estructura del proyecto

```
ecommerce-cat/
├── src/
│   ├── components/       # Componentes Astro reutilizables
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Proposta.astro
│   │   └── LogoEcomm.astro
│   ├── layouts/          # Layouts base
│   │   └── Layout.astro
│   ├── pages/            # Páginas y rutas
│   │   ├── index.astro   # Página principal
│   │   └── api/
│   │       └── leads.ts  # API para recibir leads
│   ├── styles/           # Estilos globales
│   │   └── global.css
│   └── assets/           # Imágenes y recursos
├── public/               # Archivos estáticos
├── Dockerfile            # Configuración Docker
├── docker-compose.yml    # Compose para desarrollo
├── tailwind.config.mjs   # Configuración TailwindCSS
├── astro.config.mjs      # Configuración Astro
└── package.json          # Dependencias
```

## 🎨 Diseño y Branding

- **Colores principales**: Azul Marino (#1B5585), Turquesa (#55C7DC)
- **Tipografía**: Inter (Google Fonts)
- **Estilo**: Sobrio y chic, inspirado en Apple
- **Componentes**: TailwindCSS

## 📧 Integración de Leads

### API Endpoint

**POST** `/api/leads`

```json
{
  "name": "Nom del contacte",
  "email": "email@example.com",
  "phone": "+34 933 903 137",
  "company": "Nom de l'empresa",
  "message": "Missatge opcional"
}
```

### Flujo de datos

1. Formulario en la landing → POST a `/api/leads`
2. Datos guardados en Directus
3. Email de confirmación enviado al contacto (Resend)
4. Email de notificación enviado al admin

## 🔐 Seguridad

- Variables de entorno no se comitean (`.env` en `.gitignore`)
- API keys protegidas en servidor
- Validación básica de datos en API
- CORS configurado para dominio específico

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Totalmente responsive en todos los dispositivos

## 🚢 Despliegue en EasyPanel

1. Conectar repositorio GitHub
2. Configurar variables de entorno en EasyPanel
3. Seleccionar Dockerfile como método de build
4. Configurar puerto: 3000
5. Deploy automático en cada push a main

## 📊 Monitoreo

- Health check configurado en Docker
- Logs disponibles en `docker-compose logs`
- Métricas de rendimiento en Astro

## 🤝 Contribuciones

Para cambios en la estructura o diseño, crear rama feature y pull request.

## 📄 Licencia

Propiedad de eComm360 - 2026

---

**Contacto**: info@ecommerce.cat | (+34) 933 903 137
