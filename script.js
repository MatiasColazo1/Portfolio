const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let isMobile = false;
let particles = [];
let backgroundParticles = [];
let textImageDataMatias = null;
let textImageDataColazo = null;
let mouse = { x: 0, y: 0 };
let isTouching = false;

class BackgroundParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  isMobile = window.innerWidth < 768;
  initBackgroundParticles();
}

function createTextImages() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = `bold ${isMobile ? 50 : 120}px sans-serif`;
  ctx.textAlign = 'center';
  
  // Crear imagen para "Matias"
  ctx.fillText("Matías", canvas.width / 2 - (isMobile ? 100 : 250), canvas.height / 2);
  textImageDataMatias = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Crear imagen para "Colazo"
  ctx.fillText("Colazo", canvas.width / 2 + (isMobile ? 100 : 250), canvas.height / 2);
  textImageDataColazo = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createParticle(isMatias) {
  const data = isMatias ? textImageDataMatias.data : textImageDataColazo.data;
  for (let i = 0; i < 150; i++) {
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);
    const alpha = data[(y * canvas.width + x) * 4 + 3];
    if (alpha > 100) {
      const size = Math.random() * 2 + 1;
      return {
        x, y,
        baseX: x,
        baseY: y,
        size: size,
        originalSize: size,
        currentOpacity: 1,
        targetOpacity: 1,
        color: 'white',
        scatteredColor: isMatias ? 'rgba(0, 255, 255, 0.45)' : 'rgba(99, 1, 99, 0.45)',
        life: Math.random() * 100 + 50,
        isMatias: isMatias
      };
    }
  }
  return null;
}

function initParticles() {
  particles = [];
  const count = 3500 * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080));
  // Crear partículas para cada palabra
  for (let i = 0; i < count; i++) {
    const p = createParticle(true);
    if (p) particles.push(p);
  }
  for (let i = 0; i < count; i++) {
    const p = createParticle(false);
    if (p) particles.push(p);
  }
}

function initBackgroundParticles() {
  backgroundParticles = [];
  const particleCount = 200;
  for (let i = 0; i < particleCount; i++) {
    backgroundParticles.push(new BackgroundParticle());
  }
}

function animate() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Dibujar partículas de fondo
  backgroundParticles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  // Dibujar partículas de texto
  for (let p of particles) {
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 200;

    p.currentOpacity += (p.targetOpacity - p.currentOpacity) * 0.1;

    if (dist < maxDist && (isTouching || !('ontouchstart' in window))) {
      const force = (maxDist - dist) / maxDist;
      const angle = Math.atan2(dy, dx);
      const moveX = Math.cos(angle) * force * 60;
      const moveY = Math.sin(angle) * force * 60;
      p.x = p.baseX - moveX;
      p.y = p.baseY - moveY;
      ctx.fillStyle = p.scatteredColor;
    } else {
      p.x += (p.baseX - p.x) * 0.1;
      p.y += (p.baseY - p.y) * 0.1;
      ctx.fillStyle = p.color;
    }

    const color = ctx.fillStyle;
    ctx.globalAlpha = p.currentOpacity;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    ctx.globalAlpha = 1;

    p.life--;
    if (p.life <= 0) {
      const newP = createParticle(p.isMatias);
      if (newP) Object.assign(p, newP);
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  updateCanvasSize();
  createTextImages();
  initParticles();
});

window.addEventListener('mousemove', e => mouse = { x: e.clientX, y: e.clientY });
window.addEventListener('touchstart', () => isTouching = true);
window.addEventListener('touchend', () => isTouching = false);
window.addEventListener('touchmove', e => {
  if (e.touches.length > 0) {
    if (!isMobile) {
      e.preventDefault();
      mouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
  }
}, { passive: false });

// Agregar evento para scroll suave
document.addEventListener('DOMContentLoaded', function() {
  const scrollArrow = document.querySelector('.scroll-arrow');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.querySelector(this.getAttribute('href'));
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
});

// Initialize
updateCanvasSize();
createTextImages();
initParticles();
initBackgroundParticles();
animate();