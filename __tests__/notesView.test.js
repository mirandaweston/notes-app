/**
 * @jest-environment jsdom
 */

const fs = require('fs')

const NotesModel = require('../src/notesModel');
const NotesView = require('../src/notesView');

describe('Notes view', () => {
  it('displays two notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('A first note');
    model.addNote('Another note');

    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });
})