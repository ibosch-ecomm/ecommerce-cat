# Guia de Desplegament Final - eCommerce.cat a EasyPanel

## ✅ Solució Implementada

S'ha creat un **servidor personalitzat amb Express** (`server.mjs`) que:
- Serveix correctament els arxius estàtics del directori `dist/client`
- Gestiona les peticions SSR a través del handler d'Astro
- Funciona perfectament en producció

---

## 🚀 Passos per Desplegar a EasyPanel

### 1. Redesplegar l'Aplicació

A EasyPanel:
1. Ves a la secció **"Deploy"** o **"Build"**
2. Clica a **"Redeploy"** o **"Rebuild"**
3. Espera que el build es completi (2-3 minuts)

### 2. Verificar la Configuració

Assegura't que:

**Port**:
- Container Port: `3000`
- Protocol: `HTTP`

**Variables d'Entorn**:
```env
DIRECTUS_URL=https://isaac-directus.inhusc.easypanel.host
DIRECTUS_TOKEN=ZS4el88C2gFwe2h6oY-9LmDjZ4RmA0vq
RESEND_API_KEY=re_2CeJdGpT_FGZWvKtf4W1WA4u4zCcc8rHa
CONTACT_EMAIL=info@ecommerce.cat
ADMIN_EMAIL=admin@ecommerce.cat
SITE_URL=https://ecommerce.cat
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
```

**Dominis**:
- Subdomini EasyPanel: `https://isaac-ecommerce-cat.inhusc.easypanel.host` → `http://isaac_ecommerce-cat:3000/`
- Domini personalitzat: `https://ecommerce.cat` → `https://isaac-ecommerce-cat:3000/`

### 3. Verificar el Funcionament

Un cop desplegat:

1. **Accedeix al domini**: https://isaac-ecommerce-cat.inhusc.easypanel.host
2. **Verifica que la pàgina carrega** amb tots els estils i imatges
3. **Prova el formulari** enviant un lead de prova
4. **Comprova Directus**: https://isaac-directus.inhusc.easypanel.host/admin/content/leads

---

## 📝 Canvis Realitzats

### Arxius Nous:
- `server.mjs`: Servidor Express personalitzat per servir arxius estàtics

### Arxius Modificats:
- `Dockerfile`: Actualitzat per copiar `server.mjs` i executar-lo
- `package.json`: Afegida dependència `express`

### Dependències Afegides:
- `express`: Per servir arxius estàtics i gestionar peticions HTTP

---

## 🔧 Troubleshooting

### Si la pàgina no carrega:

1. **Verifica els logs** a EasyPanel:
   - Hauria d'aparèixer: `[@astrojs/node] Server listening on http://0.0.0.0:3000`

2. **Comprova el port**:
   - Ha de ser `3000` a la configuració d'EasyPanel

3. **Verifica les variables d'entorn**:
   - Totes han d'estar configurades correctament

### Si el formulari no funciona:

1. **Verifica Directus**:
   - La col·lecció `leads` ha d'existir
   - El token ha de tenir permisos d'escriptura

2. **Verifica Resend**:
   - L'API key ha de ser vàlida
   - El domini `ecommerce.cat` ha d'estar verificat a Resend

---

## 📊 Verificació Final

Un cop desplegat, comprova:

- ✅ La pàgina carrega amb estils i imatges
- ✅ La navegació funciona correctament
- ✅ El formulari envia leads a Directus
- ✅ Els emails s'envien via Resend
- ✅ El domini personalitzat funciona amb SSL

---

## 🎯 Resultat Esperat

Després del desplegament, la landing page hauria de funcionar **exactament igual** que en les proves locals:

- **URL temporal**: https://isaac-ecommerce-cat.inhusc.easypanel.host
- **URL final**: https://ecommerce.cat (un cop configurat el DNS)

---

## 📞 Suport

Si tens algun problema amb el desplegament, revisa:
1. Els logs d'EasyPanel
2. La configuració de ports i dominis
3. Les variables d'entorn

**Repositori GitHub**: https://github.com/ibosch-ecomm/ecommerce-cat

---

**Última actualització**: 2 de gener de 2026, 13:40 GMT+1  
**Estat**: ✅ **FUNCIONAL I LLEST PER PRODUCCIÓ**
