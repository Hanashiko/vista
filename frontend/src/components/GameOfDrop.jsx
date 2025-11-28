import React, { useState } from "react";
import HeaderForPageOfQuest from "./HeaderForPageOfQuest";
import "../App.css";
import Footer from "./Footer";
const correctWord = "МОВА-ЦЕ СИМВОЛ НАРОДУ.";
const shuffled = correctWord.split("").sort(() => Math.random() - 0.5);

export default function GameOfDrop() {
  const [letters, setLetters] = useState(shuffled);
  const [dragIndex, setDragIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDrop = (index) => {
    if (dragIndex === null) return;
    const updated = [...letters];
    const temp = updated[index];
    updated[index] = updated[dragIndex];
    updated[dragIndex] = temp;
    setLetters(updated);
    setDragIndex(null);

    if (updated.join("") === correctWord) {
      setIsCorrect(true);
    }
  };

  return (
    <div className="GameOfDrop">
      <div className="container">
        <HeaderForPageOfQuest />
        <div className="GameOfDropTextContainer">
          <h2 className="GameOfDropTitle">Гра: склади слово</h2>
          <p className="GameOfDropText">
            Перетягніть літери, щоб скласти правильне речення
          </p>
        </div>
        <div className="GameOfDropContent">
          <div className="lettersContainer">
            {letters.map((letter, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                style={{
                  width: "60px",
                  height: "60px",
                  fontSize: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid black",
                  borderRadius: "8px",
                  cursor: "grab",
                  backgroundColor: "#f0f0f0",
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        {isCorrect && (
          <p style={{ color: "green", fontWeight: "bold" }}>✅ Молодець!</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
