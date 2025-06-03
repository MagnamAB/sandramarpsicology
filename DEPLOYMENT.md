# Guía de Despliegue - Dra. Sandra Vargas

## 🚀 Opciones de Despliegue

### 1. Vercel (Recomendado)

Vercel es la opción más sencilla para desplegar aplicaciones Next.js:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Para producción
vercel --prod
```

**Configuración en Vercel:**
1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno en el dashboard
3. El despliegue será automático con cada push

### 2. Netlify

```bash
# Construir para producción
npm run build
npm run export

# Subir la carpeta 'out' a Netlify
```

### 3. Hosting Tradicional

```bash
# Construir versión estática
npm run build
npm run export

# Subir contenido de la carpeta 'out' a tu hosting
```

## 🔧 Variables de Entorno

Configura estas variables en tu plataforma de hosting:

```bash
NEXT_PUBLIC_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/contacto
NEXT_PUBLIC_WHATSAPP_NUMBER=573106983385
NEXT_PUBLIC_SITE_URL=https://drasandravargas.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📋 Checklist Pre-Despliegue

### SEO y Performance
- [ ] Configurar dominio personalizado
- [ ] Instalar certificado SSL
- [ ] Configurar Google Analytics
- [ ] Configurar Google Search Console
- [ ] Verificar robots.txt
- [ ] Verificar sitemap.xml
- [ ] Optimizar imágenes
- [ ] Configurar CDN

### Funcionalidades
- [ ] Probar formulario de contacto
- [ ] Verificar webhook de n8n
- [ ] Probar enlaces de WhatsApp
- [ ] Verificar responsive design
- [ ] Probar en diferentes navegadores

### Contenido
- [ ] Revisar textos y ortografía
- [ ] Actualizar información de contacto
- [ ] Verificar enlaces internos
- [ ] Añadir imágenes profesionales
- [ ] Configurar favicon

## 🔗 Configuración de n8n

### Webhook para Formulario de Contacto

1. **Crear Workflow en n8n:**
   - Trigger: Webhook
   - URL: `/webhook/contacto`
   - Método: POST

2. **Procesar Datos:**
   ```json
   {
     "nombre": "string",
     "email": "string", 
     "telefono": "string",
     "servicio": "string",
     "mensaje": "string",
     "timestamp": "ISO date",
     "source": "website"
   }
   ```

3. **Acciones Recomendadas:**
   - Enviar email a la doctora
   - Guardar en base de datos/CRM
   - Enviar confirmación al cliente
   - Crear recordatorio de seguimiento

### Ejemplo de Workflow n8n:

```
Webhook → Validar Datos → Enviar Email → Guardar en CRM → Responder al Cliente
```

## 📊 Monitoreo y Analytics

### Google Analytics 4
1. Crear propiedad GA4
2. Instalar código de seguimiento
3. Configurar eventos personalizados:
   - Envío de formulario
   - Clics en WhatsApp
   - Tiempo en página
   - Scroll depth

### Google Search Console
1. Verificar propiedad del sitio
2. Enviar sitemap
3. Monitorear indexación
4. Revisar errores de rastreo

### Core Web Vitals
- Usar PageSpeed Insights
- Monitorear métricas en Search Console
- Optimizar según recomendaciones

## 🔒 Seguridad

### Headers de Seguridad
Ya configurados en `next.config.js`:
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

### Recomendaciones Adicionales:
- Configurar CSP (Content Security Policy)
- Usar HTTPS únicamente
- Configurar HSTS
- Validar inputs del formulario

## 📱 PWA (Opcional)

Para convertir en Progressive Web App:

1. Añadir service worker
2. Configurar manifest.json (ya incluido)
3. Optimizar para offline
4. Añadir iconos de diferentes tamaños

## 🎯 Post-Despliegue

### Inmediato (Día 1)
- [ ] Verificar que todo funciona
- [ ] Probar formulario de contacto
- [ ] Configurar Google Analytics
- [ ] Enviar sitemap a Google

### Primera Semana
- [ ] Configurar Google My Business
- [ ] Crear contenido para blog
- [ ] Optimizar para búsquedas locales
- [ ] Configurar redes sociales

### Primer Mes
- [ ] Analizar métricas de rendimiento
- [ ] Optimizar según datos de usuarios
- [ ] Crear más contenido SEO
- [ ] Implementar mejoras basadas en feedback

## 📞 Soporte

Para soporte técnico o dudas sobre el despliegue, contacta al desarrollador o consulta la documentación de Next.js. 