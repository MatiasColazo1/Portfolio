

const typedHello = new Typed('.typed-hello', {
  strings: ['<i class="tipeo">Hola, soy Matías!</i>'],
  typeSpeed: 75,
  showCursor: false,
  onComplete: function() {
    typedLoop.start();
  }
});

const typedLoop = new Typed('.typed-loop', {
  strings: ['Developer JR<br>Full Stack', 'Quality Assurance<br>Analyst'],
  typeSpeed: 75,
  backSpeed: 40,
  loop: true,
  loopCount: Infinity
});

  //tecnologias
