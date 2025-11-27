import React from "react";

export default function HistoryContent() {
  return (
    <div className="HistoryContent">
      <div className="RatingOfAuthors">
        <div className="AllOfAuthors">
          <h1 className="AllOfTitle">Рейтинг авторів</h1>
          <button className="AllOfBtn">Переглянути всіх</button>
        </div>
        <div className="InfoOfAuthors">
          <ul className="InfoOfAuthorsList">
            <li>
              <p>Автор</p>
            </li>
            <li>
              <p>Кількість робіт</p>
            </li>
            <li>
              <p>Рейтинг</p>
            </li>
          </ul>
        </div>

        <div className="Authors">Тут повинен бути список авторів</div>
      </div>

      <div className="LastQuests">
        <div className="LastInfo">
          <h1 className="AllOfTitle">Останні додані</h1>
          <button className="AllOfBtn">Переглянути всю історію</button>
        </div>

        <div className="LastQuestsList">
          Тут повинен бути список останніх доданих квестів
        </div>
      </div>
    </div>
  );
}
