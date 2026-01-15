# Guía de Configuración de Dominio en Vercel

Esta guía te ayudará a configurar el dominio `sandravargaspsicologa.com` en Vercel para que tu sitio web funcione correctamente.

## 📋 Requisitos Previos

- ✅ Dominio `sandravargaspsicologa.com` comprado
- ✅ Proyecto desplegado en Vercel
- ✅ Acceso a tu cuenta de Vercel
- ✅ Acceso al panel de control de tu registrador de dominios (donde compraste el dominio)

---

## 🚀 Paso 1: Agregar el Dominio en Vercel

1. **Inicia sesión en Vercel**
   - Ve a [vercel.com](https://vercel.com) e inicia sesión

2. **Selecciona tu proyecto**
   - En el dashboard, haz clic en el proyecto de tu sitio web

3. **Ve a la configuración de dominios**
   - En el menú superior, haz clic en **Settings**
   - En el menú lateral izquierdo, haz clic en **Domains**

4. **Agrega el dominio**
   - Haz clic en el botón **Add** o **Add Domain**
   - Ingresa `sandravargaspsicologa.com`
   - Haz clic en **Add**

5. **Vercel te mostrará las instrucciones de DNS**
   - Vercel te proporcionará los registros DNS que necesitas configurar
   - **IMPORTANTE**: Anota estos valores, los necesitarás en el siguiente paso

---

## 🔧 Paso 2: Configurar los Registros DNS

Ahora necesitas configurar los registros DNS en el panel de control de tu registrador de dominios.

### Opción A: Configuración con Registros A (Recomendado)

Vercel te proporcionará registros similares a estos:

```
Tipo: A
Nombre: @
Valor: 76.76.21.21
TTL: Auto (o 3600)
```

```
Tipo: A
Nombre: @
Valor: 76.76.21.22
TTL: Auto (o 3600)
```

**Pasos:**
1. Inicia sesión en el panel de control de tu registrador de dominios
2. Busca la sección de **DNS** o **Zona DNS** o **DNS Management**
3. Elimina cualquier registro A existente para el dominio raíz (@)
4. Agrega los registros A que Vercel te proporcionó
5. Guarda los cambios

### Opción B: Configuración con CNAME (Alternativa)

Si tu registrador no permite múltiples registros A, puedes usar CNAME:

```
Tipo: CNAME
Nombre: @
Valor: cname.vercel-dns.com
TTL: Auto (o 3600)
```

**Nota**: No todos los registradores permiten CNAME en el dominio raíz (@). Si no funciona, usa la Opción A.

### Configurar www (Opcional pero recomendado)

También configura el subdominio `www`:

```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: Auto (o 3600)
```

---

## ⏱️ Paso 3: Esperar la Propagación DNS

1. **Tiempo de propagación**
   - Los cambios DNS pueden tardar entre **5 minutos y 48 horas**
   - Generalmente toma entre 1-2 horas

2. **Verificar el estado**
   - Vuelve a la página de **Domains** en Vercel
   - Verás el estado del dominio:
     - 🟡 **Pending**: Esperando configuración DNS
     - 🟢 **Valid**: Dominio configurado correctamente
     - 🔴 **Error**: Hay un problema con la configuración

3. **Verificar manualmente**
   - Puedes usar herramientas como:
     - [whatsmydns.net](https://www.whatsmydns.net)
     - [dnschecker.org](https://dnschecker.org)
   - Busca `sandravargaspsicologa.com` y verifica que apunte a los servidores de Vercel

---

## ✅ Paso 4: Verificar que Todo Funciona

1. **Verifica el certificado SSL**
   - Vercel automáticamente genera un certificado SSL gratuito
   - Debería aparecer como "Valid" en la configuración de dominios

2. **Prueba el sitio**
   - Abre `https://sandravargaspsicologa.com` en tu navegador
   - Deberías ver tu sitio web funcionando
   - Verifica que el candado de seguridad (🔒) aparezca en la barra de direcciones

3. **Prueba www (si lo configuraste)**
   - Abre `https://www.sandravargaspsicologa.com`
   - Debería redirigir automáticamente a la versión sin www (o viceversa, según tu configuración)

---

## 🔄 Paso 5: Configurar Redirecciones (Opcional)

Si tenías un dominio anterior, puedes configurar redirecciones en Vercel:

1. Ve a **Settings** → **Domains**
2. Agrega el dominio anterior
3. Configura una redirección 301 al nuevo dominio

---

## 🛠️ Solución de Problemas Comunes

### El dominio muestra "Pending" por mucho tiempo

**Causas posibles:**
- Los registros DNS no se han propagado aún
- Los registros DNS están incorrectos

**Solución:**
1. Verifica que los registros DNS estén correctos en tu registrador
2. Espera más tiempo (hasta 48 horas)
3. Verifica con herramientas de DNS checker

### Error "Invalid Configuration"

**Causas posibles:**
- Los registros DNS no apuntan a Vercel
- Hay registros DNS conflictivos

**Solución:**
1. Verifica los registros DNS en tu registrador
2. Asegúrate de que los valores coincidan exactamente con los que Vercel proporcionó
3. Elimina cualquier registro DNS conflictivo

### El sitio no carga con HTTPS

**Causas posibles:**
- El certificado SSL aún no se ha generado
- Hay un problema con la configuración DNS

**Solución:**
1. Espera unos minutos (Vercel genera el certificado automáticamente)
2. Verifica que el dominio esté marcado como "Valid" en Vercel
3. Si persiste, contacta el soporte de Vercel

### El dominio anterior sigue funcionando

**Solución:**
- Si quieres que el dominio anterior redirija al nuevo:
  1. Agrega el dominio anterior en Vercel
  2. Configura una redirección 301
- O simplemente actualiza todas las referencias al nuevo dominio

---

## 📝 Notas Importantes

1. **No elimines el dominio anterior inmediatamente**
   - Mantén ambos dominios activos durante la transición
   - Esto ayuda con el SEO y evita perder visitantes

2. **Actualiza referencias externas**
   - Google Analytics
   - Google Search Console
   - Redes sociales
   - Enlaces externos

3. **Google Search Console**
   - Agrega la nueva propiedad `sandravargaspsicologa.com`
   - Envía un nuevo sitemap
   - Configura redirecciones 301 si es necesario

4. **Certificado SSL**
   - Vercel proporciona certificados SSL automáticamente
   - Se renuevan automáticamente
   - No necesitas configurar nada adicional

---

## 🎯 Checklist Final

- [ ] Dominio agregado en Vercel
- [ ] Registros DNS configurados correctamente
- [ ] Dominio muestra estado "Valid" en Vercel
- [ ] Sitio carga correctamente en `https://sandravargaspsicologa.com`
- [ ] Certificado SSL activo (candado verde en el navegador)
- [ ] Subdominio www configurado (si aplica)
- [ ] Redirecciones configuradas (si aplica)
- [ ] Google Search Console actualizado
- [ ] Google Analytics actualizado

---

## 📞 Soporte

Si tienes problemas durante la configuración:

1. **Documentación de Vercel**: [vercel.com/docs/concepts/projects/domains](https://vercel.com/docs/concepts/projects/domains)
2. **Soporte de Vercel**: [vercel.com/support](https://vercel.com/support)
3. **Comunidad**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

## ✨ ¡Listo!

Una vez completados estos pasos, tu sitio web estará disponible en `https://sandravargaspsicologa.com` con SSL automático y todas las optimizaciones de Vercel.

**Última actualización**: Todos los archivos del proyecto ya han sido actualizados con el nuevo dominio `sandravargaspsicologa.com`.
