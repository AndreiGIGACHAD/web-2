import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Состояние для записей

  const [notes, setNotes] = useState([]);
    // Состояние для ID выбранной записи

  const [selectedNoteId, setSelectedNoteId] = useState(null);
    // Состояние для строки поиска

  const [searchQuery, setSearchQuery] = useState('');

  // Добавление новой записи

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      text: '',
    };
    setNotes([...notes, newNote]); // Добавляем новую запись
    setSelectedNoteId(newNote.id); // Выбираем новую запись
  };
  // Удаление записи

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));/ Фильтруем список
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  };
  // Обновление текста выбранной записи

  const updateNoteText = (text) => {
    setNotes(
      notes.map((note) =>
        note.id === selectedNoteId ? { ...note, text } : note
      )
    );
  };
  // Получение текста выбранной записи

  const getSelectedNoteText = () => {
    const selectedNote = notes.find((note) => note.id === selectedNoteId);
    return selectedNote ? selectedNote.text : '';
  };

  // Фильтрация записей по поисковому запросу

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <div className="sidebar">
        <button onClick={addNote} className="add-note-btn">
          Добавить запись
        </button>
        <input
          type="text"
          className="search-input"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul className="notes-list">
          {filteredNotes.map((note) => (
            <li
              key={note.id}
              className={`note-item ${
                note.id === selectedNoteId ? 'active' : ''
              }`}
            >
              <span onClick={() => setSelectedNoteId(note.id)}>
                {note.text.slice(0, 30) || 'Новая запись'}
              </span>
              <button
                className="delete-btn"
                onClick={() => deleteNote(note.id)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="note-editor">
        {selectedNoteId ? (
          <textarea
            value={getSelectedNoteText()}
            onChange={(e) => updateNoteText(e.target.value)}
            placeholder="Напишите что-нибудь..."
          />
        ) : (
          <p className="no-note-text">Выберите или добавьте запись</p>
        )}
      </div>
    </div>
  );
};

export default App;
