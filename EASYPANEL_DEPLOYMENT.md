# Instruccions de Desplegament a EasyPanel

## 📦 Repositori GitHub

El projecte està disponible a:
**https://github.com/ibosch-ecomm/ecommerce-cat**

---

## 🚀 Passos per desplegar a EasyPanel

### 1. Crear nova aplicació a EasyPanel

1. Accedeix al teu panel d'EasyPanel
2. Clica a **"Create Service"** o **"New App"**
3. Selecciona **"GitHub"** com a font
4. Autoritza EasyPanel a accedir al repositori `ibosch-ecomm/ecommerce-cat`
5. Selecciona el repositori

### 2. Configurar el Build

- **Build Method**: Docker
- **Dockerfile Path**: `Dockerfile` (ja està al root del projecte)
- **Branch**: `master`
- **Auto Deploy**: Activat (opcional, per desplegar automàticament en cada push)

### 3. Configurar les Variables d'Entorn

Afegeix les següents variables d'entorn a la configuració de l'aplicació:

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

### 4. Configurar el Port

- **Port**: `3000`
- **Protocol**: HTTP

### 5. Configurar el Domini

1. A la secció de **Domains**, afegeix:
   - Domini personalitzat: `ecommerce.cat`
   - Subdomini (opcional): `www.ecommerce.cat`

2. Configura els registres DNS del domini:
   - Tipus: `A` o `CNAME`
   - Apunta al servidor d'EasyPanel (consulta la documentació d'EasyPanel per a la IP o CNAME correcte)

3. Activa **SSL/TLS** (Let's Encrypt) per HTTPS automàtic

### 6. Deploy

1. Clica a **"Deploy"** o **"Build & Deploy"**
2. Espera que el build es completi (pot trigar 2-5 minuts)
3. Verifica que l'aplicació s'hagi desplegat correctament

---

## ✅ Verificació del Desplegament

Un cop desplegat, verifica:

1. **Accés a la landing**: `https://ecommerce.cat`
2. **Formulari de contacte**: Prova d'enviar un lead des del formulari
3. **Directus**: Verifica que el lead s'hagi guardat a Directus
4. **Email**: Comprova que s'hagin enviat els emails de confirmació (revisa spam)

---

## 🔧 Manteniment

### Actualitzar el codi

1. Fes canvis al codi localment
2. Commiteja i fes push a GitHub:
   ```bash
   git add .
   git commit -m "Descripció dels canvis"
   git push origin master
   ```
3. Si tens **Auto Deploy** activat, EasyPanel desplegarà automàticament
4. Si no, clica manualment a **"Redeploy"** a EasyPanel

### Veure logs

A EasyPanel, accedeix a la secció **"Logs"** per veure els logs de l'aplicació en temps real.

### Reiniciar l'aplicació

Si necessites reiniciar l'aplicació, clica a **"Restart"** a EasyPanel.

---

## 📊 Monitorització

- **Health Check**: EasyPanel verificarà automàticament que l'aplicació estigui en funcionament
- **Logs**: Revisa els logs regularment per detectar errors
- **Directus**: Revisa periòdicament els leads rebuts

---

## 🆘 Troubleshooting

### L'aplicació no arrenca

1. Revisa els logs a EasyPanel
2. Verifica que totes les variables d'entorn estiguin configurades correctament
3. Comprova que el port 3000 estigui correctament configurat

### Els emails no s'envien

1. Verifica que `RESEND_API_KEY` sigui correcte
2. Comprova els logs per veure errors de Resend
3. Verifica que el domini d'enviament estigui verificat a Resend

### Els leads no es guarden a Directus

1. Verifica que `DIRECTUS_URL` i `DIRECTUS_TOKEN` siguin correctes
2. Comprova que la col·lecció `leads` existeixi a Directus amb els camps correctes:
   - `name` (string)
   - `email` (string)
   - `phone` (string)
   - `company` (string)
   - `message` (text)
   - `created_at` (datetime)

---

## 📞 Suport

Per a qualsevol problema, contacta amb l'equip de desenvolupament o revisa la documentació d'EasyPanel.

**Repositori**: https://github.com/ibosch-ecomm/ecommerce-cat
**Domini**: https://ecommerce.cat
