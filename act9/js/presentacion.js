// ==========================================================================
// Control de Presentación
// ==========================================================================

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Actualizar contador
document.getElementById('totalSlides').textContent = totalSlides;

// Función para mostrar diapositiva
function showSlide(index) {
  // Ocultar todas las diapositivas
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Mostrar diapositiva actual
  slides[index].classList.add('active');
  
  // Actualizar contador
  document.getElementById('currentSlide').textContent = index + 1;
  
  // Actualizar estado de botones
  updateButtons();
}

// Función para actualizar botones
function updateButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  // Deshabilitar botón anterior en primera diapositiva
  if (currentSlideIndex === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
  
  // Deshabilitar botón siguiente en última diapositiva
  if (currentSlideIndex === totalSlides - 1) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}

// Navegar a siguiente diapositiva
function nextSlide() {
  if (currentSlideIndex < totalSlides - 1) {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
  }
}

// Navegar a diapositiva anterior
function previousSlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
  }
}

// Navegar con teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    nextSlide();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    previousSlide();
  } else if (e.key === 'Home') {
    e.preventDefault();
    currentSlideIndex = 0;
    showSlide(currentSlideIndex);
  } else if (e.key === 'End') {
    e.preventDefault();
    currentSlideIndex = totalSlides - 1;
    showSlide(currentSlideIndex);
  }
});

// Navegación táctil
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  
  if (touchEndX < touchStartX - swipeThreshold) {
    // Swipe left - next slide
    nextSlide();
  }
  
  if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe right - previous slide
    previousSlide();
  }
}

// Inicializar
updateButtons();

// Mensaje de consola
console.log('🎯 Presentación cargada correctamente');
console.log('📌 Usa las flechas del teclado o los botones para navegar');
console.log('⌨️ Atajos: ← → (navegación), Home (primera), End (última), Espacio (siguiente)');
