import React, { useState } from "react";
import MainTopbarSection from "./MainTopbarSection";
import Footer from "./Footer";
import UploadImageForCreateQuest from "./UploadImageForCreateQuest";
import FormAddQuestion from "./FormAddQuestion";
import FormAddQuestionWithCard from "./FormAddQuestionWithCard";

export default function CreateQuest() {
  const [questions, setQuestions] = useState([]);
  const [questionsWithCard, setquestionsWithCard] = useState([]);
  const [formData, setformData] = useState({
    titleOfCreateQuest: "",
    aboutOfCreateQuest: "",
    imageUrl: "",
  });

  const handleImageUpload = (url) => {
    setformData((prevData) => ({ ...prevData, imageUrl: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: formData.titleOfCreateQuest,
      description: formData.aboutOfCreateQuest,
      time_limit: 60,
    };

    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs"
      );

      const response = await fetch("http://localhost:5000/v1/quests", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Помилка при відправці даних");
      const result = await response.json();
      console.log("Успішна відправка:", result);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="">
        <aside className="mainTopBar">
          <MainTopbarSection />
        </aside>
        <div className="content">
          <p className="BradCrums">Головна / Створити квест</p>
          <div className="containerForCreateAQuest">
            <div className="PageOfmainQuestsCreate">
              <h1 className="mainQuestsCreateTitle">Новий квест</h1>
              <div className="container">
                <div className="mainQuestsCreateBaseInfo">
                  <form
                    className="mainQuestsCreateBaseForm"
                    onSubmit={handleSubmit}
                  >
                    <input
                      className="mainQuestsCreateBaseInput"
                      type="text"
                      name="titleOfCreateQuest"
                      placeholder="Назва вашого квесту"
                      value={formData.titleOfCreateQuest}
                      onChange={handleChange}
                    />
                    <textarea
                      className="mainQuestsCreateBaseTextarea"
                      placeholder="Опис вашого квесту"
                      value={formData.aboutOfCreateQuest}
                      name="aboutOfCreateQuest"
                      onChange={handleChange}
                    />

                    <button className="MainAddBtn" type="submit">
                      Додати
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
