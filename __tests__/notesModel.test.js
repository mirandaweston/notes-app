const fs = require('fs')
const NotesModel = require('../../notes-app/src/notesModel');

describe('NotesModel', () => {
  describe('getNotes', () => {
    it('initialises with an empty array for Notes objects', () => {
      const model = new NotesModel();
      expect(model.getNotes()).toEqual([]);
    });
  });

  describe('addNote', () => {
    it('adds a note to the Notes array', () => {
      const model = new NotesModel();
      model.addNote('Buy milk');
      model.addNote('Go to the gym');
      expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
    });
  });

  describe('reset', () => {
    it('resets the Notes app', () => {
      const model = new NotesModel();
      model.addNote('Buy milk');
      model.reset();
      expect(model.getNotes()).toEqual([]);
    });
  });
})