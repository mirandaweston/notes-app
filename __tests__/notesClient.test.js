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

  it('sends a POST request to the notes backend to create a new note', (done) => {
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify(['buy dog food']));

    client.createNote('buy dog food', (returnedData) => {
      expect(returnedData.length).toBe(1);
      expect(returnedData[returnedData.length -1]).toEqual('buy dog food');
      done();
    })
  })
})