// Selecciono el boton por su id
const botonModo = document.getElementById("boton-modo")

// Agregar un controlador de eventos para cuando se haga clic en el botón
botonModo.addEventListener("click", function() {
    // Obtener el elemento body
    const cuerpo = document.body;
  
    // Si el cuerpo tiene la clase "modo-claro", cambiar a modo oscuro
    if (cuerpo.classList.contains("modo-claro")) {
      cuerpo.classList.remove("modo-claro");
      cuerpo.classList.add("modo-oscuro");
      botonModo.textContent = "Modo claro";
    } else {
      // De lo contrario, cambiar a modo claro
      cuerpo.classList.remove("modo-oscuro");
      cuerpo.classList.add("modo-claro");
      botonModo.textContent = "Modo oscuro";
    }
  });

const typed = new Typed('.typed', {
  strings: ['<i class="tipeo">Hola, soy Matías!</i><br>Desarrollador web<br>Full Stack'],
  typeSpeed: 75,
  backSpeed:40
});

//tecnologias
