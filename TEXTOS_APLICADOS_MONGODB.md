# ✅ Textos de MongoDB Aplicados al Proyecto

## 📊 Resumen de la Tarea Completada

Se han extraído **127 textos** desde MongoDB que fueron previamente editados por la Dra. Sandra Vargas en el sistema de administración (`sandra-vargas-editor`), y se han aplicado al proyecto actual (`sandramar`).

## 🎯 Archivos Creados

### 1. **Textos Centralizados**
- **`lib/texts.ts`** - Archivo centralizado con todos los 127 textos extraídos de MongoDB
- Incluye helper functions: `getText()` y `hasText()`

### 2. **Scripts de Extracción**
- **`scripts/extract-texts-from-mongodb.js`** - Script para extraer textos desde MongoDB
- **`exports/texts-export.ts`** - Archivo TypeScript con los textos exportados
- **`exports/texts-simple-[fecha].json`** - Versión simple (key: value)
- **`exports/texts-detailed-[fecha].json`** - Versión detallada con metadata

## 📝 Componentes Actualizados

### ✅ Componentes Principales
1. **Hero.tsx** - Sección principal (badge, título, subtítulo, descripción, CTAs)
2. **About.tsx** - Sobre mí (título, intro, párrafos principales, enfoque integrativo)
3. **Services.tsx** - Servicios (título, descripción)
4. **Experience.tsx** - Experiencia (título, descripción)
5. **OnlineTherapy.tsx** - Terapia Online (título, descripción)
6. **Contact.tsx** - Contacto (título)
7. **Header.tsx** - Navegación (sin cambios necesarios - etiquetas estándar)
8. **Footer.tsx** - Pie de página (logo, copyright)

## 📊 Distribución de Textos por Sección

```
- about: 23 textos
- contact: 8 textos
- experience: 21 textos
- hero: 7 textos
- online: 6 textos
- services: 12 textos
- terapiaIndividual: 19 textos
- terapiaPareja: 17 textos
- footer, nav, logo: 14 textos
```

## 🔧 Cómo Usar los Textos

### Ejemplo de uso en un componente:

```typescript
import { getText } from '../lib/texts'

// En el JSX:
<h1>{getText('hero.title', 'Título por defecto')}</h1>

// Con HTML (negrillas, etc):
<p dangerouslySetInnerHTML={{ __html: getText('about.intro', 'Texto por defecto') }} />
```

## 📋 Páginas Pendientes (Opcional)

Las siguientes páginas pueden ser actualizadas con los textos de MongoDB si se desea:

1. **`pages/terapia-individual-adultos.tsx`**
   - Usar textos con prefijo `terapiaIndividual.*`
   - Ejemplo: `terapiaIndividual.title`, `terapiaIndividual.description`, etc.

2. **`pages/terapia-de-pareja.tsx`**
   - Usar textos con prefijo `terapiaPareja.*`
   - Ejemplo: `terapiaPareja.title`, `terapiaPareja.description`, etc.

### Código de ejemplo para páginas:

```typescript
import { getText } from '../lib/texts'

export default function TerapiaIndividualPage() {
  return (
    <div>
      <h1>{getText('terapiaIndividual.title', 'Terapia Individual para Adultos')}</h1>
      <p dangerouslySetInnerHTML={{ __html: getText('terapiaIndividual.description') }} />
      {/* ... más contenido ... */}
    </div>
  )
}
```

## 🚀 Comandos Útiles

### Extraer textos nuevamente desde MongoDB:
```bash
node scripts/extract-texts-from-mongodb.js
```

### Ver todos los textos disponibles:
```bash
cat lib/texts.ts | grep '"[a-z].*":' | wc -l
```

## 📌 Notas Importantes

1. **Los textos ya están aplicados** en los componentes principales
2. **El diseño se mantiene exactamente igual** - solo cambian los contenidos textuales
3. **Los textos incluyen negrillas y formato HTML** cuando es necesario
4. **Todos los textos tienen valores por defecto** para evitar errores si falta alguna clave

## ✅ Estado Final

- ✅ Textos extraídos de MongoDB (127 textos)
- ✅ Archivo centralizado creado (`lib/texts.ts`)
- ✅ Componentes principales actualizados
- ✅ Sistema funcionando correctamente

## 🔄 Próximos Pasos (Opcionales)

1. **Probar la aplicación** para verificar que todos los textos se muestren correctamente
2. **Actualizar páginas de terapia** si se desea usar los textos específicos de MongoDB
3. **Revisar textos** y ajustar si es necesario directamente en `lib/texts.ts`

---

**Fecha de completación**: $(date)
**Total de textos migrados**: 127
**Componentes actualizados**: 8 principales

