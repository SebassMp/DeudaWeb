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

## Preview del frontend (Vercel)

Puedes desplegar el frontend en Vercel para tener una vista previa.

- URL (Vercel): PENDIENTE (pega aqui tu URL cuando termines el deploy)

Notas:

- Esta preview puede usarse como demo visual.
- Para que cargue datos reales, el backend debe estar desplegado y accesible por Internet (URL publica).

### Despliegue del frontend en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel: New Project -> Importa el repo.
3. Configura:
   - Framework Preset: Create React App
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: build
4. Variables de entorno (Project Settings -> Environment Variables):
   - REACT_APP_API_URL = https://TU_BACKEND_PUBLICO
5. Deploy.

### Backend (despliegue separado)

Vercel es ideal para el frontend, pero no para un backend Django tradicional en este tipo de proyecto. Para que la app funcione completa en produccion/preview con datos reales, despliega el backend en una plataforma dedicada, por ejemplo:

- Render
- Railway
- Fly.io
- VPS

En produccion se recomienda usar Postgres en lugar de SQLite.

## Que incluye esta plantilla

- Crear y administrar clientes.
- Registrar deudas por cliente.
- Registrar pagos/abonos a las deudas.
- Ver estados (pendiente, vencida, pagada) y progreso de pago.
- Consultar un resumen general en el dashboard.

## Capturas (screenshots)

Las capturas estan en `docs/images/`.

### Dashboard

![Dashboard](docs/images/dashboard.png)

### Lista de clientes

![Clientes](docs/images/clientes.png)

### Informacion de cliente

![Info](docs/images/info.png)

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

2. Crear y activar un entorno virtual (Windows PowerShell):

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

## Configuracion de la URL del backend

Recomendado: usar variable de entorno.

- En local: crea un archivo `frontend/.env` con:
  - REACT_APP_API_URL=http://localhost:8000

Luego, en el frontend, usa `process.env.REACT_APP_API_URL` como base URL (si aun no esta aplicado, ajustalo antes del deploy).

## Base de datos

Por defecto se usa SQLite (archivo `backend/db.sqlite3`). Para produccion se recomienda Postgres.

## Licencia

MIT. Ver el archivo LICENSE.
