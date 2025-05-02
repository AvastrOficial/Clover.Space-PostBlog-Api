// ========== Funciones compartidas ==========
function renderBlogs(blogs, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const reversedBlogs = blogs.slice().reverse();

  reversedBlogs.forEach(blog => {
    const card = document.createElement('div');
    card.className = 'blog-card';

    let imageUrl = '';
    if (Array.isArray(blog.mediaList) && blog.mediaList.length > 0) {
      const media = blog.mediaList[0];
      if (Array.isArray(media.resourceList) && media.resourceList.length > 0) {
        imageUrl = media.resourceList[0].url;
      }
    }
    if (imageUrl) {
      const img = document.createElement('img');
      img.className = 'blog-image';
      img.src = imageUrl;
      img.alt = 'Imagen del blog';
      card.appendChild(img);
    }

    const updated = document.createElement('div');
    updated.className = 'blog-updated';
    updated.textContent = `Actualizado: ${blog.updatedTime || 'Desconocido'}`;
    card.appendChild(updated);

    const language = document.createElement('div');
    language.className = 'blog-language';
    language.textContent = `Idioma: ${blog.language || 'Desconocido'}`;
    card.appendChild(language);

    const content = document.createElement('div');
    content.className = 'blog-content';
    content.textContent = `Contenido: ${blog.content ? blog.content.substring(0, 100) + '...' : 'No disponible'}`;
    card.appendChild(content);

    const description = document.createElement('div');
    description.className = 'blog-description';
    description.textContent = blog.summary || 'Sin descripción.';
    card.appendChild(description);

    const userInfo = document.createElement('div');
    userInfo.className = 'blog-userinfo';
    const nickname = blog.author?.nickname || 'Usuario desconocido';
    const socialId = blog.author?.socialId || '';
    userInfo.textContent = `Publicado por: ${nickname}`;
    card.appendChild(userInfo);

    if (socialId) {
      const profileButton = document.createElement('button');
      profileButton.classList.add('profile-button');
      profileButton.textContent = 'Ver Perfil';
      profileButton.onclick = () => {
        window.open(`https://clover.space/s/u/${socialId}`, '_blank');
      };
      card.appendChild(profileButton);
    }

    const link = document.createElement('a');
    link.className = 'blog-link';
    link.href = blog.url || '#';
    link.target = '_blank';
    link.textContent = 'Leer más';
    card.appendChild(link);

    container.appendChild(card);
  });
}

async function fetchAllBlogs(apiUrl, pageToken = '', collectedBlogs = []) {
  const corsProxy = 'https://cors-anywhere.herokuapp.com/';
  const fullUrl = pageToken ? `${apiUrl}&pageToken=${pageToken}` : `${apiUrl}&size=100`;
  const finalUrl = corsProxy + fullUrl;

  try {
    const response = await fetch(finalUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    if (data.list && Array.isArray(data.list)) {
      collectedBlogs = collectedBlogs.concat(data.list);
    }

    if (data.nextPageToken) {
      return fetchAllBlogs(apiUrl, data.nextPageToken, collectedBlogs);
    } else {
      return collectedBlogs;
    }
  } catch (error) {
    console.error('Error al obtener blogs:', error);
    throw error;
  }
}

// ========== Evento: Cargar Recomendados ==========
const recommendedApi = 'https://api.clover.space/f/v1/blogs?type=recommend';
document.getElementById('loadRecommendedBtn').addEventListener('click', () => {
  const btn = document.getElementById('loadRecommendedBtn');
  btn.textContent = 'Cargando...';
  fetchAllBlogs(recommendedApi)
    .then(blogs => {
      renderBlogs(blogs, 'recommendedContainer');
      btn.textContent = 'Recargar Recomendados';
    })
    .catch(err => {
      alert('Error al cargar los recomendados');
      btn.textContent = 'Cargar Recomendados';
    });
});

// ========== Evento: Cargar Recientes ==========
const latestApi = 'https://api.clover.space/f/v1/blogs?type=latest';
document.getElementById('loadLatestBtn').addEventListener('click', () => {
  const btn = document.getElementById('loadLatestBtn');
  btn.textContent = 'Cargando...';
  fetchAllBlogs(latestApi)
    .then(blogs => {
      renderBlogs(blogs, 'latestContainer');
      btn.textContent = 'Recargar Recientes';
    })
    .catch(err => {
      alert('Error al cargar los recientes');
      btn.textContent = 'Cargar Recientes';
    });
});
