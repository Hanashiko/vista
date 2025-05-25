import React, { useState } from "react";
import UploadImageVariant from "./UploadImageVariant";

export default function FormAddQuestion({ onDelete, questId }) {
  const [questionType, setQuestionType] = useState("");
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [answers, setAnswers] = useState([
    { id: 1, text: "", checked: false },
    { id: 2, text: "", checked: false },
    { id: 3, text: "", checked: false },
  ]);

  const [formData, setformData] = useState({
    pointsOfForm: "",
    questionOfForm: "",
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { id: Date.now(), text: "", checked: false }]);
  };

  const handleAnswerChange = (id, newText) => {
    setAnswers(
      answers.map((answer) =>
        answer.id === id ? { ...answer, text: newText } : answer
      )
    );
  };

  const handleCheckboxChange = (id) => {
    if (questionType === "single") {
      setSelectedRadio(id);
    } else {
      setAnswers(
        answers.map((answer) =>
          answer.id === id ? { ...answer, checked: !answer.checked } : answer
        )
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      text: formData.questionOfForm,
      question_type: "multiple_choice",
      points: parseInt(formData.pointsOfForm, 10) || 0,
      options: answers.map((answer) => ({
        text: answer.text,
        is_correct:
          questionType === "single"
            ? selectedRadio === answer.id
            : answer.checked,
      })),
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
    <div className="MainFormAddQuestion">
      <h1>Додати запитання</h1>
      <div className="MainFormAddQuestionContent">
        <form className="MainFormAddQuestioForm" onSubmit={handleSubmit}>
          <div className="MainFormAddQuestioSelectAndInput">
            <label className="MainFormAddQuestioLabel">
              Тип питання
              <select
                className="MainFormAddQuestioSelect"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
              >
                <option value="" disabled>
                  Оберіть ваш тип питання
                </option>
                <option value="single">1 правильна відповідь</option>
                <option value="multiple">декілька правильних відповідей</option>
                <option value="open">відкрита відповідь</option>
              </select>
            </label>
            <label className="MainFormAddQuestioLabel">
              Кількість балів
              <input
                className="MainFormAddQuestioInput"
                type="text"
                placeholder="5 балів"
                name="pointsOfForm"
                value={formData.pointsOfForm}
                onChange={handleChange}
              />
            </label>
          </div>
          <label className="MainFormAddQuestioLabel">
            Ваше запитання
            <textarea
              className="MainFormAddQuestioTextarea"
              placeholder="Ваше запитання..."
              value={formData.questionOfForm}
              name="questionOfForm"
              onChange={handleChange}
            />
          </label>

          <div className="MainFormAddQuestioVariant">
            <h3 className="AddVariantTitle">Варіанти відповідей</h3>
            {answers.map((answer) => (
              <div key={answer.id} className="answer-option">
                {(questionType === "single" || questionType === "multiple") && (
                  <input
                    type={questionType === "single" ? "radio" : "checkbox"}
                    name={
                      questionType === "single"
                        ? "single-choice"
                        : `checkbox-${answer.id}`
                    }
                    checked={
                      questionType === "single"
                        ? selectedRadio === answer.id
                        : answer.checked
                    }
                    onChange={() => handleCheckboxChange(answer.id)}
                  />
                )}
                <input
                  className="answerOptionInput"
                  type="text"
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerChange(answer.id, e.target.value)
                  }
                  placeholder="Ваша відповідь..."
                />
              </div>
            ))}
            <button
              type="button"
              className="AddVariant"
              onClick={handleAddAnswer}
            >
              Додати варіант
            </button>
          </div>
          <div className="MainFormAddQuestioVariantButtons">
            <button
              type="submit"
              className="MainFormAddQuestioVariantButtonOne"
            >
              Додати
            </button>

            <button
              className="MainFormAddQuestioVariantButtonTwo"
              type="button"
              onClick={onDelete}
            >
              Видалити питання
            </button>
          </div>
        </form>
        <UploadImageVariant />
      </div>
    </div>
  );
}
