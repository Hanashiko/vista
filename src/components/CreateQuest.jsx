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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODExNjMyMSwianRpIjoiZTc5MDQxOTUtMTlhMy00ZDFkLThmNDYtZjg1Y2JhMGI4M2JkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjE0IiwibmJmIjoxNzQ4MTE2MzIxLCJjc3JmIjoiZjFmNGVhZTgtYzc0Ny00NWRkLWE0YWQtNTc3ZmUzNDU4NzVhIiwiZXhwIjoxNzUwNzA4MzIxfQ.cAMjuyH28twxzBnEtw6McvoYp2J16JaabRv_QMbh88U"
      );

      const response = await fetch("http://46.63.19.144:5000/v1/quests", {
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
                  {/* <UploadImageForCreateQuest onUpload={handleImageUpload} /> */}
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
