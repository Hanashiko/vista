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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ"
      );

      const response = await fetch(
        `http://54.89.245.167:5000/quests/all\?limit\= 2`,
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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ"
      );

      const response = await fetch(
        `http://54.89.245.167:5000/quests/recent?limit=6`,
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

        {/* {quests && filteredQuests && (
          <ul className="ListOfQuest">
            {quests.map((quest) => (
              <li key={quest.id} className="ItemofListQuest">
                <img
                  src={quest.image}
                  alt="фото квесту"
                  className="ListOfQuestOfImage"
                />
                <h3 className="ListOfQuestTitle"> {quest.title}</h3>

                <div className="DateAndBtn">
                  <p className="ListOfQuestDate">{date}</p>
                  <button
                    className="ListOfQuestBtn"
                    type="button"
                    onClick={() => handleClick(quest.id)}
                  >
                    Перейти
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )} */}

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
          {/* {getLastQuest && (
            <ul className="NewOfListOfQuest">
              {getLastQuest.map((quest) => (
                <li key={quest.id} className="NewItemofListQuest">
                  <img
                    src={quest.image}
                    alt="фото квесту"
                    className="ListOfQuestOfImage"
                  />
                  <h3 className="NewListOfQuestTitle"> {quest.title}</h3>

                  <div className="DateAndBtn">
                    <p className="NewListOfQuestDate">{date}</p>
                    <button
                      className="NewListOfQuestBtn"
                      type="button"
                      onClick={() => handleClick(quest.id)}
                    >
                      Перейти
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )} */}

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
