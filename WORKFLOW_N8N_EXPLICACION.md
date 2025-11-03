# 📋 Workflow n8n - Sistema de Citas Sandra Margarita Vargas

## 🔄 Resumen de Flujos

Este workflow maneja **4 flujos principales**:

### 1. 🌐 **WEBHOOK - Cita desde la Web**
**Trigger:** Usuario agenda desde la página web  
**Flujo:** `Webhook → Code → Google Calendar → Code1 → MongoDB → Respond to Webhook`

**¿Qué hace?**
- Recibe datos completos del cliente (nombre, email, teléfono, servicio, fecha, hora, modalidad, mensaje)
- Procesa y formatea los datos
- Crea evento en Google Calendar
- Guarda en MongoDB con toda la información
- Responde al usuario confirmando la cita

**Datos guardados:**
- ✅ Todos los datos del cliente (nombre, email, telefono con indicador internacional, whatsappJid)
- ✅ Datos de la cita (date, startTime, endTime, serviceType)
- ✅ Metadata (calendarEventId, calendarLink, servicioDetalle, modalidadDetalle)
- ✅ `isBooked: true` (bloquea el horario)
- ✅ `source: "website_scheduler"`

---

### 2. 🗑️ **DELETE - Cancelación Manual**
**Trigger:** Doctora cancela/elimina evento en Google Calendar  
**Flujo:** `Google Calendar Trigger (eventCancelled) → Edit Fields → Delete documents`

**¿Qué hace?**
- Detecta cuando se cancela un evento en Google Calendar
- Extrae el `calendarEventId`
- Elimina el documento correspondiente de MongoDB
- El horario queda liberado automáticamente

**Uso:**
- La doctora cancela desde su calendario
- El horario se libera en la web inmediatamente

---

### 3. 📝 **UPDATE - Modificación Manual**
**Trigger:** Doctora modifica evento existente en Google Calendar  
**Flujo:** `Google Calendar Trigger1 (eventUpdated) → Edit Fields1 → Process Calendar Update1 → Update MongoDB Document`

**¿Qué hace?**
- Detecta cambios en un evento existente (cambio de hora, fecha, título, etc.)
- Extrae fecha y hora directamente del ISO string (ya en hora Bogotá)
- **Actualiza SOLO los campos modificados** en MongoDB:
  - `date`, `startTime`, `endTime`
  - `title`, `description`, `location`
  - `updatedAt`, `lastModified`

**Campos que SE MANTIENEN intactos:**
- ✅ `whatsappJid`, `telefono`, `email`, `nombre`
- ✅ `serviceType`, `modalidad`, `mensaje`
- ✅ Todos los demás datos del cliente

**Código clave:**
```javascript
// Extrae directamente sin conversión de timezone
const date = startParts[1]      // "2025-11-06"
const startTime = startParts[2]  // "10:30"
const endTime = endParts[1]      // "11:45"
```

---

### 4. ➕ **CREATE - Evento Manual**
**Trigger:** Doctora crea nuevo evento en Google Calendar  
**Flujo:** `Google Calendar Trigger2 (eventCreated) → Edit Fields2 → Process Manual Event → Insert Manual Event to MongoDB`

**¿Qué hace?**
- Detecta cuando la doctora crea un evento manualmente
- Extrae fecha, hora inicio, hora fin
- Calcula duración y detecta tipo de servicio:
  - 70-80 min → `serviceType: "individual"`
  - 110-130 min → `serviceType: "parejas"`
  - Otros → `serviceType: "manual"`
- **Bloquea el horario** guardando en MongoDB

**Datos guardados (valores por defecto):**
```javascript
{
  // Esenciales para bloqueo
  date: "2025-11-06",
  startTime: "13:00",
  endTime: "14:00",
  serviceType: "manual" (o detectado por duración),
  isBooked: true,
  
  // Datos del evento
  title: summary || "Evento bloqueado",
  description: description || "Evento creado manualmente",
  calendarEventId: id,
  
  // Valores por defecto (sin datos de cliente)
  nombre: summary || "Evento manual",
  email: "manual@calendar.block",
  telefono: "N/A",
  whatsappJid: "",
  modalidad: "manual",
  
  // Metadata
  source: "google_calendar_manual_create",
  lastModified: "google_calendar_manual"
}
```

