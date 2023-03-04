class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector('#main-container');

    this.buttonEl = document.querySelector('#add-note-btn');

    this.buttonEl.addEventListener('click', () => {
      const newNote = document.querySelector('#add-note-input').value;
      this.addNewNote(newNote);

      this.displayNotes();
    });
  }

  displayNotes = () => {
    document.querySelectorAll('.note').forEach(note => {
      note.remove();
    });

    const notes = this.model.getNotes()

    notes.forEach((note) => {
      const noteEl = document.createElement('div');
      noteEl.textContent = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    });
    document.querySelector('#add-note-input').value = "";
  }

  addNewNote = (newNote) => {
    this.client.createNote(newNote, (data) => {
      this.model.setNotes(data);
      this.displayNotes();
    });
  }

  displayNotesFromApi = async () => {
    await this.client.loadNotes((data) => {
      this.model.setNotes(data);
      this.displayNotes();
    });
  }
}


module.exports = NotesView;