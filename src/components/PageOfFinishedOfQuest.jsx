import React, { useState, useEffect } from "react";
import "../App.css";
import HeaderForPageOfQuest from "./HeaderForPageOfQuest";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import cosmoOne from "../assets/cosmoOne.png";
import CosmoTwo from "../assets/CosmoTwo.png";
import RatingOfArrow from "../assets/RattingOfArrow.png";
import CreateOfRatingOfForm from "./CreateOfRatingOfForm";
import { useLocation } from "react-router-dom";

export default function JustQuest() {
  const location = useLocation();
  const { totalPoints, correctAnswers } = location.state || {
    totalPoints: 0,
    correctAnswers: 0,
  };
  const { questId } = useParams();
  // const fetchAllQuests = async () => {
  //   try {
  //     const headers = new Headers();
  //     headers.append(
  //       "Authorization",
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ"
  //     );

  //     const response = await fetch(
  //       `http://54.89.245.167:5000/quests/${questId}`,
  //       {
  //         method: "GET",
  //         headers: headers,
  //       }
  //     );

  //     if (!response.ok) throw new Error("Помилка при отриманні даних");

  //     const data = await response.json();

  //     setArrayOfPage(data);
  //     setArrayOfPageData(data.tasks || []);
  //   } catch (error) {
  //     console.log("Помилка:", error);
  //   }
  // };

  const [createForm, setCreateForm] = useState(false);

  return (
    <div className="FinishOfPageOFMain">
      <div className="FinishOfPageOfmainQuests">
        <div className="content">
          <div className="container">
            <HeaderForPageOfQuest />
            <div className="FinishOfPageOfMainContentQuests">
              <div className="FinishOfPageOfMainContentQuestsTextAndCosmoOne">
                <img src={cosmoOne} alt="photo" className="CosmoOne" />
                <p className="CosmoOneOfText">Квест завершено!</p>
              </div>

              <div className="FinishWithoutVisible">
                <div className="FinishedBoard"></div>
                <div className="FinishWithoutVisibleContent">
                  <h2 className="FinishedBoardOfTitle">Ваші результати:</h2>
                  <p className="FinishedBoardOfTextOne">
                    Сумарна кількість Ваших балів: {totalPoints}
                  </p>
                  <p className="FinishedBoardOfTextTwo">
                    Сумарна кількість правильних відповідей: {correctAnswers}
                  </p>

                  <button className="FinishedBoardOfBtn">
                    <Link to={`/mainPage/PageOfQuest/${questId}`}>
                      Пройти квест ще раз
                    </Link>
                  </button>
                </div>
              </div>

              <div className="FinishedOfYourAsk">
                <img className="CosmoTwo" src={CosmoTwo} alt="Photo" />
                <p className="FinishedOfYourAskText">
                  Ваша думка важлива для нас
                </p>
              </div>

              <div className="FinishedOfRatingForm">
                <button
                  className="FinishedOfRatingFormOfBtn"
                  onClick={() => setCreateForm((createForm) => !createForm)}
                  type="button"
                >
                  <span className="RatTitle">Створити свій коментар</span>

                  <span>
                    <img
                      src={RatingOfArrow}
                      alt="RatingOfArrow"
                      className="FinishedRatingOfArrow"
                    />
                  </span>
                </button>

                {createForm && <CreateOfRatingOfForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
