import React from "react";
import "../App.css";
import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./MainPage";
import MyProfile from "./MyProfile";
import MyQuests from "./MyQuests";
import CreateQuest from "./CreateQuest";
import EnterPage from "./EnterPage/EnterPage";

import homeIcon from "../assets/homeIcon.png";
import userIcon from "../assets/userIcon.png";
import questsIcon from "../assets/questsIcon.png";
import createQuestIcon from "../assets/createQuestIcon.png";
import iconForGames from "../assets/IconOfGames.svg";
import MyGames from "./MyGames";

export default function MainTopbarSection() {
  return (
    <div className="TopBar">
      <h1 className="TopBarTitle">We`re Vista</h1>
      <nav className="TopBarNav">
        <ul className="TopBarNavList">
          <li className="TopBarNavListItem">
            <img src={homeIcon} alt="Home" className="icon" />
            <Link to="/mainPage" className="TopBarNavListLink">
              Головна
            </Link>
          </li>
          <li className="TopBarNavListItem">
            <img src={userIcon} alt="User" className="icon" />
            <Link to="/mainPage/myProfile" className="TopBarNavListLink">
              Мій профіль
            </Link>
          </li>
          <li className="TopBarNavListItem">
            <img src={questsIcon} alt="Quests" className="icon" />
            <Link to="/mainPage/myQuests" className="TopBarNavListLink">
              Мої квести
            </Link>
          </li>
          <li className="TopBarNavListItem">
            <img src={createQuestIcon} alt="Create Quest" className="icon" />
            <Link to="/mainPage/createQuest" className="TopBarNavListLink">
              Створити квест
            </Link>
          </li>
          <li className="TopBarNavListItem">
            <img src={iconForGames} alt="Create Quest" className="icon" />
            <Link to="/mainPage/myGames" className="TopBarNavListLink">
              Міні-ігри
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/mainPage/myProfile" element={<MyProfile />} />
        <Route path="/mainPage/myQuests" element={<MyQuests />} />
        <Route path="/mainPage/createQuest" element={<CreateQuest />} />
        <Route path="/enter" element={<EnterPage />} />
        <Route path="/mainPage/myGames" element={<MyGames />} />
      </Routes>

      <p className="TopBarExit">
        <Link className="ExitLink" to="/enter">
          Вийти з акаунту
        </Link>
      </p>
    </div>
  );
}
