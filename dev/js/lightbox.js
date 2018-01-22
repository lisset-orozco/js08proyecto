// lo recomendable es hacerlo de manera declarativa
// es decir crear funciones y que cada función haga una tarea específica
// y luego las funciones se van a ir comunicando entre ellas
// de esa manera no se tiene ninguna variable en el ambito global

// obtener un array con las imagenes
// obtener la galería de imágenes
const getImages = container => [...container.querySelectorAll('img')];

// obtener un array de las rutas de las imágenes grande
const getLargeImages = gallery => gallery
  .map(el => el.src)
  .map(el => el.replace('-thumb', '')) ;

// obtener las descripciones de las imágenes
const getDescriptions = gallery => gallery.map(el => el.alt);

// recibe un contenedor y un array de imágenes (gallery)
// capturar el evento click en la galería para abrir el lightbox
const openLightboxEvent = (container, gallery, larges, descriptions) => {
  container.addEventListener('click', ev => {
    let el = ev.target, // elemento donde se ejecuta el click
      i = gallery.indexOf(el); // indice del elemento
    if (el.tagName === 'IMG') { // verifica que se hizo click en una imagen
      console.log(el.tagName);
      openLightbox(gallery, i, larges, descriptions);
    }
  });
};
// al hacer click en una imagen se abra su version grande
// Imprimir overlay de lightbox en el body
const openLightbox = (gallery, i, larges, descriptions) => {
  //
  let lightboxElement = document.createElement('div'), // ????¿¡¿¿¿ ✕ ⛌
    lightboxContent = `
      <div class="lightbox-overlay"> 
        <figure class="lightbox-container">
          <div class="close-modal"> ✕ </div>
          <img src="${larges[i]}" alt="" class="lightbox-image">
            <figcaption>
              <p class="lightbox-description">${descriptions[i]}</p>
              <nav class="lightbox-navigation">
                <a href="#" class="lightbox-navigation__button prev"> ◀ </a>
                <span class="lightbox-navigation__counter">Imagen ${i + 1} de ${gallery.length}</span>
                <a href="#" class="lightbox-navigation__button next"> ▶ </a>
              </nav>
            </figcaption>
        </figure>
      </div>
    `;
  lightboxElement.innerHTML = lightboxContent;
  lightboxElement.id = 'lightbox';
  document.body.appendChild(lightboxElement);

  closeModal(lightboxElement); // se cierra el div que se creó
  navigateLightbox(lightboxElement, i, larges, descriptions);
/*
  setTimeout(() => {
    closeModal(lightboxElement); // se cierra el div que se creó
  }, 5000);  */
};

const navigateLightbox = (lightboxElement, i, larges, descriptions) => {
  let prevButton = lightboxElement.querySelector('.prev'),
    nextButton = lightboxElement.querySelector('.next'),
    image = lightboxElement.querySelector('img'),
    description = lightboxElement.querySelector('p'),
    counter = lightboxElement.querySelector('span'),
    closeModal = lightboxElement.querySelector('.close-modal');

  window.addEventListener('keyup', ev => { 
    if (ev.key === 'ArrowRight') nextButton.click();
    if (ev.key === 'ArrowLeft') prevButton.click();
    if (ev.key === 'Escape') closeModal.click();
  });
  lightboxElement.addEventListener('click', evt => {
    evt.preventDefault();
    let target = evt.target,
      lengthLarges = larges.length - 1;

    if (target === prevButton) {
      if (i > 0) {
        i--;
        image.src = larges[i];
      } else {
        image.src = larges[lengthLarges];
        i = lengthLarges;
      }
    } else if (target === nextButton) {
      if (i >= lengthLarges) {
        i = 0;
        image.src = larges[i];
      } else {
        i++;
        image.src = larges[i];
      }
    }

    description.textContent = descriptions[i];
    counter.textContent = `Imagen ${i + 1} de ${larges.length}`;
  });
};

const closeModal = modalElement => {
  let closeModal = modalElement.querySelector('.close-modal');
  closeModal.addEventListener('click', evt => {
    evt.preventDefault();
    document.body.removeChild(modalElement);
  });
};

const lightbox = container => {
  let images = getImages(container),
    larges = getLargeImages(images),
    descriptions = getDescriptions(images);
  
  openLightboxEvent(container, images, larges, descriptions);
}; 

/** 
// lightbox(document.getElementById('gallery-container'));
console.log(document.querySelector('.gallery-container'));
console.log(getImages(document.querySelector('.gallery-container')));
console.log(getLargeImages(getImages(document.querySelector('.gallery-container'))));
   */