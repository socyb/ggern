// Presentación interactiva - Act10
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideDisplay = document.getElementById('currentSlide');
const totalSlidesDisplay = document.getElementById('totalSlides');

// Inicializar
totalSlidesDisplay.textContent = totalSlides;
updateSlideDisplay();

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
  
  currentSlideDisplay.textContent = index + 1;
  updateButtons();
}

function updateButtons() {
  prevBtn.disabled = currentSlideIndex === 0;
  nextBtn.disabled = currentSlideIndex === totalSlides - 1;
}

function nextSlide() {
  if (currentSlideIndex < totalSlides - 1) {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
  }
}

function previousSlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
  }
}

function updateSlideDisplay() {
  showSlide(currentSlideIndex);
}

// Navegación por teclado
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowRight':
    case ' ':
    case 'PageDown':
      e.preventDefault();
      nextSlide();
      break;
    case 'ArrowLeft':
    case 'PageUp':
      e.preventDefault();
      previousSlide();
      break;
    case 'Home':
      e.preventDefault();
      currentSlideIndex = 0;
      showSlide(currentSlideIndex);
      break;
    case 'End':
      e.preventDefault();
      currentSlideIndex = totalSlides - 1;
      showSlide(currentSlideIndex);
      break;
  }
});

// Soporte para swipe en dispositivos táctiles
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
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe izquierda - siguiente
      nextSlide();
    } else {
      // Swipe derecha - anterior
      previousSlide();
    }
  }
}
