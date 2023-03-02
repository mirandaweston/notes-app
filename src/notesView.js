class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerE1 = document.querySelector('#main-container');

    this.buttonEl = document.querySelector('#add-note-btn');
    const newNote = document.querySelector('#add-note-input').value;

    this.buttonEl.addEventListener('click', () => {
      const newNote = document.querySelector('#add-note-input').value;
      this.addNewNote(newNote);
    });
  }

  displayNotes() {
    document.querySelectorAll('.note').forEach(element => {
      element.remove();
    });

    const notes = this.model.getNotes();

    notes.forEach(note => {
      const noteE1 = document.createElement('div');
      noteE1.textContent = note;
      noteE1.className = 'note';
      this.mainContainerE1.append(noteE1);
    })

  }

  addNewNote(newNote) {
  this.model.addNote(newNote);
  this.displayNotes();
  }

  displayNotesFromApi = async () => {
    await this.client.loadNotes((data) => {
      this.model.setNotes(data);
      this.displayNotes();
    })
  }
}


module.exports = NotesView;