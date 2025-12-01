import { React, useState, useEffect } from "react";
import "../App.css";
import avatar from "../assets/Avatar.png";
import { Link } from "react-router-dom";

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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs"
      );

      const response = await fetch(`http://localhost:5000/v1/profile`, {
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
        <Link to="/mainPage/myProfile" className="avatar-link">
          <img src={imageProfile.avatar} alt="Avatar" className="avatar" />
        </Link>
      </div>
    </div>
  );
}
