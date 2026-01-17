# Actualización del Flujo N8N para Wompi

## 📋 Resumen de Cambios

El flujo de N8N ha sido actualizado para recibir y almacenar información de pagos realizados con Wompi.

---

## 🔄 Cambios Realizados

### 1. Campos Nuevos en MongoDB

Se agregaron los siguientes campos a la colección `appointment_slots`:

```javascript
// Información del pago
pagado: boolean              // true si la cita fue pagada
pagoEstado: string           // APPROVED, DECLINED, PENDING, etc.
pagoTransaccionId: string    // ID de la transacción en Wompi
pagoReferencia: string       // Referencia única generada
pagoMonto: number            // Monto pagado (en pesos)
pagoMoneda: string           // COP
pagoFecha: string            // Fecha del pago (ISO)
pagoMetodo: string           // CARD, PSE, NEQUI, etc.
status: string               // confirmed | pending_confirmation
```

### 2. Modificaciones en el Nodo `Code` (Primer Code Node)

Se agregó información del pago a la descripción del evento de calendario:

```javascript
description: [
  `📍 Modalidad: ${data.modalidadDetalle?.tipo || 'N/A'}`,
  data.modalidadDetalle?.indicaciones,
  data.mensaje ? `📝 Mensaje: ${data.mensaje}` : '',
  `⏱ Duración: ${data.servicioDetalle?.duracion || '75 minutos'}`,
  // NUEVO: Mostrar info de pago si existe
  data.pagado ? `💳 Pago: ${data.pagoEstado} - ${data.pagoReferencia}` : ''
].filter(Boolean).join('\n')
```

### 3. Modificaciones en el Nodo `Code1` (Segundo Code Node)

Se agregó el mapeo de los nuevos campos del pago:

```javascript
// NUEVO: Datos del pago
pagado: d.pagado || false,
pagoEstado: d.pagoEstado || 'PENDING',
pagoTransaccionId: d.pagoTransaccionId || null,
pagoReferencia: d.pagoReferencia || null,
pagoMonto: d.pagoMonto || 0,
pagoMoneda: d.pagoMoneda || 'COP',
pagoFecha: d.pagoFecha || null,
pagoMetodo: d.pagoMetodo || 'desconocido',

// Estado de la cita
status: d.status || 'pending_confirmation',
```

### 4. Modificaciones en el Nodo `MongoDB`

Se actualizó la lista de campos para incluir los campos del pago:

```
fields: "date, startTime, endTime, serviceType, isBooked, nombre, email, 
         telefono, whatsappJid, modalidad, mensaje, timezone, servicioDetalle, 
         modalidadDetalle, title, location, description, calendarEventId, 
         calendarLink, timestamp, fechaCompleta, source, createdAt, 
         pagado, pagoEstado, pagoTransaccionId, pagoReferencia, pagoMonto, 
         pagoMoneda, pagoFecha, pagoMetodo, status"
```

---

## 📦 Archivos Generados

### Nuevo Archivo de Flujo Actualizado:
`n8n/agendar_citas_web_sandramar_actualizado.json`

Este es el flujo completo con todos los cambios aplicados.

---

## 🔧 Cómo Aplicar los Cambios en N8N

### Opción 1: Importar el Flujo Completo (Recomendado)

1. Ve a tu instancia de N8N
2. Haz clic en **Workflows** → **Import from File**
3. Selecciona `n8n/agendar_citas_web_sandramar_actualizado.json`
4. Esto creará un nuevo workflow
5. **IMPORTANTE**: Actualiza las credenciales:
   - Nodo `Google Calendar`: Reconecta tu cuenta de Google
   - Nodo `MongoDB`: Reconecta tu base de datos
6. Copia la URL del webhook del nuevo flujo
7. Actualiza la variable `NEXT_PUBLIC_WEBHOOK_AGENDAR_CITAS` en Vercel
8. Desactiva el workflow antiguo
9. Activa el nuevo workflow

### Opción 2: Modificar el Flujo Existente Manualmente

Si prefieres editar el flujo actual:

#### Paso 1: Modificar Nodo `Code` (Primer Code Node)
Edita el nodo `Code` y agrega al final del array `description`:

```javascript
data.pagado ? `💳 Pago: ${data.pagoEstado} - ${data.pagoReferencia}` : ''
```

#### Paso 2: Modificar Nodo `Code1` (Segundo Code Node)
En el objeto que se retorna, antes de `processedAt`, agrega:

```javascript
// Datos del pago
pagado: d.pagado || false,
pagoEstado: d.pagoEstado || 'PENDING',
pagoTransaccionId: d.pagoTransaccionId || null,
pagoReferencia: d.pagoReferencia || null,
pagoMonto: d.pagoMonto || 0,
pagoMoneda: d.pagoMoneda || 'COP',
pagoFecha: d.pagoFecha || null,
pagoMetodo: d.pagoMetodo || 'desconocido',
status: d.status || 'pending_confirmation',
```

También actualiza el `version` a `'2.1'`.

