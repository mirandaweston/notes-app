class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerE1 = document.querySelector('#main-container');
  }

  displayNotes() {
    const notes = this.model.getNotes();

    notes.forEach(note => {
      const noteE1 = document.createElement('div');
      noteE1.textContent = note;
      noteE1.className = 'note';
      this.mainContainerE1.append(noteE1);
    })
  }
}

module.exports = NotesView;