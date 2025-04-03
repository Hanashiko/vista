import React from "react";
import { Link } from "react-router-dom";
export default function ListQuests() {
  return (
    <div className="ListQuests">
      <div className="ImageQuest">
        <h1 className="ImageQuestTitle">Create, learn, explore - Vista</h1>
        <p className="ImageQuestText">
          Cтворюй нові захоплюючі пригоди та ділись їми з іншими
        </p>
        <div className="ImageQuestBtn">
          <button className="ImageBtn">Створити квест</button>
          <p className="ImageQuestParagraph">
            <Link to="/mainPage/myProfile" className="ImageQuestLink">
              Мій профіль
            </Link>
          </p>
        </div>
      </div>

      <div className="MyQuests">
        <h1>Мої квести</h1>
        <p style={{ position: "relative", textAlign: "center" }}>
          Тут повинні бути список моїх квестів
        </p>
      </div>
      <div className="NewQuests">
        <h1>Новинки ✨ </h1>
        <p style={{ position: "relative", textAlign: "center" }}>
          Тут повинні бути список нових квестів
        </p>
      </div>
    </div>
  );
}
