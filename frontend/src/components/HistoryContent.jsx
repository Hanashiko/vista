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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODg5NTE2MiwianRpIjoiYTM4YWJhOWMtZmJlMC00NDk5LTgyYzgtYjQ0ZGNmY2Q5ZDExIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3NDg4OTUxNjIsImNzcmYiOiJhMzZmMTBlYS0yYzIwLTQ0N2EtYjNhNy00YzA1NTA5YTUwZWUiLCJleHAiOjE3NTE0ODcxNjJ9.JsN8GP71WaPBZgcup6eLgZkLpPOS0_owFVMNM6kG110"
      );

      const response = await fetch(
        `http://46.63.19.144:5000/v1/quests/recent?limit=3 `,
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
