# 📅 Sistema de Agendamiento de Citas - Dra. Sandra Vargas

## 🎯 Descripción General

El sistema de agendamiento permite a los pacientes:
- **Seleccionar tipo de sesión** (Individual, Parejas, Familiar, etc.)
- **Elegir modalidad** (Presencial o Virtual)
- **Elegir fecha disponible** en calendario interactivo
- **Seleccionar horario** de los slots disponibles
- **Completar información personal** para la cita
- **Recibir confirmación inmediata**

## 🏗️ Arquitectura del Sistema

### Componentes Principales

1. **AppointmentScheduler.tsx** - Componente principal con 3 pasos:
   - `calendar`: Selección de servicio, modalidad, fecha y hora
   - `form`: Formulario de datos personales
   - `confirmation`: Confirmación de cita agendada

2. **lib/api.ts** - Funciones para envío a n8n:
   - `submitAppointment()`: Envía datos de cita al webhook
   - Validaciones de email y teléfono
   - Formateo de datos

### Flujo de Usuario

```
1. Tipo de Sesión → 2. Modalidad → 3. Fecha → 4. Horario → 5. Datos → 6. Confirmación
```

## 📊 Datos Enviados al Webhook

### Estructura de Datos (AppointmentData)

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "telefono": "+573101234567",
  "servicio": "individual",
  "fecha": "2024-01-15",
  "hora": "10:00",
  "duracion": "75 min",
  "modalidad": "presencial",
  "mensaje": "Necesito ayuda con ansiedad",
  "timestamp": "2024-01-10T15:30:00.000Z",
  "source": "website",
  "type": "appointment",
  "action": "create",
  "status": "pending",
  "userAgent": "Mozilla/5.0..."
}
```

### Tipos de Servicios

```javascript
const services = [
  { id: 'individual', name: 'Terapia Individual', duration: '75 min' },
  { id: 'parejas', name: 'Terapia de Parejas', duration: '120 min' },
  { id: 'familiar', name: 'Terapia Familiar', duration: '120 min' },
  { id: 'desarrollo', name: 'Desarrollo Personal', duration: '75 min' }
]
```

### Modalidades Disponibles

```javascript
const modalidades = [
  {
    id: 'presencial',
    name: 'Presencial',
    icon: '🏢',
    description: 'En el consultorio - Carrera 13 Nº 122 – 34, Santa Bárbara'
  },
  {
    id: 'virtual',
    name: 'Virtual', 
    icon: '💻',
    description: 'Por videollamada - Desde la comodidad de tu hogar'
  }
]
```

## 🔗 Configuración del Webhook n8n

### 1. Crear Workflow de Agendamiento

```
Webhook → Validar Datos → Verificar Disponibilidad → Guardar Cita → Enviar Emails
```

### 2. Nodos Recomendados

#### **Webhook Node**
- URL: `/webhook/contacto`
- Método: POST
- Autenticación: Ninguna (o según preferencia)

#### **Function Node - Validar Datos**
```javascript
// Validar datos recibidos
const data = items[0].json;

if (data.type === 'appointment') {
  // Validar campos requeridos
  const required = ['nombre', 'email', 'telefono', 'servicio', 'fecha', 'hora', 'modalidad'];
  const missing = required.filter(field => !data[field]);
  
  if (missing.length > 0) {
    throw new Error(`Campos faltantes: ${missing.join(', ')}`);
  }
  
  // Validar modalidad
  const modalidadesValidas = ['presencial', 'virtual'];
  if (!modalidadesValidas.includes(data.modalidad)) {
    throw new Error(`Modalidad inválida: ${data.modalidad}`);
  }
  
  // Generar ID único para la cita
  data.citaId = `CITA-${Date.now()}`;
  data.fechaCreacion = new Date().toISOString();
}

return items;
```

#### **HTTP Request Node - Verificar Disponibilidad**
- Para consultar calendar API o base de datos
- Verificar que el slot esté disponible
- Evitar doble agendamiento

#### **Database Node - Guardar Cita**
```sql
INSERT INTO citas (
  cita_id, nombre, email, telefono, servicio, 
  fecha, hora, duracion, modalidad, mensaje, estado, fecha_creacion
) VALUES (
  '{{$json["citaId"]}}', '{{$json["nombre"]}}', '{{$json["email"]}}', 
  '{{$json["telefono"]}}', '{{$json["servicio"]}}', '{{$json["fecha"]}}', 
  '{{$json["hora"]}}', '{{$json["duracion"]}}', '{{$json["modalidad"]}}', 
  '{{$json["mensaje"]}}', 'confirmada', '{{$json["fechaCreacion"]}}'
)
```

#### **Email Node - Notificar Doctora**
```html
<h2>Nueva Cita Agendada</h2>
<p><strong>Paciente:</strong> {{$json["nombre"]}}</p>
<p><strong>Email:</strong> {{$json["email"]}}</p>
<p><strong>Teléfono:</strong> {{$json["telefono"]}}</p>
<p><strong>Servicio:</strong> {{$json["servicio"]}}</p>
<p><strong>Modalidad:</strong> {{$json["modalidad"]}}</p>
<p><strong>Fecha:</strong> {{$json["fecha"]}}</p>
<p><strong>Hora:</strong> {{$json["hora"]}}</p>
<p><strong>Duración:</strong> {{$json["duracion"]}}</p>
<p><strong>Mensaje:</strong> {{$json["mensaje"]}}</p>
```

#### **Email Node - Confirmar Paciente**
```html
<h2>¡Cita Confirmada!</h2>
<p>Hola {{$json["nombre"]}},</p>
<p>Tu cita ha sido agendada exitosamente:</p>
<ul>
  <li><strong>Servicio:</strong> {{$json["servicio"]}}</li>
  <li><strong>Modalidad:</strong> {{$json["modalidad"]}}</li>
  <li><strong>Fecha:</strong> {{$json["fecha"]}}</li>
  <li><strong>Hora:</strong> {{$json["hora"]}}</li>
  <li><strong>Duración:</strong> {{$json["duracion"]}}</li>
