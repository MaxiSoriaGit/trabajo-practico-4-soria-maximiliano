# API REST de Películas — Trabajo Práctico Integrador IV

API REST desarrollada con Node.js, Express y Sequelize para gestionar un catálogo de películas, con conexión a una base de datos MySQL.

## Tecnologías utilizadas

- Node.js
- Express
- Sequelize
- MySQL
- Thunder Client (para pruebas de la API)

## Estructura del proyecto

├── .gitignore

├── package.json

├── package-lock.json

├── app.js

├── src/

│ ├── config/

│ │ └── database.js

│ ├── models/

│ │ └── movie.model.js

│ ├── routes/

│ │ └── movie.routes.js

│ └── controllers/

│ └── movie.controllers.js

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/MaxiSoriaGit/trabajo-practico-4-soria-maximiliano.git
cd trabajo-practico-4-soria-maximiliano
```

2. Instalar las dependencias:

```bash
npm install
```

3. Crear la base de datos en MySQL:

```sql
CREATE DATABASE movies;
```

4. Configurar las credenciales de conexión en `src/config/database.js` (usuario, contraseña, host y puerto).

5. Levantar el servidor:

```bash
npm run dev
```

El servidor corre en `http://localhost:3300`.

## Modelo de datos: Movie

| Campo    | Tipo    | Obligatorio  | Descripción                          |
| -------- | ------- | ------------ | ------------------------------------ |
| id       | INTEGER | Autogenerado | Identificador único, autoincremental |
| title    | STRING  | Sí           | Título de la película (único)        |
| genre    | STRING  | Sí           | Género de la película                |
| duration | INTEGER | Sí           | Duración en minutos                  |
| year     | INTEGER | Sí           | Año de estreno                       |
| synopsis | TEXT    | No           | Sinopsis de la película              |

## Endpoints

| Método | Endpoint        | Descripción                      |
| ------ | --------------- | -------------------------------- |
| GET    | /api/movies     | Devuelve todas las películas     |
| GET    | /api/movies/:id | Devuelve una película por id     |
| POST   | /api/movies     | Crea una nueva película          |
| PUT    | /api/movies/:id | Actualiza una película existente |
| DELETE | /api/movies/:id | Elimina una película             |

### Ejemplo de body para POST / PUT

```json
{
  "title": "Matrix",
  "genre": "Ciencia ficción",
  "duration": 136,
  "year": 1999,
  "synopsis": "Un hacker descubre la verdadera naturaleza de la realidad."
}
```

## Validaciones implementadas

- `title`, `genre`, `duration` y `year` son obligatorios.
- `duration` debe ser un número entero mayor a cero (no acepta negativos, cero, strings ni decimales).
- `year` debe ser un número entero de 4 dígitos, entre 1888 y el año actual.
- `synopsis`, si se incluye, debe ser una cadena de texto.
- `title` debe ser único: no se permiten dos películas con el mismo título.
- Al editar o eliminar, se verifica primero que la película exista (404 si no existe).
- Todos los errores de validación devuelven código de estado HTTP 400 con un mensaje claro indicando el problema.

## Códigos de respuesta

- `200` — Operación exitosa (GET, PUT, DELETE).
- `201` — Película creada exitosamente (POST).
- `400` — Error de validación en los datos enviados.
- `404` — Película no encontrada.
- `500` — Error inesperado del servidor.

## Flujo de trabajo Git

- `main`: inicialización del proyecto (configuración base, dependencias, gitignore).
- `feature/crud-peliculas`: implementación completa de la conexión a la base de datos, modelo, rutas, controladores y validaciones.
- Merge de `feature/crud-peliculas` hacia `main` una vez verificado el funcionamiento completo de la API.

## Autor

Maximiliano Soria — Instituto Politécnico Formosa (IPF)
Tecnicatura Superior en Desarrollo de Software Multiplataforma
