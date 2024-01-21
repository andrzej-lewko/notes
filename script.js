const add = document.querySelector('.add');
const reject = document.querySelector('#reject');
const noteArea = document.querySelector('#down');
let title;
let content;
const form = document.querySelector('.form');
let notesIds = [];
let notes = JSON.parse(localStorage.getItem('notes')) || [];

notes.forEach(note => addNote(note.id, note.title, note.content));

add.addEventListener('click', () => showForm(false));
reject.addEventListener('click', rejectForm);

function showForm(isEdit, id = null) {
    form.style.display = "block";
    let localTitle = document.getElementById('title');
    let localContent = document.getElementById('contentToEdit');
    clearForm(localTitle, localContent);

    if (isEdit) {
        const noteToEdit = notes.find(note => note.id === id);
        if (noteToEdit) {
            localTitle.value = noteToEdit.title;
            localContent.value = noteToEdit.content;
        }
        save.onclick = () => handleUpdateClick(id, localTitle.value, localContent.value);
    } else {
        save.onclick = () => handleSaveClick(localTitle.value, localContent.value);
    }
}
function rejectForm() {
form.style.display = "none";
}
function clearForm(localTitle, localContent) {
    localTitle.value = "";
    localContent.value = "";
}

function handleSaveClick(titleValue, contentValue) {
    const newId = getNewId();
    notes.push({ id: newId, title: titleValue, content: contentValue });
    localStorage.setItem('notes',JSON.stringify(notes));
    addNote(newId, titleValue, contentValue);
    form.style.display = 'none';
}

function addNote(newId, title, content) {
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.setAttribute('id', newId);

    newNote.innerHTML = `
        <div class="content">
            <h2>${title}</h2>
            <p>${content}</p>
        </div>
        <div class="buttons">
            <button class="edit" onclick="editNote(${newId})"><i class="fa-solid fa-pencil"></i></button>
            <button onclick="removeNote(${newId})"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    `;

    noteArea.appendChild(newNote);
    form.style.display = 'none';
}

function removeNote(id) {
let index = notes.findIndex(note => note.id === id);
notes.splice(index, 1);
deleteNote(id)
}

function deleteNote(id) {
let noteItem = document.getElementById(id);
noteItem.parentNode.removeChild(noteItem);
localStorage.setItem('notes', JSON.stringify(notes));
}

function getNewId() {
    if (notesIds.length === 0) {
        notesIds.push(0);
        return 0;
    }

    const newId = Math.max(...notesIds) + 1;
    notesIds.push(newId);
    return newId;
}

function updateNote(id, newTitle, newContent) {
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) return;

    notes[noteIndex].title = newTitle;
    notes[noteIndex].content = newContent;
}

function handleUpdateClick(id, titleValue, contentValue) {
    updateNote(id, titleValue, contentValue);
    const noteDiv = document.getElementById(id);
    noteDiv.querySelector('h2').textContent = titleValue;
    noteDiv.querySelector('p').textContent = contentValue;
    localStorage.setItem('notes', JSON.stringify(notes));
    form.style.display = 'none';
}


function editNote(id) {
    showForm(true, id);
    console.log("showForm:", id)
}

function autoGrow(element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
} 

/*
var formElement = document.querySelector('.form');
var inputElement = document.querySelector('#title'); // Zmień na odpowiednie ID lub selektor Twojego pola tekstowego

// Sprawdź szerokość ekranu, aby określić, czy jest to urządzenie mobilne
var isMobile = window.innerWidth <= 768; // Tutaj założyłem, że szerokość <= 768 pikseli oznacza urządzenie mobilne

if (isMobile) {
  // Jeśli to urządzenie mobilne, dodaj słuchacze zdarzeń
  inputElement.addEventListener('focus', function() {
    // Przesuń .form na górę strony lub dostosuj według potrzeb
    form.style.top = "200"; // Możesz dostosować wartość, aby ustawić pożądaną pozycję
  });

  inputElement.addEventListener('blur', function() {
    // Przywróć domyślną pozycję .form (np. na środek ekranu)
    form.style.top = "50%"; // Możesz dostosować wartość, aby ustawić domyślną pozycję
  });
}
*/
