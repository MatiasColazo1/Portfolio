document.addEventListener('DOMContentLoaded', function() {
    const darkModeBtn = document.getElementById('dark-mode');
    const body = document.body;
  
    darkModeBtn.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
    });
  });
  
  