import { React, useState, useEffect } from "react";
import "../App.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function HeaderForJustOfQuest() {
  const { questId } = useParams();
  return (
    <div className="">
      <div className="PageOfheaderContent"></div>
      <ul className="PageOfheaderContentList">
        <li className="PageOfheaderContentItem">
          <Link to="/mainPage" className="PageOfheaderContentItemLinkOne">
            На головну
          </Link>
        </li>

        <li className="PageOfheaderContentItem">
          <Link
            to={`/mainPage/PageOfQuest/JustQuest/PageOfFinishedOfQuest/${questId}`}
            className="JustOfheaderContentItemLink"
          >
            Завершити квест
          </Link>
        </li>
      </ul>

      <img src={logo} alt="logo" className="PageOfImg" />
    </div>
  );
}
