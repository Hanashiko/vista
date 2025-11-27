import { React, useState, useEffect } from "react";
import "../App.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function HeaderForPageOfQuest() {
  return (
    <div className="HeaderForPageOfQuest">
      <div className="PageOfheaderContent"></div>
      <ul className="PageOfheaderContentList">
        <li className="PageOfheaderContentItem">
          <Link to="/mainPage" className="PageOfheaderContentItemLinkOne">
            На головну
          </Link>
        </li>

        <li className="PageOfheaderContentItem">
          <a
            href="https://github.com/Margin-interteiment/vista"
            target="_blank"
            className="PageOfheaderContentItemLinkTwo"
          >
            Більше про нас
          </a>
        </li>
      </ul>

      <img src={logo} alt="logo" className="PageOfImg" />
    </div>
  );
}
