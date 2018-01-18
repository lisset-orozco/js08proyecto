'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// lo recomendable es hacerlo de manera declarativa
// es decir crear funciones y que cada función haga una tarea específica
// y luego las funciones se van a ir comunicando entre ellas
// de esa manera no se tiene ninguna variable en el ambito global

// obtener un array con las imagenes
// obtener la galería de imágenes
var getImages = function getImages(container) {
  return [].concat(_toConsumableArray(container.querySelectorAll('img')));
};

// obtener un array de las rutas de las imágenes grande
var getLargeImages = function getLargeImages(gallery) {
  return gallery.map(function (el) {
    return el.src;
  }).map(function (el) {
    return el.replace('-thumb', '');
  });
};

// obtener las descripciones de las imágenes
var getDescriptions = function getDescriptions(gallery) {
  return gallery.map(function (el) {
    return el.alt;
  });
};

// recibe un contenedor y un array de imágenes (gallery)
// capturar el evento click en la galería para abrir el lightbox
var openLightboxEvent = function openLightboxEvent(container, gallery, larges, descriptions) {
  container.addEventListener('click', function (ev) {
    var el = ev.target,
        // elemento donde se ejecuta el click
    i = gallery.indexOf(el); // indice del elemento
    if (el.tagName === 'IMG') {
      // verifica que se hizo click en una imagen
      console.log(el.tagName);
      openLightbox(gallery, i, larges, descriptions);
    }
  });
};
// al hacer click en una imagen se abra su version grande
// Imprimir overlay de lightbox en el body
var openLightbox = function openLightbox(gallery, i, larges, descriptions) {
  //
  var lightboxElement = document.createElement('div'),
      // ????¿¡¿¿¿ ✕ ⛌
  lightboxContent = '\n      <div class="lightbox-overlay"> \n        <figure class="lightbox-container">\n          <div class="close-modal"> \u2715 </div>\n          <img src="' + larges[i] + '" alt="" class="lightbox-image">\n            <figcaption>\n              <p class="lightbox-description">' + descriptions[i] + '</p>\n              <nav class="lightbox-navigation">\n                <a href="#" class="lightbox-navigation__button prev"> \u25C0 </a>\n                <span class="lightbox-navigation__counter">Imagen ' + (i + 1) + ' de ' + gallery.length + '</span>\n                <a href="#" class="lightbox-navigation__button next"> \u25B6 </a>\n              </nav>\n            </figcaption>\n        </figure>\n      </div>\n    ';
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

var navigateLightbox = function navigateLightbox(lightboxElement, i, larges, descriptions) {
  var prevButton = lightboxElement.querySelector('.prev'),
      nextButton = lightboxElement.querySelector('.next'),
      image = lightboxElement.querySelector('img'),
      description = lightboxElement.querySelector('p'),
      counter = lightboxElement.querySelector('span'),
      closeModal = lightboxElement.querySelector('.close-modal');

  window.addEventListener('keyup', function (ev) {
    if (ev.key === 'ArrowRight') nextButton.click();
    if (ev.key === 'ArrowLeft') prevButton.click();
    if (ev.key === 'Escape') closeModal.click();
  });
  lightboxElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target,
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
    counter.textContent = 'Imagen ' + (i + 1) + ' de ' + larges.length;
  });
};

var closeModal = function closeModal(modalElement) {
  var closeModal = modalElement.querySelector('.close-modal');
  closeModal.addEventListener('click', function (evt) {
    evt.preventDefault();
    document.body.removeChild(modalElement);
  });
};

var lightbox = function lightbox(container) {
  var images = getImages(container),
      larges = getLargeImages(images),
      descriptions = getDescriptions(images);

  openLightboxEvent(container, images, larges, descriptions);
};

// lightbox(document.getElementById('gallery-container'));

/** 
   * 
console.log(document.querySelector('.gallery-container'));
console.log(getImages(document.querySelector('.gallery-container')));
console.log(getLargeImages(getImages(document.querySelector('.gallery-container'))));

   */