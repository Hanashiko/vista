import React, { useState, useEffect } from "react";
import MainTopbarSection from "./MainTopbarSection";
import Footer from "./Footer";
import UploadImageForCreateQuest from "./UploadImageForCreateQuest";
import FormAddQuestion from "./FormAddQuestion";
import FormAddQuestionWithCard from "./FormAddQuestionWithCard";
import { useParams } from "react-router-dom";

export default function EditQuest() {
  const { questId } = useParams();

  const [mySavedQuestions, setMySavedQuestions] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [questionsWithCard, setquestionsWithCard] = useState([]);

  const [getInfo, setGetInfo] = useState({
    title: "",
    about: "",
  });

  const [formData, setFormData] = useState({
    titleOfCreateQuest: "",
    aboutOfCreateQuest: "",
  });

  const GetInfo = async () => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
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

      setGetInfo(data);
      setQuestions(data.tasks || []);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  useEffect(() => {
    if (questId) {
      GetInfo();
    }
  }, [questId]);

  useEffect(() => {
    setFormData({
      titleOfCreateQuest: getInfo.title,
      aboutOfCreateQuest: getInfo.description,
    });
  }, [getInfo]);

  const UpdateBaseInfo = async (e) => {
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

      const response = await fetch(
        `http://46.63.19.144:5000/v2/quests/${questId}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Помилка при відправці даних");
      const result = await response.json();
      console.log("Успішна відправка:", result);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  const handleImageUpload = (url) => {
    setFormData((prevData) => ({ ...prevData, imageUrl: url }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <div className="">
        <aside className="mainTopBar">
          <MainTopbarSection />
        </aside>
        <div className="content">
          <p className="BradCrums">Головна / Відредагувати квест</p>
          <div className="container">
            <div className="mainQuestsCreate">
              <h1 className="mainQuestsCreateTitle">Відредагувати квест</h1>
              <div className="container">
                <div className="mainQuestsCreateBaseInfo">
                  <form
                    className="EditmainQuestsCreateBaseForm"
                    onSubmit={UpdateBaseInfo}
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

                    <button className="EditOfMainAddBtn" type="submit">
                      Оновити дані
                    </button>
                  </form>
                  <UploadImageForCreateQuest onUpload={handleImageUpload} />
                </div>

                {questions.map((question) => (
                  <FormAddQuestion
                    key={question.id}
                    onDelete={() => removeQuestion(question.id)}
                    questId={questId}
                  />
                ))}

                {questionsWithCard.map((question) => (
                  <FormAddQuestionWithCard
                    key={question.id}
                    onDeleteFunc={() => removeQuestionWithCard(question.id)}
                    questId={questId}
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
                  <button
                    className="mainQuestsCreateBaseBtnThree "
                    type="button"
                    onClick={() =>
                      setMySavedQuestions(
                        (mySavedQuestions) => !mySavedQuestions
                      )
                    }
                  >
                    Мої питання
                  </button>
                </div>

                {/* {mySavedQuestions && (
                  <ol>
                    {questions.map((question) => (
                      <li key={question.id} className="ItemofListQuest">
                        <h3 className="ListOfQuestTitle">{question.text}</h3>

                        <ul>
                          {question.options.map((option, index) => (
                            <li key={index}>
                              {option.text}
                              {option.is_correct && ""}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                )} */}

                {mySavedQuestions && (
                  <ol>
                    {questions.length > 0 ? (
                      questions.map((question) => (
                        <li key={question.id} className="ItemofListQuest">
                          <h3 className="ListOfQuestTitle">{question.text}</h3>
                          <ul>
                            {question.options.map((option, index) => (
                              <li key={index}>
                                {option.text}
                                {option.is_correct && "✅"}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))
                    ) : (
                      <p>Немає збережених питань</p>
                    )}
                  </ol>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
