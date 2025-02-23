"use client"

import { useEffect, useState } from 'react';
import './globals.css';

interface Note {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${BASE_URL}`);
        const notes: Note[] = await response.json();
        setNotes(notes);
      } catch (e) {
        console.log(e);
      }
    };
    fetchNotes()
  }, []);

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const response = await fetch(
        `${BASE_URL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );
      const newNote = await response.json();
    
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

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

  // Updated deleteNote function with confirmation
  const deleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    // Add confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    
    if (!confirmDelete) {
      return; // Exit if user cancels
    }

    try {
      await fetch(
        `${BASE_URL}${noteId}`,
        {
          method: "DELETE",
        }
      );
      const updatedNotes = notes.filter(
        (note) => note.id !== noteId
      );
      setNotes(updatedNotes);
    } catch (e) {
      console.log(e);
    }
  };

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
                <button onClick={(event) => deleteNote(event, note.id)}>x</button>
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