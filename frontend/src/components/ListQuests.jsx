import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
export default function ListQuests({ searchText }) {
  const navigate = useNavigate();
  const date = new Date().toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [quests, setQuests] = useState([]);
  const [getLastQuest, setGetLastQuest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllQuests();
      await GetLastOfQuest();
    };
    fetchData();
  }, []);

  const handleClick = (questId) => {
    navigate(`/mainPage/PageOfQuest/${questId}`);
  };

  const fetchAllQuests = async () => {
    try {
      const headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs"
      );

      const response = await fetch(
        `http://localhost:5000/v1/quests/all\?limit\= 2`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) throw new Error("Помилка при отриманні даних");

      const data = await response.json();
      console.log(quests);

      setQuests(data);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  const GetLastOfQuest = async () => {
    try {
      const headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs"
      );

      const response = await fetch(
        `http://localhost:5000/v1/quests/recent?limit=6`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();
      setGetLastQuest(data);
    } catch (error) {
      console.log("Помилка:", error);
    }
  };

  const filteredQuests = quests.filter((quest) =>
    quest.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const filteredQuests2 = getLastQuest.filter((getLastQuest) =>
    getLastQuest.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="ListQuests">
      <div className="ImageQuest">
        <h1 className="ImageQuestTitle">Create, learn, explore - Vista</h1>
        <p className="ImageQuestText">
          Cтворюй нові захоплюючі пригоди та ділись їми з іншими
        </p>
        <div className="ImageQuestBtn">
          <button className="ImageBtn">
            <Link className="BtnQuestLink" to="/mainPage/CreateQuest">
              Створити квест
            </Link>
          </button>
          <p className="ImageQuestParagraph">
            <Link to="/mainPage/myProfile" className="ImageQuestLink">
              Мій профіль
            </Link>
          </p>
        </div>
      </div>

      <div className="MyQuests">
        <h1 className="MyText">Мої квести</h1>

        <div className="MainOffilteredQuests">
          {filteredQuests.map((filteredQuest) => (
            <ul className="ListOfQuest">
              <li key={filteredQuest.id} className="ItemofListQuest">
                <img
                  src={filteredQuest.image}
                  alt="фото квесту"
                  className="ListOfQuestOfImage"
                />
                <h3 className="ListOfQuestTitle"> {filteredQuest.title}</h3>

                <div className="DateAndBtn">
                  <p className="ListOfQuestDate">{date}</p>
                  <button
                    className="ListOfQuestBtn"
                    type="button"
                    onClick={() => handleClick(filteredQuest.id)}
                  >
                    Перейти
                  </button>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div className="NewQuests">
        <h1 className="NewText">Новинки ✨ </h1>
        <div className="NewQuestsText">
          <div className="filteredQuests2">
            {filteredQuests2.map((filteredQuest) => (
              <ul className="NewOfListOfQuest">
                <li key={filteredQuest.id} className="NewItemofListQuest">
                  <img
                    src={filteredQuest.image}
                    alt="фото квесту"
                    className="ListOfQuestOfImage"
                  />
                  <h3 className="NewListOfQuestTitle">
                    {" "}
                    {filteredQuest.title}
                  </h3>

                  <div className="DateAndBtn">
                    <p className="NewListOfQuestDate">{date}</p>
                    <button
                      className="NewListOfQuestBtn"
                      type="button"
                      onClick={() => handleClick(filteredQuest.id)}
                    >
                      Перейти
                    </button>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
