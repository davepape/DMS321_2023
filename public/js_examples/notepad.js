// Use localStorage to create a simple 'notepad'.
// Anything typed into the form is saved in localStorage, and restored
// whenever the page is loaded again.
//
// This version has some redundancy, just to demonstrate basic Javascript -
// there's an explicit "save" button, but it also autosaves once per second

let $ = document.querySelector.bind(document);

function saveNotes()
    {
    localStorage.setItem('notes', $('#notes').value);
    localStorage.setItem('title', $('#title').value);
    }

function clearNotes()
    {
    $('#notes').value = '';
    localStorage.setItem('notes', '');
    }

window.onload = function ()
    {
    let notetext = localStorage.getItem('notes');
    if (notetext)
        $('#notes').value = notetext;
    let title = localStorage.getItem('title');
    if (title)
        $('#title').value = title;
    $('#savebutton').addEventListener('click',saveNotes);
    $('#clearbutton').addEventListener('click',clearNotes);
    setInterval(saveNotes, 1000);
    }
