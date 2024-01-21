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

//Funkcja odpowiedzialna za wyświetlanie formularza
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

//Funkcja odpowiedzialna za ukrywanie formularza
function rejectForm() {
form.style.display = "none";
}

//Funkcja czyszcząca formularz
function clearForm(localTitle, localContent) {
    localTitle.value = "";
    localContent.value = "";
}

//Obsługa dodawania notatek
function handleSaveClick(titleValue, contentValue) {
    const newId = getNewId();
    notes.push({ id: newId, title: titleValue, content: contentValue });
    localStorage.setItem('notes',JSON.stringify(notes));
    addNote(newId, titleValue, contentValue);
    form.style.display = 'none';
}

//Tworzenie nowej notatki i wyświetlanie jej 
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

//Obsługa funkcji usuwającej notatkę
function removeNote(id) {
let index = notes.findIndex(note => note.id === id);
notes.splice(index, 1);
deleteNote(id)
}

//Usuwanie notatki z interfejsu oraz ustawienie nowych wartości w localStorage
function deleteNote(id) {
let noteItem = document.getElementById(id);
noteItem.parentNode.removeChild(noteItem);
localStorage.setItem('notes', JSON.stringify(notes));
}

//Funkcja nadająca Id
function getNewId() {
    if (notesIds.length === 0) {
        notesIds.push(0);
        return 0;
    }

    const newId = Math.max(...notesIds) + 1;
    notesIds.push(newId);
    return newId;
}

//Aktualizacja notatki
function updateNote(id, newTitle, newContent) {
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) return;

    notes[noteIndex].title = newTitle;
    notes[noteIndex].content = newContent;
}

//Funkcja obsługująca aktualizację notatek
function handleUpdateClick(id, titleValue, contentValue) {
    updateNote(id, titleValue, contentValue);
    const noteDiv = document.getElementById(id);
    noteDiv.querySelector('h2').textContent = titleValue;
    noteDiv.querySelector('p').textContent = contentValue;
    localStorage.setItem('notes', JSON.stringify(notes));
    form.style.display = 'none';
}

//Funkcja uruchamia funkcję showForm w trybie do edycji
function editNote(id) {
    showForm(true, id);
}

//dostosowuje wysokość pola tekstowego w formularzu w zależności od jego zawartości
function autoGrow(element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
} 


