import React, { useState, useEffect } from "react";
import "../App.css";
import HeaderForJustOfQuest from "./HeaderForJustOfQuest";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import spirit1 from "../assets/spirit 1.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function JustQuest() {
  const navigate = useNavigate();
  const { questId } = useParams();

  const [arrayOfPage, setArrayOfPage] = useState([]);
  const [arrayOfPageData, setArrayOfPageData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [timeLeft, setTimeLeft] = useState(3000);

  useEffect(() => {
    fetchAllQuests();
  }, [questId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate(
        `/mainPage/PageOfQuest/JustQuest/PageOfFinishedOfQuest/${questId}`,
        {
          state: { totalPoints, correctAnswers },
        }
      );
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate, questId]);

  const fetchAllQuests = async () => {
    try {
      const headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs"
      );

      const response = await fetch(
        `http://localhost:5000/v1/quests/${questId}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) throw new Error("Помилка при отриманні даних");

      const data = await response.json();

      setArrayOfPage(data);
      setArrayOfPageData(data.tasks || []);
    } catch (error) {
      console.log("Помилка:", error);
    }
  };

  const handleAnswerClick = (option, event) => {
    event.preventDefault();
    setSelectedAnswers((prevStateArray) => [...prevStateArray, option]);

    if (option.is_correct) {
      setCorrectAnswers(
        (prevStateCorrectAnswers) => prevStateCorrectAnswers + 1
      );
      setTotalPoints(
        (prevStateTotalPoints) =>
          prevStateTotalPoints +
          (arrayOfPageData[currentQuestionIndex].points || 1)
      );
    }

    if (currentQuestionIndex < arrayOfPageData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate(
        `/mainPage/PageOfQuest/JustQuest/PageOfFinishedOfQuest/${questId}`,
        {
          state: { totalPoints, correctAnswers },
        }
      );
    }
  };

  return (
    <div className="PageOFMain">
      <div className="PageOfmainQuests">
        <div className="content">
          <div className="container">
            <HeaderForJustOfQuest />
            <form
              className="JustPageOfMainContentQuests"
              onSubmit={fetchAllQuests}
            >
              <div className="EndQuest">
                <img src={spirit1} alt="spirit" className="SpiritOfJust" />
              </div>

              <p className="timeOfQuest">
                Залишилось часу: {Math.floor(timeLeft / 60)} хв {timeLeft % 60}
                сек
              </p>

              {Array.isArray(arrayOfPageData) && arrayOfPageData.length > 0 && (
                <div className="arrayOfPageDataDiv">
                  <p className="JustPageOfParagraph">
                    {arrayOfPageData[currentQuestionIndex].text}
                  </p>
                  <ul className="JustPageOfList">
                    {arrayOfPageData[currentQuestionIndex].options.map(
                      (option, index) => (
                        <button
                          onClick={(event) => handleAnswerClick(option, event)}
                          className="JustPageOfListItem"
                          key={index}
                        >
                          {option.text}
                        </button>
                      )
                    )}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
