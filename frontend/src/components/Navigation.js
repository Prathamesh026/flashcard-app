import React from 'react';
import './Navigation.css';

function Navigation({ currentIndex, totalCards, onNext, onPrev }) {
  return (
    <div className="navigation">
      <button
        className="nav-button"
        onClick={onPrev}
        disabled={currentIndex === 0}
      >
        Previous
      </button>
      <span className="nav-info">
        {currentIndex + 1} / {totalCards}
      </span>
      <button
        className="nav-button"
        onClick={onNext}
        disabled={currentIndex === totalCards - 1}
      >
        Next
      </button>
    </div>
  );
}

export default Navigation;
