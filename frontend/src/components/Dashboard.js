import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ fetchFlashcards }) {
  const [newCard, setNewCard] = useState({ question: '', answer: '' });
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetchFlashcardsData();
  }, []);

  const fetchFlashcardsData = async () => {
    try {
      const response = await fetch('http://localhost:3001/flashcards');
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const handleAddCard = async () => {
    if (!newCard.question || !newCard.answer) return;
    try {
      await fetch('http://localhost:3001/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });
      setNewCard({ question: '', answer: '' });
      fetchFlashcards();
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const handleEditCard = async (id) => {
    const updatedCard = flashcards.find((card) => card.id === id);
    if (!updatedCard.question || !updatedCard.answer) return;
    try {
      await fetch(`http://localhost:3001/flashcards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCard),
      });
      fetchFlashcards();
    } catch (error) {
      console.error('Error editing flashcard:', error);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await fetch(`http://localhost:3001/flashcards/${id}`, {
        method: 'DELETE',
      });
      fetchFlashcards();
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="new-card">
        <input
          type="text"
          placeholder="Question"
          value={newCard.question}
          onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newCard.answer}
          onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
        />
        <button onClick={handleAddCard}>Add Flashcard</button>
      </div>
      <div className="flashcard-list">
        {flashcards.map((flashcard) => (
          <div key={flashcard.id} className="flashcard-item">
            <input
              type="text"
              value={flashcard.question}
              onChange={(e) =>
                setFlashcards(
                  flashcards.map((card) =>
                    card.id === flashcard.id
                      ? { ...card, question: e.target.value }
                      : card
                  )
                )
              }
            />
            <input
              type="text"
              value={flashcard.answer}
              onChange={(e) =>
                setFlashcards(
                  flashcards.map((card) =>
                    card.id === flashcard.id
                      ? { ...card, answer: e.target.value }
                      : card
                  )
                )
              }
            />
            <button onClick={() => handleEditCard(flashcard.id)}>Save</button>
            <button onClick={() => handleDeleteCard(flashcard.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
