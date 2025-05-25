import React, { useState } from "react";
import UploadImageVariant from "./UploadImageVariant";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function FormAddQuestionWithCard({ onDeleteFunc, questId }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      text: formData.questionOfForm,
      question_type: "map_interactive",
      points: parseInt(formData.pointsOfForm, 10) || 0,
      map_interactive: [
        {
          description: formData.description,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
        },
      ],
    };

    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODExNjMyMSwianRpIjoiZTc5MDQxOTUtMTlhMy00ZDFkLThmNDYtZjg1Y2JhMGI4M2JkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjE0IiwibmJmIjoxNzQ4MTE2MzIxLCJjc3JmIjoiZjFmNGVhZTgtYzc0Ny00NWRkLWE0YWQtNTc3ZmUzNDU4NzVhIiwiZXhwIjoxNzUwNzA4MzIxfQ.cAMjuyH28twxzBnEtw6McvoYp2J16JaabRv_QMbh88U"
      );

      const response = await fetch(
        `http://46.63.19.144:5000/v1/quests/${questId}/tasks`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error("Помилка");
      const result = await response.json();
      console.log("Дані відправились успішно:", result);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  return (
    <div className="MainFormAddQuestionWithCard">
      <h1>Додати запитання</h1>
      <div className="MainFormAddQuestionContent">
        <div className="MainFormAddQuestioFormAndFotoWithCard">
          <form className="MainFormAddQuestioForm" onSubmit={handleSubmit}>
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

            <div className="MainFormAddQuestioVariantButtonsWithCard">
              <button
                type="submit"
                className="MainFormAddQuestioVariantButtonOne"
              >
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
      </div>
    </div>
  );
}