</ul>
<p>La Dra. Sandra se pondrá en contacto contigo 24 horas antes para confirmar.</p>
{{#if (eq modalidad "virtual")}}
<p><strong>Nota:</strong> Al ser una cita virtual, recibirás el enlace de la videollamada 15 minutos antes de la sesión.</p>
{{/if}}
{{#if (eq modalidad "presencial")}}
<p><strong>Dirección:</strong> Carrera 13 Nº 122 – 34, Santa Bárbara, Bogotá</p>
{{/if}}
```

## 🗄️ Base de Datos Recomendada

### Tabla: `citas`

```sql
CREATE TABLE citas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cita_id VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  servicio VARCHAR(50) NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  duracion VARCHAR(20) NOT NULL,
  modalidad VARCHAR(50) NOT NULL,
  mensaje TEXT,
  estado ENUM('pending', 'confirmada', 'cancelada', 'completada') DEFAULT 'pending',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_fecha (fecha),
  INDEX idx_estado (estado),
  INDEX idx_email (email)
);
```

### Tabla: `horarios_disponibles`

```sql
CREATE TABLE horarios_disponibles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  disponible BOOLEAN DEFAULT TRUE,
  tipo_bloqueo ENUM('cita', 'personal', 'feriado') NULL,
  
  UNIQUE KEY unique_fecha_hora (fecha, hora),
  INDEX idx_fecha_disponible (fecha, disponible)
);
```

## 🔄 Operaciones CRUD

### Crear Cita (CREATE)
```json
{
  "type": "appointment",
  "action": "create",
  "status": "pending",
  ...datos de la cita
}
```

### Leer Citas (READ)
```json
{
  "type": "appointment",
  "action": "read",
  "filters": {
    "fecha": "2024-01-15",
    "estado": "confirmada"
  }
}
```

### Actualizar Cita (UPDATE)
```json
{
  "type": "appointment",
  "action": "update",
  "citaId": "CITA-1234567890",
  "changes": {
    "fecha": "2024-01-16",
    "hora": "11:00"
  }
}
```

### Cancelar Cita (DELETE)
```json
{
  "type": "appointment",
  "action": "cancel",
  "citaId": "CITA-1234567890",
  "motivo": "Reagendamiento solicitado por paciente"
}
```

## 📱 Funcionalidades Adicionales

### 1. Disponibilidad Dinámica
- Consultar horarios desde base de datos
- Bloquear slots ya ocupados
- Considerar días festivos y vacaciones

### 2. Recordatorios Automáticos
- Email 24h antes de la cita
- SMS 2h antes (opcional)
- WhatsApp con enlace de confirmación

### 3. Gestión de Cancelaciones
- Link de cancelación en emails
- Reagendamiento automático
- Lista de espera para horarios populares

## 🎨 Personalización del Calendario

### Horarios Disponibles
Actualmente configurado en el componente:
```javascript
const timeSlots = [
  { time: '08:00', available: true, id: '1' },
  { time: '09:00', available: true, id: '2' },
  { time: '10:00', available: false, id: '3' }, // Ocupado
  // ... más horarios
]
```

### Días Laborales
- **Lunes a Viernes**: 8:00 AM - 6:00 PM
- **Sábados**: 9:00 AM - 3:00 PM
- **Domingos**: Cerrado

### Validaciones
- No permite agendar en días pasados
- No permite fines de semana (configurable)
- Valida formato de email y teléfono colombiano

## 🚀 Mejoras Futuras

### Fase 2
- [ ] Integración con Google Calendar
- [ ] Pagos en línea (PSE, tarjetas)
- [ ] Historial de citas del paciente
- [ ] Rating y comentarios post-sesión

### Fase 3
- [ ] Videollamadas integradas
- [ ] Recordatorios automáticos por WhatsApp
- [ ] Dashboard para la doctora
- [ ] App móvil nativa

## 🔧 Configuración Técnica

### Variables de Entorno
```bash
NEXT_PUBLIC_WEBHOOK_URL=https://tu-n8n.com/webhook/contacto
NEXT_PUBLIC_WHATSAPP_NUMBER=573106983385
```

### Dependencias Adicionales
```bash
npm install react-calendar date-fns react-time-picker
```

## 📞 Soporte

Para dudas sobre implementación o configuración del sistema de agendamiento, consulta la documentación de n8n o contacta al desarrollador. 