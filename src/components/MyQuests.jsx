import React, { useState, useEffect } from "react";
import MainTopbarSection from "./MainTopbarSection";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import demo from "../assets/demo.png";

export default function MyQuests() {
  const [searchOfInfo, setSearchOfInfo] = useState("");
  const [SearchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const date = new Date().toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllQuests();
    };
    fetchData();
  }, []);

  const DeleteFunc = async (id) => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ"
      );

      const response = await fetch(`http://54.89.245.167:5000/quests/${id}`, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        setQuests((prevQuests) =>
          prevQuests.filter((quest) => quest.id !== id)
        );
      }
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  const fetchAllQuests = async () => {
    try {
      const headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ"
      );

      const response = await fetch(
        `http://54.89.245.167:5000/quests/all?limit=20`,
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

  const handleEdit = (questId) => {
    navigate(`/mainPage/EditQuest/${questId}`);
  };

  const filterOfQuest = quests.filter((quest) =>
    quest.title.toLowerCase().includes(searchOfInfo.toLowerCase())
  );

  return (
    <div>
      <div className="mainQuests">
        <aside className="mainTopBar">
          <MainTopbarSection />
        </aside>
        <div className="content">
          <div className="container">
            <p className="BradCrumsForMyQuest">Головна / Мої квести</p>
            <Header
              setSearchOfInfo={setSearchOfInfo}
              setSearchText={setSearchText}
            />
            <div className="MainContentQuests">
              {/* {quests && (
                <ul className="MainListOfQuest">
                  {quests.map((quest) => (
                    <li key={quest.id} className="MainItemofListQuest">
                      <img
                        src={quest.image}
                        alt="фото квесту"
                        className="ListOfQuestOfImage"
                      />
                      <h3 className="ListOfQuestTitle"> {quest.title}</h3>

                      <div className="DateAndBtn">
                        <p className="ListOfQuestDate">{date}</p>
                        <button
                          className="MainListOfQuestBtnRedit"
                          type="button"
                          onClick={() => handleEdit(quest.id)}
                        >
                          Редагувати
                        </button>
                      </div>
                      <button
                        className="MainListOfQuestBtnDelete"
                        type="button"
                        onClick={() => DeleteFunc(quest.id)}
                      >
                        Видалити
                      </button>
                    </li>
                  ))}
                </ul>
              )} */}

              <div className="filterOfQuestOnPageOfQuest">
                {filterOfQuest.map((filterOfQuest) => (
                  <ul className="MainListOfQuest">
                    <li key={filterOfQuest.id} className="MainItemofListQuest">
                      <img
                        src={filterOfQuest.image}
                        alt="фото квесту"
                        className="ListOfQuestOfImage"
                      />
                      <h3 className="ListOfQuestTitle">
                        {filterOfQuest.title}
                      </h3>

                      <div className="DateAndBtn">
                        <p className="ListOfQuestDate">{date}</p>
                        <button
                          className="MainListOfQuestBtnRedit"
                          type="button"
                          onClick={() => handleEdit(filterOfQuest.id)}
                        >
                          Редагувати
                        </button>
                      </div>
                      <button
                        className="MainListOfQuestBtnDelete"
                        type="button"
                        onClick={() => DeleteFunc(filterOfQuest.id)}
                      >
                        Видалити
                      </button>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
