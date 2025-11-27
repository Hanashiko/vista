import HeaderForPageOfQuest from "./HeaderForPageOfQuest";
import gameStick from "../assets/gameS.png";
import "../App.css";
import Puzzle from "../assets/Puzzle.jpg";
import DragAndDrop from "../assets/dragAndDrop.jpg";
import cub from "../assets/cubok.png";
import Footer from "./Footer";
import { Link } from "react-router-dom";
export default function MyGame() {
  return (
    <div className="MainGame">
      <div className="container">
        <HeaderForPageOfQuest />
        <div className="MainContentGame">
          <div className="ContentGame">
            <h1 className="TitleGame">Mini Games</h1>
            <p className="TextGame">
              Тут ви можете знайти розвиваючі ігри на будь-який смак — від
              логічних головоломок і вправ на пам’ять до творчих завдань та
              інтерактивного навчання для дітей різного віку.
            </p>
            <img
              src={cub}
              className="imgOfContent"
              alt="image for page of game"
            />
          </div>
          <div className="MediaGame">
            <img
              src={gameStick}
              className="imgOfMedia"
              alt="image for page of game"
            />
          </div>
        </div>
        <div className="LastGames">
          <h2 className="LastGamesTitle">Останні ігри</h2>
          <div className="LastGamesContent">
            <ul className="LastGamesList">
              <li className="LastGamesItem">
                <img
                  className="imgOfLast"
                  src={Puzzle}
                  alt="image for page of game"
                />
                <h3 className="TitleOfLastGame">Puzzle</h3>
                <button className="ButtonOfLastGame">
                  <Link
                    to="/mainPage/myGames/puzzle"
                    className="LinkOfLastGame"
                  >
                    Грати
                  </Link>
                </button>
              </li>
              <li className="LastGamesItem">
                <img
                  className="imgOfLast"
                  src={DragAndDrop}
                  alt="image for page of game"
                />
                <h3 className="TitleOfLastGame">Drag & Drop</h3>
                <button className="ButtonOfLastGame">
                  <Link to="/mainPage/myGames/drop" className="LinkOfLastGame">
                    Грати
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
