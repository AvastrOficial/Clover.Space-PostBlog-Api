# Clover.Space-PostBlog-Api

Visualiza blogs recomendados y recientes de Clover.Space usando su API pública.  
Permite cargar, visualizar e interactuar con los blogs directamente desde la web.

![image](https://github.com/user-attachments/assets/ddc9ea1c-e3f3-4fda-95ac-9e035bc94e18)
## ✨ Funcionalidades

- Visualización de blogs recomendados (`Recommended`) y recientes (`Latest`)
- Carga masiva de hasta 100 blogs por solicitud (con paginación automática)
- Visualización de:
  - Imagen destacada del blog
  - Fecha de actualización
  - Idioma del blog
  - Descripción (resumen)
  - Fragmento de contenido
  - Autor del blog (nickname)
  - Botón para ver perfil del autor
  - Link directo para leer el blog completo

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| **HTML5** | Estructura del contenido |
| **CSS3** | Estilos y diseño responsivo |
| **JavaScript (ES6)** | Manipulación DOM y llamadas API |
| **FontAwesome** | Iconos (GitHub en el header) |
| **CORS Anywhere** | Proxy temporal para evitar CORS (solo para pruebas locales) |

## 📡 APIs utilizadas

### Clover.Space Blog API

- **Recomendados**  
  `https://api.clover.space/f/v1/blogs?type=recommend`

- **Recientes**  
  `https://api.clover.space/f/v1/blogs?type=latest`

Estas APIs devuelven listas de blogs en formato JSON.

## 🖼️ ¿Qué datos se visualizan?

Cada blog muestra:

| Campo | Descripción |
|-------|-------------|
| **Imagen** | Primera imagen del `mediaList` (si existe) |
| **Actualizado** | Fecha de última actualización (`updatedTime`) |
| **Idioma** | Código del idioma (`language`) |
| **Contenido** | Primeros 100 caracteres del contenido (`content`) |
| **Descripción** | Resumen o sinopsis (`summary`) |
| **Autor** | Nickname del autor (`author.nickname`) |
| **Ver Perfil** | Botón que abre el perfil del autor en Clover.Space |
| **Leer más** | Link que abre el blog completo |

## ⚙️ ¿Cómo funciona?

### 1️⃣ Carga de datos

- Usa `fetchAllBlogs(apiUrl)` para obtener los blogs de la API (con paginación automática).
- Si existe `nextPageToken`, sigue cargando hasta obtener todos los blogs.

### 2️⃣ Renderizado de blogs

- La función `renderBlogs(blogs, containerId)` crea las tarjetas visuales de cada blog.
- Inserta el contenido en los contenedores correspondientes (`recommendedContainer` o `latestContainer`).

### 3️⃣ Botones de carga

- **Cargar Recomendados** → Llama a `fetchAllBlogs(recommendedApi)` y muestra los blogs recomendados.
- **Cargar Recientes** → Llama a `fetchAllBlogs(latestApi)` y muestra los blogs más recientes.

## 🌍 Nota sobre "Idioma / País"

> **Idioma** mostrado es el campo `language` devuelto por la API (en formato código, por ejemplo `es`, `en`, etc.)  
> **País** no se visualiza, porque la API de Clover.Space **no devuelve país**, solo idioma.  
Si quieres mostrar país, deberíamos implementar una API extra que mapee **idioma → país**, pero actualmente **no es parte del proyecto**.

## ⚠️ Importante sobre CORS

Para pruebas locales, se usa un **CORS Proxy**:  
`https://cors-anywhere.herokuapp.com/`  
Esto permite evitar errores de CORS durante el desarrollo.

> ⚠️ **Este proxy es solo para desarrollo**. Si vas a producción, necesitas una solución propia o configurar los headers CORS correctamente.

