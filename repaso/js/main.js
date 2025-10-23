// ==========================================================================
// Quiz Interactivo
// ==========================================================================

const quizData = [
  {
    question: "¿Qué diferencia fundamental existe entre recursos renovables y no renovables según Meadows?",
    options: [
      "Los renovables son más caros que los no renovables",
      "Los renovables son flow-limited mientras los no renovables son stock-limited",
      "Los renovables no tienen límites de explotación",
      "Los no renovables se regeneran más lentamente"
    ],
    correct: 1,
    explanation: "Correcto! Los recursos renovables están limitados por su tasa de regeneración (flow), mientras que los no renovables tienen una cantidad fija que se agota (stock)."
  },
  {
    question: "¿Qué es un bucle de refuerzo en un sistema?",
    options: [
      "Un proceso que reduce el crecimiento del sistema",
      "Un mecanismo de estabilización automática",
      "Un proceso que amplifica el cambio en una dirección",
      "Una regulación gubernamental"
    ],
    correct: 2,
    explanation: "¡Exacto! Un bucle de refuerzo amplifica el cambio: más capital → más extracción → más ganancias → más capital."
  },
  {
    question: "Según Meadows, ¿por qué el crecimiento exponencial alcanza rápidamente sus límites?",
    options: [
      "Por restricciones políticas",
      "Porque los sistemas físicos operan en entornos finitos con bucles de balanceo",
      "Por falta de tecnología",
      "Por decisiones empresariales incorrectas"
    ],
    correct: 1,
    explanation: "¡Correcto! En un entorno finito, los bucles de balanceo eventualmente frenan el crecimiento exponencial impulsado por bucles de refuerzo."
  },
  {
    question: "¿Qué patrón de comportamiento puede resultar de la sobreexplotación de un recurso renovable?",
    options: [
      "Crecimiento infinito",
      "Oscilaciones o colapso del recurso y la industria",
      "Mejora automática del recurso",
      "Incremento de la rentabilidad"
    ],
    correct: 1,
    explanation: "Exacto! La sobreexplotación puede llevar a oscilaciones alrededor del equilibrio o al colapso tanto del recurso como de la industria que depende de él."
  },
  {
    question: "¿Cuál es la alternativa propuesta por Meadows para evitar el colapso de economías basadas en recursos no renovables?",
    options: [
      "Extraer más rápido para generar más capital",
      "Transitar hacia una economía basada en recursos renovables",
      "Importar recursos de otros países",
      "Reducir la población"
    ],
    correct: 1,
    explanation: "¡Correcto! Meadows sugiere que la economía debe aprender a operar completamente con recursos renovables para evitar el colapso vinculado al agotamiento."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function initQuiz() {
  const quizCard = document.getElementById('quizCard');
  const quizResults = document.getElementById('quizResults');
  
  if (!quizCard) return;
  
  displayQuestion();
  
  document.getElementById('nextBtn').addEventListener('click', nextQuestion);
  document.getElementById('restartBtn')?.addEventListener('click', restartQuiz);
  document.getElementById('restartBtnFinal')?.addEventListener('click', restartQuiz);
}

function displayQuestion() {
  const question = quizData[currentQuestionIndex];
  const questionText = document.getElementById('questionText');
  const quizOptions = document.getElementById('quizOptions');
  const quizFeedback = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('nextBtn');
  const currentQuestion = document.getElementById('currentQuestion');
  const totalQuestions = document.getElementById('totalQuestions');
  const quizProgress = document.getElementById('quizProgress');
  
  questionText.textContent = question.question;
  currentQuestion.textContent = currentQuestionIndex + 1;
  totalQuestions.textContent = quizData.length;
  
  // Actualizar barra de progreso
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
  quizProgress.style.width = progress + '%';
  
  // Limpiar opciones anteriores
  quizOptions.innerHTML = '';
  quizFeedback.classList.remove('show', 'correct', 'incorrect');
  quizFeedback.textContent = '';
  nextBtn.style.display = 'none';
  answered = false;
  
  // Crear opciones
  question.options.forEach((option, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'quiz-option';
    optionDiv.textContent = option;
    optionDiv.addEventListener('click', () => selectOption(index, optionDiv));
    quizOptions.appendChild(optionDiv);
  });
}

function selectOption(selectedIndex, selectedElement) {
  if (answered) return;
  
  answered = true;
  const question = quizData[currentQuestionIndex];
  const quizFeedback = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('nextBtn');
  const options = document.querySelectorAll('.quiz-option');
  
  // Deshabilitar todas las opciones
  options.forEach(option => option.classList.add('disabled'));
  
  // Marcar respuesta correcta e incorrecta
  if (selectedIndex === question.correct) {
    selectedElement.classList.add('correct');
    quizFeedback.textContent = '✅ ' + question.explanation;
    quizFeedback.classList.add('show', 'correct');
    score++;
  } else {
    selectedElement.classList.add('incorrect');
    options[question.correct].classList.add('correct');
    quizFeedback.textContent = '❌ Incorrecto. ' + question.explanation;
    quizFeedback.classList.add('show', 'incorrect');
  }
  
  nextBtn.style.display = 'inline-flex';
}

function nextQuestion() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < quizData.length) {
    displayQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const quizCard = document.getElementById('quizCard');
  const quizResults = document.getElementById('quizResults');
  const finalScore = document.getElementById('finalScore');
  
  quizCard.style.display = 'none';
  quizResults.style.display = 'block';
  
  const percentage = Math.round((score / quizData.length) * 100);
  finalScore.textContent = `${score}/${quizData.length} (${percentage}%)`;
  
  // Cambiar icono según resultado
  const resultsIcon = quizResults.querySelector('.results-icon');
  if (percentage >= 80) {
    resultsIcon.textContent = '🎉';
  } else if (percentage >= 60) {
    resultsIcon.textContent = '👍';
  } else {
    resultsIcon.textContent = '📚';
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answered = false;
  
  const quizCard = document.getElementById('quizCard');
  const quizResults = document.getElementById('quizResults');
  
  quizCard.style.display = 'block';
  quizResults.style.display = 'none';
  
  displayQuestion();
}

// ==========================================================================
// Secciones Expandibles
// ==========================================================================

function initExpandables() {
  const expandables = document.querySelectorAll('.expandable');
  
  expandables.forEach(expandable => {
    const header = expandable.querySelector('.expandable-header');
    
    header.addEventListener('click', () => {
      expandable.classList.toggle('active');
    });
  });
}

// ==========================================================================
// Mapa Conceptual Interactivo
// ==========================================================================

const conceptsData = {
  'pensamiento-sistemico': {
    title: 'Pensamiento Sistémico',
    description: 'Enfoque para comprender la complejidad mediante el análisis de las interconexiones, bucles de retroalimentación y patrones de comportamiento en sistemas dinámicos. Desarrollado por Donella Meadows y otros teóricos de sistemas.'
  },
  'bucles': {
    title: 'Bucles de Retroalimentación',
    description: 'Mecanismos circulares donde el resultado de un proceso influye en su causa inicial. Son fundamentales para entender la dinámica de sistemas complejos y pueden ser de refuerzo o de balanceo.'
  },
  'recursos': {
    title: 'Recursos Naturales',
    description: 'Materiales o servicios de la naturaleza utilizados por los humanos. Se clasifican en renovables (que pueden regenerarse) y no renovables (con stock limitado). Su gestión sostenible es crucial para el futuro.'
  },
  'refuerzo': {
    title: 'Bucle de Refuerzo',
    description: 'Proceso que amplifica el cambio en una dirección, ya sea crecimiento o declive. Ejemplo: más capital → más extracción → más ganancias → más capital. También llamado bucle positivo o de amplificación.'
  },
  'balanceo': {
    title: 'Bucle de Balanceo',
    description: 'Proceso que contrarresta el cambio y busca estabilidad o equilibrio. Actúa como freno natural en sistemas, limitando el crecimiento exponencial. También llamado bucle negativo o estabilizador.'
  },
  'renovables': {
    title: 'Recursos Renovables (Flow-Limited)',
    description: 'Recursos que pueden regenerarse naturalmente a cierta tasa. Ejemplos: pesca, bosques, energía solar. Están limitados por su flujo de regeneración, no por cantidad total. Requieren gestión sostenible.'
  },
  'no-renovables': {
    title: 'Recursos No Renovables (Stock-Limited)',
    description: 'Recursos con cantidad fija que se agota con el uso. Ejemplos: petróleo, gas natural, minerales. Están limitados por su stock total disponible. Su agotamiento es inevitable sin transición.'
  }
};

function initConceptMap() {
  const nodes = document.querySelectorAll('.node');
  const conceptTitle = document.getElementById('conceptTitle');
  const conceptDescription = document.getElementById('conceptDescription');
  
  if (!nodes.length) return;
  
  nodes.forEach(node => {
    node.addEventListener('click', function() {
      const conceptKey = this.getAttribute('data-concept');
      const concept = conceptsData[conceptKey];
      
      if (concept) {
        conceptTitle.textContent = concept.title;
        conceptDescription.textContent = concept.description;
        
        // Efecto visual en el nodo
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);
      }
    });
    
    // Efecto hover
    node.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.2s ease';
      this.style.transform = 'scale(1.05)';
    });
    
    node.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

// ==========================================================================
// Smooth Scroll para navegación
// ==========================================================================

function initSmoothScroll() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100; // 100px offset para el sticky nav
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// ==========================================================================
// Animaciones al hacer scroll
// ==========================================================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar secciones
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Observar tarjetas
  const cards = document.querySelectorAll('.objective-card, .video-card, .reading-card, .glossary-term, .resource-card');
  cards.forEach(card => {
    observer.observe(card);
  });
}

// ==========================================================================
// Inicialización
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
  initQuiz();
  initExpandables();
  initConceptMap();
  initSmoothScroll();
  initScrollAnimations();
  
  console.log('✅ Sistema de aprendizaje interactivo cargado correctamente');
});

// ==========================================================================
// Funciones de utilidad
// ==========================================================================

// Función para copiar enlaces
function copyLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    alert('¡Enlace copiado al portapapeles!');
  }).catch(err => {
    console.error('Error al copiar:', err);
  });
}

// Función para imprimir sección específica
function printSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Impresión</title>');
    printWindow.document.write('<link rel="stylesheet" href="css/styles.css">');
    printWindow.document.write('</head><body>');
    printWindow.document.write(section.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }
}

// Exportar funciones para uso global si es necesario
window.copyLink = copyLink;
window.printSection = printSection;