**Uso:**
- Para confirmar citas que llegan por WhatsApp/teléfono
- Para bloquear tiempo personal
- Para bloquear horarios de almuerzo, etc.

---

## 🎯 Casos de Uso Prácticos

### Caso 1: Usuario agenda desde la web
1. Usuario completa formulario en la web
2. ✅ Webhook recibe todos los datos
3. ✅ Se crea en Google Calendar con toda la info
4. ✅ Se guarda en MongoDB con telefono internacional correcto (+34665388685)
5. ✅ Usuario ve confirmación

### Caso 2: Cliente llama por teléfono
1. Doctora crea evento manualmente en su calendario: "Cita con María Pérez - 75 min"
2. ✅ Trigger CREATE detecta el evento
3. ✅ Detecta duración 75 min → `serviceType: "individual"`
4. ✅ Bloquea el horario en MongoDB
5. ✅ Ese horario ya no aparece disponible en la web

### Caso 3: Doctora cambia hora de una cita
1. Doctora arrastra evento de 10:00 a 11:00 en su calendario
2. ✅ Trigger UPDATE detecta el cambio
3. ✅ MongoDB se actualiza con nueva hora (11:00)
4. ✅ Los datos del cliente (teléfono, email, etc.) se mantienen
5. ✅ El horario original (10:00) queda libre
6. ✅ El nuevo horario (11:00) queda bloqueado

### Caso 4: Doctora cancela una cita
1. Doctora elimina evento de su calendario
2. ✅ Trigger DELETE detecta la eliminación
3. ✅ Se borra de MongoDB
4. ✅ El horario queda libre inmediatamente en la web

### Caso 5: Doctora bloquea almuerzo
1. Doctora crea evento: "Almuerzo - 12:00 a 13:00"
2. ✅ Trigger CREATE detecta el evento
3. ✅ Duración 60 min → `serviceType: "manual"`
4. ✅ Horario bloqueado con `email: "manual@calendar.block"`
5. ✅ No aparece disponible en la web

---

## 📊 Campos Importantes en MongoDB

```javascript
{
  // 🔑 Para disponibilidad en frontend
  date: "2025-11-06",              // YYYY-MM-DD
  startTime: "10:30",              // HH:MM (hora Bogotá)
  endTime: "11:45",                // HH:MM (hora Bogotá)
  serviceType: "individual",       // individual | parejas | manual
  isBooked: true,                  // true = bloqueado
  
  // 👤 Datos del cliente
  nombre: "Andres Bobadilla",
  email: "anbovar@hotmail.com",
  telefono: "+34665388685",        // ✅ Con indicador internacional
  whatsappJid: "34665388685@s.whatsapp.net",
  
  // 📍 Modalidad
  modalidad: "virtual",            // virtual | presencial | manual
  
  // 🔗 Google Calendar
  calendarEventId: "abc123...",    // Para update/delete
  calendarLink: "https://...",
  
  // 📝 Origen
  source: "website_scheduler",     // website_scheduler | google_calendar_manual_create
  lastModified: "google_calendar_manual"  // Quién hizo el último cambio
}
```

---

## ⚠️ Puntos Importantes

### 1. **Timezone - NO convertir**
```javascript
// ✅ CORRECTO - Extraer directamente
const startTime = calendarEvent.startDateTime.match(/T(\d{2}:\d{2})/)[1]

// ❌ INCORRECTO - No convertir timezone
const startTime = new Date(dateTime).toLocaleString('en-US', { timeZone: 'America/Bogota' })
```
**Razón:** El calendario de la doctora ya está en zona Bogotá, las horas vienen correctas.

### 2. **Teléfono Internacional**
```javascript
// ✅ Preservar el símbolo +
if (trimmed.startsWith('+')) {
  return trimmed.replace(/\s/g, '')  // Solo quitar espacios
}
```
**Razón:** Para WhatsApp y MongoDB necesitamos el formato completo: `+34665388685`

### 3. **Update vs Create**
- **UPDATE**: Mantiene todos los datos del cliente, solo actualiza fecha/hora
- **CREATE**: Crea nuevo registro con valores por defecto

