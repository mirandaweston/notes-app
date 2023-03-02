const NotesModel = require('./notesModel');
const NotesView = require('./notesView')

let model = new NotesModel;

model.addNote('This is an example note');

let view = new NotesView(model);

view.displayNotes();