import React, { useState } from "react";
import UploadImageVariant from "./UploadImageVariant";

export default function FormAddQuestion({ onDelete, questId, question }) {
  // const [questionType, setQuestionType] = useState("");
  // const [selectedRadio, setSelectedRadio] = useState(null);
  // const [answers, setAnswers] = useState([
  //   { id: 1, text: "", checked: false },
  //   { id: 2, text: "", checked: false },
  //   { id: 3, text: "", checked: false },
  // ]);

  // const [formData, setformData] = useState({
  //   pointsOfForm: "",
  //   questionOfForm: "",
  // });

  const [questionType, setQuestionType] = useState(() => {
    if (!question) return "";
    if (question.question_type === "open") return "open";
    const correctCount =
      question.options?.filter((o) => o.is_correct).length || 0;
    return correctCount > 1 ? "multiple" : "single";
  });

  const [selectedRadio, setSelectedRadio] = useState(() => {
    if (questionType === "single") {
      const correct = question?.options?.find((o) => o.is_correct);
      return correct ? correct.id : null;
    }
    return null;
  });

  const [answers, setAnswers] = useState(() => {
    if (question?.options) {
      return question.options.map((opt, idx) => ({
        id: idx + 1,
        text: opt.text,
        checked: opt.is_correct,
      }));
    }
    return [
      { id: 1, text: "", checked: false },
      { id: 2, text: "", checked: false },
      { id: 3, text: "", checked: false },
    ];
  });

  const [formData, setformData] = useState({
    pointsOfForm: question?.points?.toString() || "",
    questionOfForm: question?.text || "",
  });

  // ------------

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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs"
      );

      const response = await fetch(
        `http://localhost:5000/v1/quests/${questId}/tasks`,
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
        {/* <UploadImageVariant /> */}
      </div>
    </div>
  );
}
