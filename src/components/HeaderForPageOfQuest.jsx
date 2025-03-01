import { React, useState, useEffect } from "react";
import "../App.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function HeaderForPageOfQuest() {
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
          <Link to="" className="PageOfheaderContentItemLinkTwo">
            Більше про нас
          </Link>
        </li>
      </ul>

      <img src={logo} alt="logo" className="PageOfImg" />
    </div>
  );
}