#### Paso 3: Modificar Nodo `MongoDB`
Edita el nodo `MongoDB` y en el campo `fields`, agrega al final:

```
, pagado, pagoEstado, pagoTransaccionId, pagoReferencia, pagoMonto, pagoMoneda, pagoFecha, pagoMetodo, status
```

#### Paso 4: Guardar y Activar
Guarda los cambios y asegúrate de que el workflow esté activo.

---

## 🧪 Cómo Verificar que Funciona

### Prueba 1: Cita con Pago
1. Agenda una cita desde el sitio web
2. Completa el pago en Wompi
3. Ve a MongoDB y verifica que el documento tenga:
   ```json
   {
     "pagado": true,
     "pagoEstado": "APPROVED",
     "pagoTransaccionId": "txn_xxxxx",
     "pagoReferencia": "CITA-1234567-INDIVIDUAL",
     "pagoMonto": 150000,
     "status": "confirmed"
   }
   ```
4. Verifica que el evento en Google Calendar muestre la info del pago

### Prueba 2: Cita sin Pago (Retrocompatibilidad)
Si por alguna razón llega una cita sin pago (no debería pasar, pero por si acaso):
1. El sistema debe guardar los valores por defecto:
   ```json
   {
     "pagado": false,
     "pagoEstado": "PENDING",
     "status": "pending_confirmation"
   }
   ```

---

## 📊 Ejemplo de Payload Completo

Cuando el sitio web envía una cita pagada, el webhook recibe:

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+573101234567",
  "servicio": "individual",
  "fecha": "2026-01-20",
  "hora": "10:00",
  "duracion": "75 min",
  "modalidad": "presencial",
  "mensaje": "Primera cita",
  
  "pagado": true,
  "pagoEstado": "APPROVED",
  "pagoTransaccionId": "txn_123abc456def",
  "pagoReferencia": "CITA-1737128400000-INDIVIDUAL",
  "pagoMonto": 150000,
  "pagoMoneda": "COP",
  "pagoFecha": "2026-01-17T15:30:00.000Z",
  "pagoMetodo": "CARD",
  
  "status": "confirmed",
  "timestamp": "2026-01-17T15:30:00.000Z",
  "fechaCompleta": "2026-01-20T10:00:00-05:00",
  "source": "website_scheduler_with_payment",
  "timezone": "America/Bogota",
  
  "servicioDetalle": {
    "nombre": "Terapia Individual",
    "duracion": "75 minutos",
    "precio": 150000
  },
  "modalidadDetalle": {
    "tipo": "presencial",
    "ubicacion": "Carrera 13 Nº 122 – 34, Santa Bárbara, Bogotá"
  }
}
```

---

## 🔍 Diferencias Entre Citas con y sin Pago

| Campo | Sin Pago | Con Pago |
|-------|----------|----------|
| `pagado` | `false` | `true` |
| `pagoEstado` | `'PENDING'` | `'APPROVED'` |
| `pagoTransaccionId` | `null` | `'txn_xxxxx'` |
| `pagoReferencia` | `null` | `'CITA-xxxx'` |
| `pagoMonto` | `0` | `150000` o `200000` |
| `status` | `'pending_confirmation'` | `'confirmed'` |

---

## ⚠️ Importante

### Retrocompatibilidad
El flujo es **retrocompatible**. Si por alguna razón recibe datos sin información de pago, usará valores por defecto y no fallará.

### No Requiere Cambios en MongoDB
No necesitas crear nuevos campos en MongoDB manualmente. MongoDB los creará automáticamente cuando llegue el primer documento con esos campos.

### Conserva los Logs
Los logs de N8N ahora incluirán información del pago para debugging:

```javascript
console.log('📅 Procesando cita:', {
  fecha: d.fecha,
  horaInicio: startTime,
  horaFin: endTime,
  servicio: d.servicio,
  duracion: `${duration} minutos`,
  cliente: d.nombre,
  pagado: d.pagado || false  // NUEVO
})
```

---

## 🎯 Checklist de Implementación

- [ ] Backup del flujo actual de N8N
- [ ] Importar nuevo flujo o aplicar cambios manualmente
- [ ] Reconectar credenciales (Google Calendar + MongoDB)
- [ ] Copiar nueva URL del webhook
- [ ] Actualizar `NEXT_PUBLIC_WEBHOOK_AGENDAR_CITAS` en Vercel
- [ ] Desplegar cambios en Vercel
- [ ] Probar con una cita real (con pago)
- [ ] Verificar en MongoDB que se guardó correctamente
- [ ] Verificar en Google Calendar que aparece la info del pago
- [ ] Desactivar flujo antiguo (si creaste uno nuevo)

---

## 📞 Soporte

Si tienes problemas con el flujo de N8N:
1. Revisa los logs de ejecución en N8N
2. Verifica que las credenciales estén conectadas
3. Asegúrate de que el webhook esté activo
4. Verifica que la URL del webhook en Vercel sea correcta

---

**Última actualización**: 2026-01-17
**Versión del flujo**: 2.1
