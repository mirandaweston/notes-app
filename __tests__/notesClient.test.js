const NotesClient = require('../src/notesClient');

require('jest-fetch-mock').enableMocks();

describe('notesClient class', () => {
  it('calls fetch and loads data', (done) => {
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify({
      name: 'Some value',
      id: 123
    }));

    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.name).toBe('Some value');
      expect(returnedDataFromApi.id).toBe(123);

      done();
    });
  });

  it('sends a POST request using fetch to create a new note', (done) => {
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify({
      note: "buy dog food",
    }));

    client.createNote('buy dog food', (returnedDataFromApi) => {
      expect(returnedDataFromApi.note).toBe('buy dog food');
      done();
    });
  });
})