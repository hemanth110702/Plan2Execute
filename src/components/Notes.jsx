import React, { useState } from "react";

const Notes = ({ notes, setNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [viewNotes, setViewNotes] = useState(false);
  const [presentNoteId, setPresentNoteId] = useState(null);
  const [showTimestamp, setShowTimestamp] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const createNote = (e) => {
    e.preventDefault();
    const noteId = Date.now();
    setNotes((prevNotes) => ({
      ...prevNotes,
      [noteId]: { noteId, title, content, timestamp: new Date().toISOString() },
    }));
    setTitle("");
    setContent("");
  };

  const viewNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setPresentNoteId(note.noteId);
    setShowTimestamp(note.timestamp);
    setViewNotes(true);
  };

  const updateNote = (e) => {
    e.preventDefault();
    setNotes((prevNotes) => ({
      ...prevNotes,
      [presentNoteId]: { title, content },
    }));
  };

  const newNote = () => {
    setTitle("");
    setContent("");
    setViewNotes(false);
    setPresentNoteId(null);
  };

  const deleteNote = (e) => {
    e.preventDefault();
    const tempNotes = { ...notes };
    delete tempNotes[presentNoteId];
    setNotes(tempNotes);
    setPresentNoteId("");
    setViewNotes(false);
  };

  const filteredNotes = Object.values(notes).filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-container">
      <div>
        <h3>Your notes</h3>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredNotes.map((note) => (
          <h2 key={note.noteId} onClick={() => viewNote(note)}>
            {note.title}
          </h2>
        ))}
      </div>
      <div>
        Notes <button onClick={newNote}>new note</button>
        <form action="#">
          {viewNotes && <h4>{showTimestamp}</h4>}
          Title: <br />{" "}
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <br />
          Content: <br />
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />{" "}
          <br />
          {!viewNotes && <button onClick={createNote}>Create</button>}
          {viewNotes && (
            <div>
              <button onClick={updateNote}>Update</button>
              <button onClick={deleteNote}>Delete</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Notes;
