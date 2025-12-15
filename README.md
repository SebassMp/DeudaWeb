# DeudaWeb

![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=flat&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-REST%20API-092E20?style=flat&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=0B1B2B)
![TypeScript](https://img.shields.io/badge/TypeScript-4%2F5-3178C6?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat&logo=node.js&logoColor=white)

Plantilla para un sistema de registro y control de deudas. Permite gestionar clientes, registrar deudas, registrar abonos/pagos y visualizar un resumen general (dashboard) de la cartera.

Este repositorio contiene:

- Backend: Django + Django REST Framework (API).
- Frontend: React + TypeScript (Create React App) consumiendo la API.

## Que incluye esta plantilla

Esta plantilla esta pensada como base para un sistema real. Incluye lo esencial para:

- Crear y administrar clientes.
- Registrar deudas por cliente.
- Registrar pagos/abonos a las deudas.
- Ver estados (pendiente, vencida, pagada) y progreso de pago.
- Consultar un resumen general en el dashboard.

## Capturas (screenshots)

Crea la carpeta `docs/images/` y agrega dos imagenes:

- `docs/images/dashboard.png` (pantalla Dashboard)
- `docs/images/clientes.png` (pantalla Lista de clientes)

Luego se veran aqui:

### Dashboard

![Dashboard](docs/images/dashboard.png)

### Lista de clientes

![Clientes](docs/images/clientes.png)

## Estructura del proyecto

- backend/: Proyecto Django y API.
- frontend/: Aplicacion React.

## Requisitos

- Windows, macOS o Linux.
- Python 3.10+ (recomendado 3.11/3.12).
- Node.js 18+ (recomendado 20 LTS) y npm.

## Instalacion

### 1) Backend (Django)

1. Entrar a la carpeta del backend:

   backend

2. Crear y activar un entorno virtual (ejemplo en Windows PowerShell):

   python -m venv .venv
   .\.venv\Scripts\Activate.ps1

3. Instalar dependencias:

   pip install -r requirements.txt

4. Aplicar migraciones:

   python manage.py migrate

5. Iniciar el servidor:

   python manage.py runserver

La API quedara disponible en:

- http://localhost:8000/

### 2) Frontend (React + TypeScript)

1. Entrar a la carpeta del frontend:

   frontend

2. Instalar dependencias:

   npm install

3. Iniciar el servidor de desarrollo:

   npm start

La web quedara disponible en:

- http://localhost:3000/

Nota: el frontend consume la API en `http://localhost:8000`.

## Configuracion de la URL del backend

Actualmente la base URL esta escrita en el codigo como `http://localhost:8000`.

Para soportar ambientes (local, preview, produccion), se recomienda moverla a una variable de entorno, por ejemplo:

- `REACT_APP_API_URL=http://localhost:8000`

Y usarla en axios como `process.env.REACT_APP_API_URL`.

## Despliegue (preview) en Vercel

Si, puedes desplegar el frontend en Vercel para tener una preview.

Limitacion importante: Vercel solo desplegara el frontend. El backend de Django debe estar desplegado aparte (por ejemplo en Render, Railway, Fly.io o un VPS). Para que la preview funcione, el frontend debe apuntar a una URL publica del backend.

Pasos (en general):

1. Subir el repositorio a GitHub.
2. En Vercel: New Project -> Importar el repo.
3. Configurar:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Agregar variable de entorno en Vercel:
   - `REACT_APP_API_URL=https://TU_BACKEND_PUBLICO`
5. Deploy.

## Base de datos

Por defecto se usa SQLite (archivo `backend/db.sqlite3`). Para produccion se recomienda Postgres.

## Contribuciones

Esta es una plantilla. Puedes extenderla agregando autenticacion, reportes, exportacion, roles y permisos, y mejoras de UI.

## Licencia

MIT. Ver el archivo LICENSE.
