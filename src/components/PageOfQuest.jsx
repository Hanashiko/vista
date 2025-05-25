import React, { useState, useEffect } from "react";
import "../App.css";
import HeaderForPageOfQuest from "./HeaderForPageOfQuest";
import Footer from "./Footer";
import planet from "../assets/planet.png";
import { useParams } from "react-router-dom";
import RatingOfArrow from "../assets/RattingOfArrow.png";
import RatingOfForm from "./RatingOfForm";
import { useNavigate } from "react-router-dom";

export default function PageOfQuest() {
  const navigate = useNavigate();
  const { questId } = useParams();

  const [arrayOfPage, setArrayOfPage] = useState([]);

  const [isRatted, setIsRatted] = useState(false);

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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODExNjMyMSwianRpIjoiZTc5MDQxOTUtMTlhMy00ZDFkLThmNDYtZjg1Y2JhMGI4M2JkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjE0IiwibmJmIjoxNzQ4MTE2MzIxLCJjc3JmIjoiZjFmNGVhZTgtYzc0Ny00NWRkLWE0YWQtNTc3ZmUzNDU4NzVhIiwiZXhwIjoxNzUwNzA4MzIxfQ.cAMjuyH28twxzBnEtw6McvoYp2J16JaabRv_QMbh88U"
      );

      const response = await fetch(
        `http://46.63.19.144:5000/v1/quests/${questId}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) throw new Error("Помилка при отриманні даних");

      const data = await response.json();

      setArrayOfPage(data);
    } catch (error) {
      console.log("Помилка:", error);
    }
  };

  const handleClick = (questId) => {
    navigate(`/mainPage/PageOfQuest/JustQuest/${questId}`);
  };

  return (
    <div className="PageOFMain">
      <div className="PageOfmainQuests">
        <div className="content">
          <div className="container">
            <HeaderForPageOfQuest />
            <div className="PageOfMainContentQuests">
              <div className="PageOfContentPlanet">
                <h1 className="TitleOfPlanet">Квест "{arrayOfPage.title}"</h1>
                <p className="PlanetOfDesc">{arrayOfPage.description}</p>

                <div className="BtnOfPlanet">
                  <button
                    type="button"
                    className="MainOfBtnForPlanet"
                    onClick={() => handleClick(questId)}
                  >
                    Розпочати квест
                  </button>
                </div>
              </div>
              <img
                src={planet}
                alt="photo Of Planet"
                className="PhotoOfPlanet"
              />
            </div>

            <div className="RatingContentOfPlanet">
              <button
                className="RatingOfTitle"
                onClick={() => setIsRatted((isRatted) => !isRatted)}
              >
                <span className="RatTitle">Що думають про цей квест інші?</span>
                <span>
                  <img
                    src={RatingOfArrow}
                    alt="RatingOfArrow"
                    className="RatingOfArrow"
                  />
                </span>
              </button>
              <div className="MainContentOfRating"></div>
            </div>

            {isRatted && <RatingOfForm />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
