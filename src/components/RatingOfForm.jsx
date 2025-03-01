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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ"
      );

      const response = await fetch(
        `http://54.89.245.167:5000/ratings/user/1?limit=1`,
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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ"
      );

      const response = await fetch(`http://54.89.245.167:5000/profile`, {
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
