import React, { useState } from "react";
import UploadImageVariant from "./UploadImageVariant";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function FormAddQuestionWithCard({ onDeleteFunc }) {
  // const handleAnswerChange = (id, newText) => {
  //   setAnswers(
  //     answers.map((answer) =>
  //       answer.id === id ? { ...answer, text: newText } : answer
  //     )
  //   );
  // };

  const [formData, setformData] = useState({
    pointsOfForm: "",
    questionOfForm: "",
    selectValue: "",
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="MainFormAddQuestionWithCard">
      <h1>Додати запитання</h1>
      <div className="MainFormAddQuestionContent">
        <div className="MainFormAddQuestioFormAndFotoWithCard">
          <form className="MainFormAddQuestioForm">
            <div className="MainFormAddQuestioSelectAndInputWithCard">
              <label className="MainFormAddQuestioLabelWithCard">
                Кількість балів
                <input
                  className="MainFormAddQuestioInputWithCard"
                  type="text"
                  placeholder="5 балів"
                  value={formData.pointsOfForm}
                  name="pointsOfForm"
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="TextareaWithCard">
              <label className="MainFormAddQuestioLabel">
                Ваше запитання
                <textarea
                  className="MainFormAddQuestioTextareaWithCard"
                  placeholder="Ваше запитання..."
                  value={formData.questionOfForm}
                  name="questionOfForm"
                  onChange={handleChange}
                />
              </label>
            </div>

            <select
              className="MainFormAddQuestioSelectWithCard"
              value={formData.selectValue}
              name="selectValue"
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Вибрати час на 1 питання
              </option>
              <option value="45OfSeconds">45 секунд</option>
              <option value="60OfMinute">1 хвилина</option>
            </select>
          </form>

          <div className="InfoAddCard">
            <iframe
              width="400"
              height="400"
              style={{
                border: 0,
                backgroundColor: "transparent",
                mixBlendMode: "multiply",
              }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps?q=Київ&output=embed&hl=uk"
            ></iframe>
          </div>
        </div>

        <div className="MainFormAddQuestioVariantButtonsWithCard">
          <button type="submit" className="MainFormAddQuestioVariantButtonOne">
            Додати
          </button>
          <button
            className="MainFormAddQuestioVariantButtonTwo"
            type="button"
            onClick={onDeleteFunc}
          >
            Видалити питання
          </button>
        </div>
      </div>
    </div>
  );
}
