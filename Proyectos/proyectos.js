function initProyectos() {
  const canvasProyectos = document.getElementById('particleCanvasProyectos');
  if (!canvasProyectos) return;

  // Inicializar la funcionalidad del botón "Ver todos los proyectos"
  const verTodosBtn = document.querySelector('.proyectos-section__button');
  const proyectosGrid = document.querySelector('.proyectos-section__grid');
  const proyectosSection = document.querySelector('.proyectos-section');

  if (verTodosBtn && proyectosGrid && proyectosSection) {
    verTodosBtn.addEventListener('click', () => {
      const mostrarTodo = !proyectosGrid.classList.contains('show-all');
      
      proyectosGrid.classList.toggle('show-all', mostrarTodo);
      verTodosBtn.textContent = mostrarTodo 
        ? 'Ver menos proyectos' 
        : 'Ver todos los proyectos';

      // Solo aplicar el cambio de altura en dispositivos móviles
      if (window.innerWidth <= 768) {
        proyectosSection.style.height = mostrarTodo ? 'auto' : '100vh';
      }
    });
  }


  const ctxP = canvasProyectos.getContext('2d');
  let particlesProyectos = [];

  class ParticleP {
    constructor() {
      this.x = Math.random() * canvasProyectos.width;
      this.y = Math.random() * canvasProyectos.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvasProyectos.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvasProyectos.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
      ctxP.fillStyle = 'rgba(0, 255, 255, 0.45)';
      ctxP.beginPath();
      ctxP.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctxP.fill();
    }
  }

  function initParticlesProyectos() {
    particlesProyectos = [];
    for (let i = 0; i < 150; i++) {
      particlesProyectos.push(new ParticleP());
    }
  }

  function animateProyectos() {
    ctxP.fillStyle = '#000';
    ctxP.fillRect(0, 0, canvasProyectos.width, canvasProyectos.height);
    particlesProyectos.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateProyectos);
  }

  function resizeCanvasProyectos() {
    canvasProyectos.width = canvasProyectos.clientWidth;
    canvasProyectos.height = canvasProyectos.clientHeight;
  }

  window.addEventListener('resize', () => {
    resizeCanvasProyectos();
    initParticlesProyectos();
  });

  resizeCanvasProyectos();
  initParticlesProyectos();
  animateProyectos();
}
