import { React, useState, useEffect } from "react";
import demo from "../assets/demo.png";

export default function MyHistoryQuests() {
  const [lastAddQuest, setLastAddQuest] = useState([]);

  const date = new Date().toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

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
        `http://46.63.19.144:5000/v1/quests/recent?limit=3`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) throw new Error("Помилка при отриманні даних");
      const data = await response.json();
      console.log(lastAddQuest);

      setLastAddQuest(data);
    } catch (error) {
      console.log(`Помилка, ${error}`);
    }
  };

  return (
    <div className="MyHistoryQuests">
      <h1 className="MyHistoryQuestsTitle">Моя історія квестів</h1>

      <div className="MyHistoryQuestsContent">
        <ul className="HistoryOfQuest">
          {lastAddQuest &&
            lastAddQuest.map((lastQuest) => (
              <li key={lastQuest.id} className="ItemHistoryQuest">
                <div className="HistoryQuestImage">
                  <img
                    src={lastQuest.image}
                    className="Img"
                    alt="фото квесту"
                    width={60}
                    height={60}
                  />
                  <h1 className="HistoryQuestTitle">{lastQuest.title}</h1>

                  <p className="HistoryQuestTime"> {date}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
