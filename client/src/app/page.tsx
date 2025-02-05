"use client"

import { useState } from 'react';
import './globals.css'

interface Note {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Add Note Title",
      content: "Add note content",
    },
    // ... other notes
  ]);

  // Function to create a new note object and add it to our notes array
  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };
    
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  // Function to handle the user's click event on a note
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  // Function to handle note updates

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!selectedNote) {
      return;
    }
  
    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };
  
    const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));
  
    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  // Function to cancel a note update
  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  return (
    <>
      <div className="app-container">
        <form className="note-form" onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            required
          />
          
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Content"
            rows={10}
            required
          />
          {selectedNote ? (
            <div className="edit-buttons">
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>

            </div>
          ) : (
              <button type="submit">Add Note</button>
            )}
        </form>

        <div className="notes-grid">
          {notes.map((note) => (
            <div className="note-item" key={note.id} onClick={() => handleNoteClick(note)}>
              <div className="notes-header">
                <button>x</button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App;