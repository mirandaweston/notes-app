const NotesModel = require('./src/notesModel');
const NotesView = require('./src/notesView');
const NotesClient = require('./src/notesClient');

// let notemodel = new NotesModel;
// notemodel.addNote('Buy Milk');
// notemodel.addNote('Go to the Gym');
// console.log(notemodel.getNotes());

const client = new NotesClient();
const model = new NotesModel();
const view = new NotesView(model, client);

client.loadNotes((notes) => {
  model.setNotes(notes);
  view.displayNotes();
});