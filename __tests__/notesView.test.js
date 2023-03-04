/**
 * @jest-environment jsdom
 */
require('jest-fetch-mock').enableMocks()

const fs = require('fs');
const NotesView = require('../src/notesView');
const NotesModel = require('../src/notesModel');
const NotesClient = require('../src/notesClient');

jest.mock('../src/notesClient')

describe('Notes view', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    NotesClient.mockClear();
  });

  it('displays two notes', () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model, client);

    model.addNote('walk the dog');
    model.addNote('get dog food');
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it.skip('adds note when user clicks', () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model, client);

    const note = 'example note';
    
    const inputEl = document.querySelector('#add-note-input');
    inputEl.value = note;

    const buttonEl = document.querySelector('#add-note-btn')
    buttonEl.click();
    
    const noteEl = document.querySelectorAll('.note');
    expect(noteEl.length).toEqual(1);
    expect(noteEl[0].textContent).toEqual('example note');
  });

  it('clears notes before displaying with new note added', () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(model, client);

    model.addNote('first note');
    model.addNote('second note');
    view.displayNotes();
    view.displayNotes();

    const noteEl = document.querySelectorAll('.note');
    expect(noteEl.length).toEqual(2);
  });

  it('fetches and displays info from notes API', (done) => {
    const fakeClient = {loadNotes: (callback) => callback(['mock note'])}
    const model = new NotesModel();
    const view = new NotesView(model, fakeClient);
    
    view.displayNotesFromApi();
    const NoteEl = document.querySelector('.note');
    expect(NoteEl.textContent).toEqual('mock note')
    done();
  });

  it('uses a POST request to add a new note', () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    const view = new NotesView(model, mockClient);

    mockClient.createNote = jest.fn((note, callback) => callback([note]))

    view.addNewNote('mock note')
    
    const noteEl = document.querySelectorAll('.note');
    expect(noteEl.length).toEqual(1);
    expect(noteEl[0].textContent).toEqual('mock note');
  });
})