# CourtHub - Sistema de Reservas Deportivas

## Descripción del Proyecto
CourtHub es una aplicación web desarrollada con Next.js que permite la gestión de reservas de espacios deportivos. El sistema maneja múltiples roles de usuario y ofrece diferentes funcionalidades según el nivel de acceso.

## Características Principales

### 1. Autenticación
- Sistema de autenticación basado en JWT (JSON Web Tokens)
- Almacenamiento seguro de tokens en cookies
- Middleware para protección de rutas
- Funcionalidades de login y logout
- Verificación de roles y permisos

```typescript
// Ejemplo de implementación del middleware
export function middleware(request: NextRequest) {
const token = request.cookies.get('token')?.value;
if (!token) {
return NextResponse.redirect(new URL('/', request.url));
}
// Verificación de roles y permisos
}
```


### 2. Autorización
- Sistema de roles implementado:
  - Administrador
  - Jugador
  - Árbitro
  - Entrenador
- Permisos específicos por rol
- Interfaz adaptativa según el rol del usuario

### 3. Gestión de Reservas
- CRUD completo de reservas:
  - Crear nueva reserva
  - Listar reservas (filtrado por deporte)
  - Editar reservas existentes
  - Cancelar reservas
- Validaciones de formularios
- Manejo de errores y estados de carga

### 4. Interfaz de Usuario
- Diseño responsive con Tailwind CSS
- Navegación intuitiva
- Componentes reutilizables
- Mensajes de feedback para el usuario

## Estructura del Proyecto

sports-reservation-frontend/
├── src/
│ ├── app/
│ │ ├── admin/
│ │ ├── jugador/
│ │ ├── arbitro/
│ │ └── reservas/
│ ├── components/
│ ├── contexts/
│ └── middleware.ts
├── public/
└── package.json


## Implementación Técnica

### Autenticación y Autorización
- Implementación de JWT para manejo de sesiones
- Middleware personalizado para verificación de rutas
- Decodificación de tokens para obtener roles y permisos

### Gestión del Estado
- Uso de Context API para estado global
- Estados locales con useState para componentes específicos
- Manejo de efectos secundarios con useEffect

### Rutas y Navegación
- Sistema de rutas basado en archivos de Next.js
- Rutas dinámicas para detalles de reservas
- Protección de rutas según rol de usuario

## Endpoints Principales

### Reservas
- `GET /reservas/listar` - Listar todas las reservas (admin)
- `GET /reservas/mis-reservas` - Listar reservas del usuario
- `POST /reservas/crear` - Crear nueva reserva
- `PUT /reservas/editar/:id` - Editar reserva existente
- `DELETE /reservas/cancelar/:id` - Cancelar reserva

## Tecnologías Utilizadas
- Next.js 13+
- TypeScript
- Tailwind CSS
- JWT para autenticación
- Cookies para almacenamiento de tokens

## Instalación y Configuración

**Clonar el repositorio**

git clone [url-repositorio]

**Instalar dependencias**

npm install

**Configurar variables de entorno**

cp .env.example .env.local

**Iniciar servidor de desarrollo**

npm run dev

## Variables de Entorno Requeridas

.env.local
NEXT_PUBLIC_API_URL="cambiar"

## Autores
- Collin Gonzalez
- Juan Ramirez
