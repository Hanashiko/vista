import React from "react";
import "../App.css";
import avatar from "../assets/Avatar.png";

export default function Header({ avatarUrl }) {
  const date = new Date().toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div className="headerContent">
      <h1>Вітаю, Марго!</h1>
      <div className="formOfHeader">
        <form className="search-container">
          <input
            type="text"
            placeholder="Хочу знайти..."
            className="search-input"
          />
        </form>
        <span className="date">{date}</span>
        <img src={avatar} alt="Avatar" className="avatar" />
      </div>
    </div>
  );
}
