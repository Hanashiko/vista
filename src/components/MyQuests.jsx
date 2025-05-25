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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODExNjMyMSwianRpIjoiZTc5MDQxOTUtMTlhMy00ZDFkLThmNDYtZjg1Y2JhMGI4M2JkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjE0IiwibmJmIjoxNzQ4MTE2MzIxLCJjc3JmIjoiZjFmNGVhZTgtYzc0Ny00NWRkLWE0YWQtNTc3ZmUzNDU4NzVhIiwiZXhwIjoxNzUwNzA4MzIxfQ.cAMjuyH28twxzBnEtw6McvoYp2J16JaabRv_QMbh88U"
      );

      const response = await fetch(`http://46.63.19.144:5000/v1/quests/${id}`, {
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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODExNjMyMSwianRpIjoiZTc5MDQxOTUtMTlhMy00ZDFkLThmNDYtZjg1Y2JhMGI4M2JkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjE0IiwibmJmIjoxNzQ4MTE2MzIxLCJjc3JmIjoiZjFmNGVhZTgtYzc0Ny00NWRkLWE0YWQtNTc3ZmUzNDU4NzVhIiwiZXhwIjoxNzUwNzA4MzIxfQ.cAMjuyH28twxzBnEtw6McvoYp2J16JaabRv_QMbh88U"
      );

      const response = await fetch(
        `http://46.63.19.144:5000/v1/quests/all?limit=10`,
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
