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
  const [imageUrl, setImageUrl] = useState("");

  // const handleImageUpload = (url) => {
  //   setImageUrl(url);
  //   setformData({ ...formData, imageUrl: url });
  // };

  const handleImageUpload = (url) => {
    setformData((prevData) => ({ ...prevData, imageUrl: url }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     title: formData.titleOfCreateQuest,
  //     description: formData.aboutOfCreateQuest,
  //     image: formData.imageUrl,
  //   };

  //   try {
  //     const response = await fetch("http://54.89.245.167:5000/v1/quests", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTM3MzExOSwianRpIjoiM2FkMzhkMjItZWJmMi00M2JlLTgxZjMtNmJmMjYyOTliNjA0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3MzkzNzMxMTksImNzcmYiOiJhNDIzYTgyYi03N2E3LTQ4ODYtOGY4MS1lMjUyMDJhYTJlZjQiLCJleHAiOjE3Mzk0NTk1MTl9.krC10h6qeBYvUCt5GofGyvBPTvmAbh1hWlbVMLToXNk",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     if (!response.ok) throw new Error("Ошибка при отправке данных");
  //     const result = await response.json();
  //     console.log("Успех:", result);
  //   } catch (error) {
  //     console.error("Ошибка:", error);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     title: formData.titleOfCreateQuest,
  //     description: formData.aboutOfCreateQuest,
  //     time_limit: 60,
  //   };

  //   try {
  //     const headers = new Headers();
  //     headers.append("Content-Type", "application/json");
  //     headers.append(
  //       "Authorization",
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTM4ODIyNiwianRpIjoiNWMxZDU2ODktYTdjYS00MjRjLTkzYzUtODFhNmYwN2YyZjBlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjciLCJuYmYiOjE3MzkzODgyMjYsImNzcmYiOiI1NzE4NWM4Yy03OWU4LTRlMjEtYjVkNi01ZTY0NDE1ZjFiMzAiLCJleHAiOjE3Mzk0NzQ2MjZ9.qBtZSw4KwM3_FgXL7PTqoG2UgI7LIfCDv6kusYQHVD0"
  //     );

  //     const response = await fetch("http://46.63.19.144:5000/v1/quests", {
  //       method: "POST",
  //       mode: "no-cors",
  //       headers: headers,
  //       body: JSON.stringify(data),
  //     });
  //     if (!response.ok) throw new Error("Помилка при відправці даних");
  //     const result = await response.json();
  //     console.log("Успіх:", result);
  //   } catch (error) {
  //     console.error("Помилка:", error);
  //   }
  // };

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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTM4ODIyNiwianRpIjoiNWMxZDU2ODktYTdjYS00MjRjLTkzYzUtODFhNmYwN2YyZjBlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjciLCJuYmYiOjE3MzkzODgyMjYsImNzcmYiOiI1NzE4NWM4Yy03OWU4LTRlMjEtYjVkNi01ZTY0NDE1ZjFiMzAiLCJleHAiOjE3Mzk0NzQ2MjZ9.qBtZSw4KwM3_FgXL7PTqoG2UgI7LIfCDv6kusYQHVD0"
      );

      const response = await fetch("http://46.63.19.144:5000/v1/quests", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Ошибка при отправке данных");
      const result = await response.json();
      console.log("Успех:", result);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const addNewQuestion = () => {
    setQuestions([...questions, { id: Date.now() }]);
  };

  const addNewQuestionWithCard = () => {
    setquestionsWithCard([...questionsWithCard, { id: Date.now() }]);
  };

  const removeQuestion = (questionId) => {
    setQuestions(questions.filter((question) => question.id !== questionId));
  };

  const removeQuestionWithCard = (questionId) => {
    setquestionsWithCard(
      questionsWithCard.filter((question) => question.id !== questionId)
    );
  };

  return (
    <div>
      <div className="mainQuests">
        <aside className="mainTopBar">
          <MainTopbarSection />
        </aside>
        <div className="content">
          <p className="BradCrums">Головна / Створити квест</p>
          <div className="container">
            <div className="mainQuestsCreate">
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
                  <UploadImageForCreateQuest onUpload={handleImageUpload} />
                </div>

                {questions.map((question) => (
                  <FormAddQuestion
                    key={question.id}
                    onDelete={() => removeQuestion(question.id)}
                  />
                ))}

                <div className="mainQuestsCreateBaseContent">
                  <button
                    className="mainQuestsCreateBaseBtnOne"
                    type="button"
                    onClick={addNewQuestion}
                  >
                    Створити питання
                    <span className="mainQuestsCreateBaseBtnSpan">+</span>
                  </button>
                  <button
                    className="mainQuestsCreateBaseBtnTwo "
                    type="button"
                    onClick={addNewQuestionWithCard}
                  >
                    Створити питання з картою
                    <span className="mainQuestsCreateBaseBtnSpan">+</span>
                  </button>
                </div>

                {questionsWithCard.map((question) => (
                  <FormAddQuestionWithCard
                    key={question.id}
                    onDeleteFunc={() => removeQuestionWithCard(question.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
