

/*--------------------------------------efecto holografdico 3d---------------------------------------*/

const cartagaleria = document.querySelectorAll(".cartagaleria");

    function aplicarEfectos(elemento) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      elemento.appendChild(circle);

      function updateEffects(x, y, alpha, beta, gamma) {
        const rect = elemento.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Transformación basada en las coordenadas del puntero o la orientación del dispositivo
        const xAxis = (centerX - x) / 20;
        const yAxis = (centerY - y) / 20;

        // Transformación basada en la orientación del dispositivo
        const deviceX = gamma || 0; // Valores del giroscopio
        const deviceY = beta || 0; // Valores del giroscopio
        const deviceZ = alpha || 0; // Valores del giroscopio

        elemento.style.transition = "all 0.15s ease";
        elemento.style.transform = `perspective(800px) rotateX(${yAxis + deviceY}deg) rotateY(${xAxis + deviceX}deg)`;

        // Calcular el box-shadow
        const shadowX = (x - rect.left - rect.width / 2) / 8;
        const shadowY = (y - rect.top - rect.height / 2) / 15;

        elemento.style.boxShadow = `${shadowX}px ${shadowY}px 10px rgba(0, 0, 0, 0.3)`;

        circle.style.left = `${x - rect.left - 50}px`;
        circle.style.top = `${y - rect.top - 50}px`;
      }

      function handleMouseMove(event) {
        updateEffects(event.clientX, event.clientY);
      }

      function handleTouchMove(event) {
        const touch = event.touches[0];
        updateEffects(touch.clientX, touch.clientY);
      }

      function handleDeviceOrientation(event) {
        const { alpha, beta, gamma } = event;
        if (window.innerWidth <= 600) {
          updateEffects(0, 0, alpha, beta, gamma);
        }
      }

      elemento.addEventListener("mousemove", handleMouseMove);
      elemento.addEventListener("mouseleave", () => {
        elemento.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
        elemento.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
        elemento.style.boxShadow = "none";
      });

      elemento.addEventListener("touchmove", handleTouchMove);
      elemento.addEventListener("touchend", () => {
        elemento.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
        elemento.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
        elemento.style.boxShadow = "none";
      });

      // Agregar listener para el giroscopio solo si el tamaño de pantalla es menor a 600px
      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }

      // Manejar cambios en el tamaño de la pantalla
      window.addEventListener("resize", () => {
        if (window.innerWidth > 600) {
          window.removeEventListener("deviceorientation", handleDeviceOrientation);
        } else {
          if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
          }
        }
      });
    }

    cartagaleria.forEach(aplicarEfectos);


/*------------------------------------carrousel de libros-----------------------------------------*/



/*----------------------------------------barra laterasl-------------------------------------*/
document.addEventListener("DOMContentLoaded", function() {
  const barralateral = document.querySelector('.barralateral');
  const cuadrowall = document.querySelector('.cuadrowall');
  const nombre = document.querySelector('.nombre');
  const carouselcontainer = document.querySelectorAll('.carouselcontainer');


  barralateral.addEventListener('mouseover', () => {
    cuadrowall.style.transform = 'scale(0.9) translateX(8%)';
    nombre.style.transform = 'scale(1.1) translateX(35%)';
    cuadrowall.style.filter = 'blur(10px)';
    nombre.style.filter = 'blur(5px) opacity(80%)';
  });

  barralateral.addEventListener('mouseout', () => {
    cuadrowall.style.transform = '';
    nombre.style.transform = '';
    cuadrowall.style.filter = '';
    nombre.style.filter = '';
  });

  const applyHoverEffects = (elements) => {
    elements.forEach((element) => {
      element.classList.add('blur');
      element.style.transition = 'filter 0.5s, transform 0.5s';
      element.style.transform = 'scale(0.95)';
    });
  };

  const removeHoverEffects = (elements) => {
    elements.forEach((element) => {
      element.classList.remove('blur');
      element.style.transition = 'filter 0.5s, transform 0.5s';
      element.style.transform = 'none';
    });
  };

  barralateral.addEventListener('mouseenter', () => {
    applyHoverEffects(carouselcontainer);

  });

  barralateral.addEventListener('mouseleave', () => {
    removeHoverEffects(carouselcontainer);

  });
});


/*----------------------------------scroll galeria------------------------------------------*/


let currentIndex = 2; // Comenzamos con el tercer elemento en el centro (índice 2)
const artworks = document.querySelectorAll('.artwork');
const carousel = document.querySelector('.carousel');

function updateActiveArtwork() {
    // Remover todas las clases de los cuadros
    artworks.forEach((artwork) => {
        artwork.classList.remove('active', 'near', 'far');
    });

    // Añadir clase 'active' al cuadro central
    artworks[currentIndex].classList.add('active');

    // Cuadro de la izquierda
    if (currentIndex - 1 >= 0) {
        artworks[currentIndex - 1].classList.add('near');
    }

    // Cuadro de la derecha
    if (currentIndex + 1 < artworks.length) {
        artworks[currentIndex + 1].classList.add('near');
    }

    // Restante de los cuadros, opacidad baja
    artworks.forEach((artwork, index) => {
        if (index !== currentIndex && index !== currentIndex - 1 && index !== currentIndex + 1) {
            artwork.classList.add('far');
        }
    });
}

function moveCarousel(direction) {
    const totalItems = artworks.length;

    // Calcular el nuevo índice
    currentIndex += direction;

    // Asegurar que el índice esté dentro del rango permitido
    if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    } else if (currentIndex >= totalItems) {
        currentIndex = 0;
    }

    // Calcular el ancho de cada obra para mover correctamente
    const itemWidth = artworks[0].offsetWidth + 10; // 20px es el margen

    // Mover el carrusel usando `translateX` para que el cuadro central siempre esté en el medio
    const moveX = -(currentIndex -2) * itemWidth;
    carousel.style.transform = `translateX(${moveX}px)`;

    // Actualizar el cuadro central activo
    updateActiveArtwork();
}

// Inicializar el carrusel
updateActiveArtwork();




