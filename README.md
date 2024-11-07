# CourtHub - Frontend

## Descripción
CourtHub es una plataforma de gestión de reservas deportivas que permite a usuarios reservar espacios para diferentes deportes como fútbol, basketball, volleyball, tennis, ping pong y futbolito. El sistema maneja diferentes roles de usuario (administrador, jugador, árbitro, entrenador) con distintos niveles de acceso y funcionalidades.

## Características
- 🔐 Sistema de autenticación JWT
- 👥 Múltiples roles de usuario
- 🏃 Gestión de reservas deportivas
- 📅 Calendario de disponibilidad
- 🎮 Interfaz intuitiva y responsive

## Tecnologías Utilizadas
- Next.js 13+
- TypeScript
- Tailwind CSS
- JWT para autenticación
- Cookies para manejo de sesión

## Autores
- Collin Gonzalez
- Juan Ramirez

## Requisitos Previos
- Node.js 16.x o superior
- npm o yarn
- Backend de CourtHub en ejecución

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/courthub-frontend.git
cd courthub-frontend
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

4. Configurar el archivo .env.local

```bash
NEXT_PUBLIC_API_URL=cambiar
```

5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

## Estructura del Proyecto

sports-reservation-frontend/
├── src/
│ ├── app/
│ │ ├── admin/
│ │ ├── jugador/ 
│ │ ├── arbitro/ 
│ │ ├── entrenador/
│ │ └── reservas/ 
│ ├── middleware.ts
│ └── types/
├── public/
└── package.json


## Funcionalidades por Rol

### Administrador
- Ver todas las reservas
- Editar cualquier reserva
- Cancelar cualquier reserva
- Registrar nuevos administradores

### Jugador
- Crear reservas deportivas
- Ver sus propias reservas
- Editar sus reservas
- Cancelar sus reservas

### Árbitro
- Ver calendario de eventos
- (Funcionalidades en desarrollo)

### Entrenador
- Ver horarios disponibles
- (Funcionalidades en desarrollo)

## Uso
1. Iniciar sesión con credenciales según rol
2. Navegar a la sección de deportes
3. Seleccionar el deporte deseado
4. Gestionar reservas según permisos del rol


## API Endpoints Utilizados
- `POST /auth/login` - Inicio de sesión
- `GET /reservas/listar` - Listar reservas (admin)
- `GET /reservas/mis-reservas` - Reservas del usuario
- `POST /reservas/crear` - Crear reserva
- `PUT /reservas/editar/:id` - Editar reserva
- `DELETE /reservas/cancelar/:id` - Cancelar reserva

## Estado del Proyecto
🚧 En desarrollo activo