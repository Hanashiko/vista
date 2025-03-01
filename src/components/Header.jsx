import { React, useState, useEffect } from "react";
import "../App.css";
import avatar from "../assets/Avatar.png";

export default function Header({ avatarUrl, setSearchText, setSearchOfInfo }) {
  const date = new Date().toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [imageProfile, setimageProfile] = useState([]);

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
        "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ"
      );

      const response = await fetch(`http://54.89.245.167:5000/profile`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) throw new Error("Помилка при отриманні даних");

      const data = await response.json();
      console.log(data);

      setimageProfile(data);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  return (
    <div className="headerContent">
      <h1>Вітаю, {imageProfile.name}!</h1>
      <div className="formOfHeader">
        <form className="search-container" onSubmit={fetchAllQuests}>
          <input
            type="text"
            placeholder="Хочу знайти..."
            className="search-input"
            onChange={(e) => {
              setSearchText(e.target.value);
              setSearchOfInfo(e.target.value);
            }}
          />
        </form>
        <span className="date">{date}</span>
        <img src={imageProfile.avatar} alt="Avatar" className="avatar" />
      </div>
    </div>
  );
}
