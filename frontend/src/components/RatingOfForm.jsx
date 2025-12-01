import React, { useState, useEffect } from "react";
import "react-rater/lib/react-rater.css";
import Rater from "react-rater";

import "../App.css";
import { useParams } from "react-router-dom";

export default function RatingOfForm() {
  const data = new Date().toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const { questId } = useParams();
  const [getRating, setGetRating] = useState([]);
  const [getInfoOfProfile, setGetInfoOfProfile] = useState([]);

  useEffect(() => {
    if (questId) {
      GetRating();
      GetInfoOfProfile();
    }
  }, [questId]);

  const GetRating = async () => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs"
      );

      const response = await fetch(
        `http://localhost:5000/v1/ratings/user/1?limit=1`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) throw new Error("Помилка при отриманні даних");

      const data = await response.json();

      setGetRating(data);
    } catch (error) {
      console.log("Помилка:", error);
    }
  };

  const GetInfoOfProfile = async () => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs"
      );

      const response = await fetch(`http://localhost:5000/v1/profile`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) throw new Error("Помилка при отриманні даних");

      const data = await response.json();

      setGetInfoOfProfile(data);
    } catch (error) {
      console.log("Помилка:", error);
    }
  };

  return (
    <div className="MainRatingOfForm">
      <div className="MainContentOfRatingOfForm">
        <h2 className="MainContentOfRatingOfFormTitle">Ваші відгуки</h2>
        <ul className="RatOfPageList">
          {getRating.map((element, index) => (
            <li key={index} className="RatOfPageItem">
              <img src={getInfoOfProfile.avatar} className="RatOfAvatar" />
              <p className="RatOfPageTitle">{element.comment}</p>
              <Rater
                total={5}
                rating={element.stars}
                interactive={false}
                className="RatOfRate"
              />
              <p className="RatOfPageDate">{data}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
