# Sistema de Gestión para Impresión y Diseño 3D — gio-no-mono

Sistema web para la gestión de cotizaciones, pedidos, producción, inventario y clientes de **gio-no-mono**, un emprendimiento ecuatoriano de impresión 3D y diseño 3D ubicado en Ricaurte, Molinopamba Alto.

## Stack Tecnológico

### Backend (`./backend`)
- **NestJS 11** — Framework Node.js para API REST
- **TypeORM** — ORM para la base de datos
- **SQLite (better-sqlite3)** — Base de datos en desarrollo
- **JWT + Passport** — Autenticación y autorización
- **bcrypt** — Cifrado de contraseñas
- **class-validator / class-transformer** — Validación de DTOs
- **Throttler** — Rate limiting

### Frontend (`./frontend`)
- **Next.js 16** — Framework React con App Router
- **React 19** — UI
- **Tailwind CSS 4** — Estilos
- **TypeScript**

## Estructura del Proyecto

```
sistema-gestion-3d/
├── backend/
│   └── src/
│       ├── auth/           # Autenticación JWT (login, registro, guards)
│       ├── usuarios/       # Gestión de usuarios (CRUD)
│       ├── cotizaciones/   # Cotizador online (cálculo de precios)
│       ├── pedidos/        # Gestión de pedidos (estados, seguimiento)
│       ├── productos/      # Catálogo de productos/servicios
│       ├── inventario/     # Control de stock y alertas
│       ├── common/         # Guards, decoradores, utilerías
│       ├── app.module.ts   # Módulo principal
│       └── main.ts         # Punto de entrada
├── frontend/
│   ├── app/
│   │   ├── page.tsx        # Landing page
│   │   ├── login/          # Inicio de sesión
│   │   ├── registro/       # Registro de usuarios
│   │   ├── dashboard/      # Panel del cliente
│   │   ├── cotizador/      # Cotizador online
│   │   ├── contacto/       # Página de contacto
│   │   ├── galeria/        # Galería de trabajos
│   │   ├── perfil/         # Perfil de usuario
│   │   └── admin/          # Panel administrativo
│   │       ├── pedidos/    # Gestión de pedidos
│   │       ├── clientes/   # Gestión de clientes
│   │       ├── inventario/ # Gestión de inventario
│   │       ├── produccion/ # Gestión de producción
│   │       └── reportes/   # Reportes
│   └── src/
│       ├── components/     # Componentes reutilizables
│       ├── services/       # Cliente HTTP (api.ts)
│       └── types/          # Tipos TypeScript
└── pnpm-workspace.yaml
```

## Requerimientos Funcionales

| Código | Descripción |
|--------|-------------|
| RF01 | Registro y autenticación de usuarios con roles (cliente/admin) |
| RF02 | Cotizador online: subir archivo 3D, seleccionar material/calidad/cantidad, recibir cotización automática |
| RF03 | Gestión de pedidos: registro, actualización de estado y seguimiento |
| RF04 | Catálogo público de servicios, materiales y precios referenciales |

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/nnyez/sistema-gestion-3d.git
cd sistema-gestion-3d

# Instalar dependencias (backend y frontend)
cd backend && pnpm install
cd ../frontend && pnpm install
cd ..
```

O desde la raíz si configuras pnpm workspace:

```bash
pnpm install
```

## Configuración

### Backend

Copiar `.env.example` a `.env` y ajustar según sea necesario:

```env
JWT_SECRET=gio-no-mono-secret-key-2024
JWT_EXPIRES_IN=24h
DB_TYPE=better-sqlite3
DB_DATABASE=database.sqlite
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
PORT=4000
```

### Frontend

No requiere configuración adicional. Por defecto se conecta al backend en `http://localhost:4000`.

## Ejecución

### Backend (puerto 4000)

```bash
cd backend
pnpm start:dev
```

### Frontend (puerto 3000)

```bash
cd frontend
pnpm dev
```

## Scripts Disponibles

### Backend

| Script | Descripción |
|--------|-------------|
| `pnpm start:dev` | Iniciar en modo desarrollo (watch) |
| `pnpm build` | Compilar a JavaScript |
| `pnpm start:prod` | Iniciar en producción |
| `pnpm test` | Ejecutar pruebas unitarias |
| `pnpm test:e2e` | Ejecutar pruebas e2e |
| `pnpm lint` | Ejecutar linter |

### Frontend

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Iniciar servidor de desarrollo |
| `pnpm build` | Compilar para producción |
| `pnpm start` | Iniciar servidor de producción |
| `pnpm lint` | Ejecutar linter |

## Documentación del Examen

El análisis y diseño completo del sistema se encuentra en la carpeta `context/` del proyecto raíz:

- `documento_examen.md` — Documento completo con diagramas Mermaid
- `documento_examen.tex` — Versión LaTeX del documento
- `guion_video.md` — Guion para presentación en video

## Licencia

Este proyecto fue desarrollado como parte del examen de **Análisis y Diseño de Sistemas** de la Universidad Católica de Cuenca.