### 4. **ServiceType Detection**
```javascript
if (durationMinutes >= 70 && durationMinutes <= 80) {
  serviceType = 'individual'  // 75 min
} else if (durationMinutes >= 110 && durationMinutes <= 130) {
  serviceType = 'parejas'  // 120 min
} else {
  serviceType = 'manual'  // Otros
}
```

---

## 🚀 Testing

### Test UPDATE:
1. Crear cita desde web
2. Verificar en MongoDB: `telefono: "+34665388685"`, `email: "real@email.com"`
3. En Google Calendar, cambiar hora de 10:00 a 11:00
4. Verificar en MongoDB: 
   - ✅ `startTime` actualizado a "11:00"
   - ✅ `telefono` sigue siendo "+34665388685"
   - ✅ `email` sigue siendo "real@email.com"

### Test CREATE Manual:
1. Crear evento manual: "Cita telefónica - 75 min"
2. Verificar en MongoDB:
   - ✅ `serviceType: "individual"` (detectado por duración)
   - ✅ `isBooked: true`
   - ✅ `email: "manual@calendar.block"`
   - ✅ `source: "google_calendar_manual_create"`

### Test DELETE:
1. Eliminar evento de Google Calendar
2. Verificar que desaparece de MongoDB
3. Verificar que el horario aparece disponible en la web

---

## 📦 Resumen de Nodos

| Nodo | Tipo | Función |
|------|------|---------|
| Webhook | Trigger | Recibe citas desde web |
| Code | Transform | Procesa datos del webhook |
| Google Calendar | Action | Crea evento en calendar |
| Code1 | Transform | Prepara datos para MongoDB |
| MongoDB | Action | Inserta cita desde web |
| Google Calendar Trigger | Trigger | Detecta eliminaciones |
| Edit Fields | Transform | Extrae calendarEventId |
| Delete documents | Action | Elimina de MongoDB |
| Google Calendar Trigger1 | Trigger | Detecta actualizaciones |
| Edit Fields1 | Transform | Extrae datos del evento |
| Process Calendar Update1 | Transform | Procesa UPDATE |
| Update MongoDB Document | Action | Actualiza MongoDB |
| Google Calendar Trigger2 | Trigger | Detecta creaciones manuales |
| Edit Fields2 | Transform | Extrae datos del evento |
| Process Manual Event | Transform | Procesa CREATE manual |
| Insert Manual Event to MongoDB | Action | Inserta bloqueo manual |

---

## ✅ Checklist de Funcionamiento

- [x] Webhook recibe citas con teléfono internacional correcto
- [x] Google Calendar crea eventos con toda la información
- [x] MongoDB guarda `whatsappJid` correctamente
- [x] DELETE elimina citas de MongoDB cuando se cancelan
- [x] UPDATE mantiene datos del cliente al cambiar hora
- [x] UPDATE extrae hora directamente sin conversión timezone
- [x] CREATE detecta eventos manuales y los bloquea
- [x] CREATE detecta tipo de servicio por duración
- [x] CREATE usa valores por defecto para campos sin datos

---

## 🎨 Diagrama Visual

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUJO 1: WEBHOOK (Web)                    │
├─────────────────────────────────────────────────────────────┤
│ Usuario Web → Webhook → Code → Google Calendar → Code1 →   │
│ → MongoDB → Respond                                         │
│ ✅ Todos los datos del cliente                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│            FLUJO 2: DELETE (Cancelar en Calendar)           │
├─────────────────────────────────────────────────────────────┤
│ Calendar Trigger → Edit Fields → Delete MongoDB            │
│ ✅ Libera el horario                                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│         FLUJO 3: UPDATE (Modificar en Calendar)             │
├─────────────────────────────────────────────────────────────┤
│ Calendar Trigger1 → Edit Fields1 → Process Update →        │
│ → Update MongoDB                                            │
│ ✅ Actualiza solo fecha/hora, mantiene datos cliente       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│          FLUJO 4: CREATE (Crear en Calendar)                │
├─────────────────────────────────────────────────────────────┤
│ Calendar Trigger2 → Edit Fields2 → Process Manual →        │
│ → Insert MongoDB                                            │
│ ✅ Bloquea horario con valores por defecto                 │
└─────────────────────────────────────────────────────────────┘
```

---

**Fecha de documentación:** 2025-11-03  
**Versión:** 2.0  
**Estado:** ✅ Completo y funcional

