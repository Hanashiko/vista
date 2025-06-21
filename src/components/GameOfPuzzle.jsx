import React, { useState } from "react";
import HeaderForPageOfQuest from "./HeaderForPageOfQuest";
import "../App.css";
import tv from "../assets/tv.png";
import Footer from "./Footer";

const puzzleImages = [
  "https://i.pinimg.com/736x/54/43/18/544318f7ea966400d405278e2e14a0de.jpg",
  "https://i.pinimg.com/736x/5d/95/56/5d9556ca45e0dfa2b264daca6a7cac73.jpg",
  "https://i.pinimg.com/736x/c1/2c/62/c12c62702a1336a9aeea6dd6b700c96a.jpg",
];

const gridSize = 3;
const pieceSize = 100;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function GameOfPuzzle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);

  const imageUrl = puzzleImages[currentIndex];
  const totalPieces = gridSize * gridSize;
  const [pieces, setPieces] = useState(shuffle([...Array(totalPieces).keys()]));
  const [dragged, setDragged] = useState(null);

  const handleDragStart = (index) => setDragged(index);

  const handleDrop = (index) => {
    const newPieces = [...pieces];
    const temp = newPieces[index];
    newPieces[index] = newPieces[dragged];
    newPieces[dragged] = temp;
    setPieces(newPieces);
    setDragged(null);
  };

  const isSolved = pieces.every((val, idx) => val === idx);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (isSolved) {
      const newCompleted = completedCount + 1;
      setCompletedCount(newCompleted);

      if (newCompleted === puzzleImages.length) {
        setShowCongrats(true);
        return;
      }
    }
    setCurrentIndex(nextIndex % puzzleImages.length);
    setPieces(shuffle([...Array(totalPieces).keys()]));
  };

  const handlePrev = () => {
    const prevIndex =
      (currentIndex - 1 + puzzleImages.length) % puzzleImages.length;
    setCurrentIndex(prevIndex);
    setPieces(shuffle([...Array(totalPieces).keys()]));
  };

  return (
    <div className="MainOfGame">
      <div className="container">
        <HeaderForPageOfQuest />
        <div style={{ padding: 20 }} className="MainOfGameContent">
          <div className="MainOfGameTextCont">
            <h2 className="MainOfGameTitle">Гра: пазл</h2>
            <p className="MainOfGameText">
              Перетягніть шматочки пазла на свої місця, щоб зібрати картинку.
            </p>
          </div>

          <div className="MainOfGameImg">
            <img src={tv} className="imgOfMainOfGame" alt="Puzzle Game" />
          </div>

          {!showCongrats && (
            <>
              <div
                className="navigationButtons"
                style={{
                  maxWidth: "400px",
                  position: "relative",
                  transform: "translate3d(731px, -355px, 10px)",
                }}
              >
                <button onClick={handlePrev}>⬅ Попередній</button>
                <button
                  onClick={handleNext}
                  style={{ marginLeft: 10 }}
                  disabled={!isSolved}
                >
                  Наступний ➡
                </button>
              </div>

              <div
                className="puzzleGrid"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${gridSize}, ${pieceSize}px)`,
                  gap: "2px",
                  justifyContent: "center",
                }}
              >
                {pieces.map((piece, idx) => (
                  <div
                    className="puzzlePiece"
                    key={idx}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(idx)}
                    style={{
                      width: pieceSize,
                      height: pieceSize,
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: `${gridSize * pieceSize}px`,
                      backgroundPosition: `${
                        -(piece % gridSize) * pieceSize
                      }px ${-Math.floor(piece / gridSize) * pieceSize}px`,
                      border: "1px solid #ccc",
                      boxSizing: "border-box",
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {showCongrats && (
            <p
              style={{
                marginTop: 40,
                color: "green",
                fontWeight: "bold",
                fontSize: "24px",
                textAlign: "center",
                position: "relative",
                bottom: "599px",
                left: "256px",
              }}
            >
              🎉 Молодець! Усі пазли зібрано!
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
