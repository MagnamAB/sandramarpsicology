# 📊 Configuración Google Analytics y Search Console

## 🚀 **Google Analytics 4 (GA4)**

### **Paso 1: Crear Cuenta Google Analytics**
1. Ve a [Google Analytics](https://analytics.google.com/)
2. Clic en "Comenzar" o "Empezar a medir"
3. Configura tu cuenta:
   - **Nombre de cuenta:** "Sandra Vargas Psicóloga"
   - **Nombre de propiedad:** "Sandra Vargas - Sitio Web"
   - **Zona horaria:** Colombia (GMT-5)
   - **Moneda:** Peso colombiano (COP)

### **Paso 2: Configurar Propiedad Web**
1. Selecciona **"Web"** como plataforma
2. Configura el flujo de datos:
   - **URL del sitio web:** `https://sandravargas.co`
   - **Nombre del flujo:** "Sitio Web Principal"
3. **¡IMPORTANTE!** Copia el **ID de medición** (formato: G-XXXXXXXXXX)

### **Paso 3: Configurar Variable de Entorno**
1. En tu archivo `.env.local` agrega:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Reemplaza con tu ID real
```

2. Si estás desplegando en Vercel/Netlify, agrega esta variable en la configuración de producción.

### **Paso 4: Verificar Funcionamiento**
1. Despliega el sitio con la nueva configuración
2. Visita tu sitio web
3. En Google Analytics > Informes > Tiempo real, deberías ver tu visita

---

## 🔍 **Google Search Console**

### **Paso 1: Acceder a Search Console**
1. Ve a [Google Search Console](https://search.google.com/search-console/)
2. Clic en "Empezar ahora"

### **Paso 2: Agregar Propiedad**
1. Selecciona **"Prefijo de URL"**
2. Ingresa: `https://sandravargas.co`
3. Clic en "Continuar"

### **Paso 3: Verificar Propiedad (Método HTML)**
Tienes varias opciones, la más fácil es:

**Opción A: Archivo HTML**
1. Descarga el archivo HTML de verificación
2. Súbelo a la carpeta `public/` del proyecto
3. Verifica que sea accesible en `https://sandravargas.co/google[código].html`

**Opción B: Meta Tag (Recomendado)**
1. Copia el meta tag que te proporciona Google
2. Agrégalo al archivo `pages/_app.tsx` en el `<Head>`:
```html
<meta name="google-site-verification" content="tu-código-aquí" />
```

### **Paso 4: Enviar Sitemap**
1. Una vez verificado, ve a "Sitemaps" en el menú izquierdo
2. Agrega: `https://sandravargas.co/sitemap.xml`
3. Clic en "Enviar"

---

## 🔗 **Conectar Analytics con Search Console**

### **Paso 1: Desde Google Analytics**
1. En GA4, ve a **Administrador** (rueda dentada)
2. En la columna "Propiedad", clic en **"Enlaces de Search Console"**
3. Clic en **"Vincular"**
4. Selecciona tu propiedad de Search Console
5. Confirma la vinculación

### **Paso 2: Verificar Conexión**
1. En GA4 > Informes > Adquisición > Search Console
2. Deberías ver datos de consultas de búsqueda (puede tardar 24-48h)

---

## 📈 **Métricas Importantes a Monitorear**

### **Google Analytics - KPIs Clave:**
- **Usuarios únicos** (mensual)
- **Sesiones por página** (especialmente páginas de servicios)
- **Duración promedio de sesión**
- **Tasa de rebote** (objetivo: <70%)
- **Conversiones** (clics WhatsApp, formularios)
- **Páginas más visitadas**

### **Search Console - KPIs Clave:**
- **Clics desde búsquedas orgánicas**
- **Impresiones** (cuántas veces apareces en resultados)
- **CTR promedio** (Tasa de clics - objetivo: >3%)
- **Posición promedio** (ranking palabras clave)
- **Consultas de búsqueda** más importantes
- **Errores de indexación**

---

## 🎯 **Eventos Personalizados Configurados**

El sitio ya tiene configurados estos eventos automáticos:

### **Eventos de Conversión:**
- `whatsapp_click` - Cuando hacen clic en botones de WhatsApp
- `schedule_click` - Cuando hacen clic en "Agendar Cita"
- `form_submit` - Envío de formularios de contacto

### **Eventos de Engagement:**
- `service_interest` - Interés en servicios específicos
- `page_view` - Visualizaciones de página específicas

---

## ⚡ **Configuración Rápida - Checklist**

### **Para Analytics:**
- [ ] Crear cuenta GA4
- [ ] Copiar ID de medición (G-XXXXXXXXXX)
- [ ] Agregar `NEXT_PUBLIC_GA_ID` a variables de entorno
- [ ] Desplegar sitio actualizado
- [ ] Verificar datos en tiempo real

### **Para Search Console:**
- [ ] Crear propiedad en Search Console
- [ ] Verificar propiedad (meta tag o archivo HTML)
- [ ] Enviar sitemap (`/sitemap.xml`)
- [ ] Vincular con Google Analytics
- [ ] Monitorear datos después de 24-48h

---

## 🚨 **Notas Importantes**

1. **Los datos tardan:** Search Console puede tardar 24-48h en mostrar datos
2. **Verificación:** Ambas herramientas deben verificar que eres propietario del sitio
3. **Variables de entorno:** Asegúrate de configurar `NEXT_PUBLIC_GA_ID` en producción
4. **HTTPS:** El sitio debe usar HTTPS (certificado SSL) para funcionamiento óptimo
5. **Robots.txt:** Ya está configurado en `/public/robots.txt`

---

## 📞 **¿Necesitas Ayuda?**

Si tienes problemas con la configuración:
1. Verifica que las variables de entorno estén configuradas
2. Revisa la consola del navegador para errores
3. Confirma que el sitio esté desplegado con los cambios
4. Espera 24-48h para datos de Search Console 