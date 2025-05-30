function initSobreMi() {
  const canvasSobreMi = document.getElementById('particleCanvasSobreMi');
  if (!canvasSobreMi) return;

  const ctxS = canvasSobreMi.getContext('2d');
  let particlesSobreMi = [];

  class ParticleS {
      constructor() {
          this.x = Math.random() * canvasSobreMi.width;
          this.y = Math.random() * canvasSobreMi.height;
          this.size = Math.random() * 2 + 1;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
      }

      update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.x > canvasSobreMi.width || this.x < 0) this.speedX *= -1;
          if (this.y > canvasSobreMi.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
          ctxS.fillStyle = 'rgba(23, 255, 2, 0.45)'; // Color verde esmeralda
          ctxS.beginPath();
          ctxS.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctxS.fill();
      }
  }

  function initParticlesSobreMi() {
      particlesSobreMi = [];
      for (let i = 0; i < 150; i++) {
          particlesSobreMi.push(new ParticleS());
      }
  }

  function animateSobreMi() {
      ctxS.fillStyle = '#000';
      ctxS.fillRect(0, 0, canvasSobreMi.width, canvasSobreMi.height);
      particlesSobreMi.forEach(p => {
          p.update();
          p.draw();
      });
      requestAnimationFrame(animateSobreMi);
  }

  function resizeCanvasSobreMi() {
      canvasSobreMi.width = canvasSobreMi.clientWidth;
      canvasSobreMi.height = canvasSobreMi.clientHeight;
  }

  window.addEventListener('resize', () => {
      resizeCanvasSobreMi();
      initParticlesSobreMi();
  });

  resizeCanvasSobreMi();
  initParticlesSobreMi();
  animateSobreMi();
}
