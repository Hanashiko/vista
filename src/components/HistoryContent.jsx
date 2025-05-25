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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODExNjMyMSwianRpIjoiZTc5MDQxOTUtMTlhMy00ZDFkLThmNDYtZjg1Y2JhMGI4M2JkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjE0IiwibmJmIjoxNzQ4MTE2MzIxLCJjc3JmIjoiZjFmNGVhZTgtYzc0Ny00NWRkLWE0YWQtNTc3ZmUzNDU4NzVhIiwiZXhwIjoxNzUwNzA4MzIxfQ.cAMjuyH28twxzBnEtw6McvoYp2J16JaabRv_QMbh88U"
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
