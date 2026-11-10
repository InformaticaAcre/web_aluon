# ALUON Web (React + Spring Boot + PostgreSQL)

Este repo parte de una maqueta HTML (`screens/`) y añade una aplicación **funcional**:

- Frontend: **React + TypeScript + Tailwind** (Vite)
- Backend: **Java Spring Boot + Hibernate (JPA) + PostgreSQL** (Flyway)

## Ejecutar

### 1) Backend

Config por defecto (según tu petición):

- `jdbc:postgresql://192.168.99.14:5433/aluon_saas_dev`
- Usuario/clave por defecto: `postgres` / `postgres` (sobrescribible por variables de entorno)

Comandos:

```bash
cd backend
mvn spring-boot:run
```

Variables útiles:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `APP_DB_SCHEMA` (por defecto `aluon_web` para aislar de otros Flyway existentes)
- `SPRING_FLYWAY_TABLE` (por defecto `flyway_schema_history_aluon_web`)
- `APP_CORS_ALLOWED_ORIGINS` (por defecto `http://localhost:5173`)
- `APP_JWT_SECRET` (mín. 32 caracteres)

### 2) Frontend

```bash
npm install
npm run dev
```

Opcional:

- Copia `.env.example` a `.env` si necesitas cambiar `VITE_API_BASE`.

## Despliegue (Ubuntu + Portainer)

Este repo incluye un stack listo para Portainer: `docker-compose.portainer.yml`.

### 1) Publicar imágenes al registry

1. Construye imágenes locales:
   - `docker compose -f docker-compose.yml build`
2. Publícalas (requiere `docker login` al registry):
   - `ALUON_REGISTRY=ghcr.io/ORG ALUON_FRONTEND_TAG=1.0.0 ALUON_BACKEND_TAG=0.1.0 ./scripts/publish-images.sh`

### 2) Variables de entorno en Portainer (Web editor)

Si usas el modo **Web editor**, pega `docker-compose.portainer.yml` y define estas variables en la sección **Environment variables** del Stack:

- `ALUON_FRONTEND_IMAGE`
- `ALUON_BACKEND_IMAGE`
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `APP_JWT_SECRET` (mínimo 32 caracteres)
- `APP_CORS_ALLOWED_ORIGINS` (ej: `http://192.168.99.14:8010,https://aluon.iconseriespeliculas.xyz`)

Referencia de valores: `portainer.env.example`.

Nota: en tu caso la BD está expuesta en `192.168.99.14:3000` (ej: `jdbc:postgresql://192.168.99.14:3000/aluonbbdd`). Si cambia, ajusta `SPRING_DATASOURCE_URL`.

URLs por defecto:

- Front: `http://192.168.99.14:8010`
- Back: `http://192.168.99.14:8011` (normalmente el frontend consume por `/api/...`)

## Mockup original

- Maqueta HTML original: `screens/`
- Preview simple: `mock/preview.html`
