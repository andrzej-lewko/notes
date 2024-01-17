const add = document.querySelector('.add');
const form = document.querySelector('.form');
const reject = document.querySelector('#reject');

// Funkcja do pokazywania formularza
function showForm() {
    form.style.display = "block";
}

// Funkcja do ukrywania formularza
function hideForm() {
    form.style.display = "none";
}

// Dodaj zdarzenia do przycisków
add.addEventListener('click', showForm);
reject.addEventListener('click', hideForm);