/**
 * @jest-environment jsdom
 */

require('jest-fetch-mock').enableMocks()
const fs = require('fs')

const NotesModel = require('../src/notesModel');
const NotesView = require('../src/notesView');
const NotesClient = require('../src/notesClient');

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

  it('adds a new note', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const model = new NotesModel();
    const view = new NotesView(model);

    const input = document.querySelector('#add-note-input');
    input.value = 'My new test note';

    const button = document.querySelector('#add-note-btn');
    button.click();

    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual('My new test note');
  })

  it('clears the list of previous notes before displaying', () => {
    document.body.HTML = fs.readFileSync('./index.html');

    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('Note one');
    model.addNote('Node two');

    view.displayNotes();
    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('fetches and displays information from the API', (done) => {
    const mockClient = {loadNotes: (callback) => callback(['Mocking note'])}
    const model = new NotesModel();
    const view = new NotesView(model, mockClient);

    view.displayNotesFromApi();
    const noteE1 = document.querySelector('.note');
    expect(noteE1.textContent).toEqual('Mocking note')
    done();
  })
})