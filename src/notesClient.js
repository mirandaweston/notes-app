class NotesClient {
  loadNotes(callback) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => {
        if (typeof callback === 'function') {
          callback(data);
        }
      })
      .catch(error => console.error(error));
  }

  createNote = (note, callback) => {
    const data = { content: note };

    fetch('http://localhost:3000/notes', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch(error => console.error(error));
  }
}


module.exports = NotesClient;