const darkModeButton = document.getElementById('dark-mode');
const body = document.body;

darkModeButton.addEventListener('click', function() {
  body.classList.toggle('dark-mode');
});