import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await fetch('http://localhost:3001/flashcards');
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <div className="app">
      <h1>Flashcard Learning Tool</h1>
      {showDashboard ? (
        <Dashboard fetchFlashcards={fetchFlashcards} />
      ) : (
        <>
          {flashcards.length > 0 && (
            <Flashcard flashcard={flashcards[currentIndex]} />
          )}
          <Navigation
            currentIndex={currentIndex}
            totalCards={flashcards.length}
            onNext={handleNext}
            onPrev={handlePrev}
          />
          <button className="toggle-dashboard" onClick={toggleDashboard}>
            {showDashboard ? 'Back to Flashcards' : 'Go to Dashboard'}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
