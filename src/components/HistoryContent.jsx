import React, { useState, useEffect } from "react";
import demo from "../assets/demo.png";

export default function HistoryContent() {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllQuests();
    };
    fetchData();
  }, []);

  const fetchAllQuests = async () => {
    try {
      const headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTY5MzY4MCwianRpIjoiNjhhNjRmMWEtYWNjYy00MmZiLWFiZjAtNmZkZGNiNGRjYWI1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk2OTM2ODAsImNzcmYiOiIwMGMyODE4Ni1mZDhlLTQ5NzQtOGVjYi0zMDIwODg1ZGEwZWUiLCJleHAiOjE3Mzk3ODAwODB9.zBdsCvqmNy6WrHOUYWF1A43PGO4p5LZz4a4psQ3s9M4"
      );

      const response = await fetch(
        `http://54.89.245.167:5000/quests/recent?limit=3 `,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) throw new Error("Помилка");

      const data = await response.json();
      console.log(quests);

      setQuests(data);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  return (
    <div className="HistoryContent">
      <div className="RatingOfAuthors">
        <div className="AllOfAuthors">
          <h1 className="AllOfTitle">Рейтинг авторів</h1>
          <button className="AllOfBtn">Переглянути всіх</button>
        </div>
        <div className="InfoOfAuthors">
          <ul className="InfoOfAuthorsList">
            <li>
              <p>Автор</p>
            </li>
            <li>
              <p>Кількість робіт</p>
            </li>
            <li>
              <p>Рейтинг</p>
            </li>
          </ul>
        </div>

        <div className="Authors">
          <p className="TitleOfAuthors">Інших авторів поки немає...</p>
        </div>
      </div>

      <div className="LastQuests">
        <div className="LastInfo">
          <h1 className="AllOfTitle">Останні додані</h1>
          <button className="AllOfBtn">Переглянути всю історію</button>
        </div>

        <div className="LastQuestsListHistory">
          {quests && (
            <ul className="HistoryOfQuest">
              {quests.map((quest) => (
                <li key={quest.id} className="ItemHistoryOfQuest">
                  <div className="QuestImage">
                    <img className="Img" src={quest.image} alt="фото квесту" />
                    <h3 className="QuestTitle">{quest.title}</h3>

                    {/* <span className="QuestTime"> хв. тому</span> */}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
