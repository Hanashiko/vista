// import React, { useState } from "react";
// import UploadImageVariant from "./UploadImageVariant";

// export default function FormAddQuestion({ onDelete }) {
//   const [questionType, setQuestionType] = useState("");
//   const [selectedRadio, setSelectedRadio] = useState(null);
//   const [answers, setAnswers] = useState([
//     { id: 1, text: "", checked: false },
//     { id: 2, text: "", checked: false },
//     { id: 3, text: "", checked: false },
//   ]);

//   const [formData, setformData] = useState({
//     pointsOfForm: "",
//     questionOfForm: "",
//   });

//   const handleChange = (e) => {
//     setformData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAddAnswer = () => {
//     setAnswers([...answers, { id: Date.now(), text: "", checked: false }]);
//   };

//   const handleAnswerChange = (id, newText) => {
//     setAnswers(
//       answers.map((answer) =>
//         answer.id === id ? { ...answer, text: newText } : answer
//       )
//     );
//   };

//   const handleCheckboxChange = (id) => {
//     if (questionType === "single") {
//       setSelectedRadio(id);
//     } else {
//       setAnswers(
//         answers.map((answer) =>
//           answer.id === id ? { ...answer, checked: !answer.checked } : answer
//         )
//       );
//     }
//   };

//   return (
//     <div className="MainFormAddQuestion">
//       <h1>Додати запитання</h1>
//       <div className="MainFormAddQuestionContent">
//         <div className="MainFormAddQuestioFormAndFoto">
//           <form className="MainFormAddQuestioForm">
//             <div className="MainFormAddQuestioSelectAndInput">
//               <label className="MainFormAddQuestioLabel">
//                 Тип питання
//                 <select
//                   className="MainFormAddQuestioSelect"
//                   value={questionType}
//                   onChange={(e) => setQuestionType(e.target.value)}
//                 >
//                   <option value="" disabled>
//                     Оберіть ваш тип питання
//                   </option>
//                   <option value="single">1 правильна відповідь</option>
//                   <option value="multiple">
//                     декілька правильних відповідей
//                   </option>
//                   <option value="open">відкрита відповідь</option>
//                 </select>
//               </label>
//               <label className="MainFormAddQuestioLabel">
//                 Кількість балів
//                 <input
//                   className="MainFormAddQuestioInput"
//                   type="text"
//                   placeholder="5 балів"
//                   name="pointsOfForm"
//                   value={formData.pointsOfForm}
//                   onChange={handleChange}
//                 />
//               </label>
//             </div>
//             <label className="MainFormAddQuestioLabel">
//               Ваше запитання
//               <textarea
//                 className="MainFormAddQuestioTextarea"
//                 placeholder="Ваше запитання..."
//                 value={formData.questionOfForm}
//                 name="questionOfForm"
//                 onChange={handleChange}
//               />
//             </label>
//           </form>
//           <UploadImageVariant />
//         </div>

//         <div className="MainFormAddQuestioVariant">
//           <form className="MainFormAddQuestioVariants">
//             <h3 className="AddVariantTitle">Варіанти відповідей</h3>
//             {answers.map((answer) => (
//               <div key={answer.id} className="answer-option">
//                 {(questionType === "single" || questionType === "multiple") && (
//                   <input
//                     type={questionType === "single" ? "radio" : "checkbox"}
//                     name={
//                       questionType === "single"
//                         ? "single-choice"
//                         : `checkbox-${answer.id}`
//                     }
//                     checked={
//                       questionType === "single"
//                         ? selectedRadio === answer.id
//                         : answer.checked
//                     }
//                     onChange={() => handleCheckboxChange(answer.id)}
//                   />
//                 )}
//                 <input
//                   className="answerOptionInput"
//                   type="text"
//                   value={answer.text}
//                   onChange={(e) =>
//                     handleAnswerChange(answer.id, e.target.value)
//                   }
//                   placeholder="Ваша відповідь..."
//                 />
//               </div>
//             ))}
//             <button
//               type="button"
//               className="AddVariant"
//               onClick={handleAddAnswer}
//             >
//               Додати варіант
//             </button>

//             <select
//               className="MainFormAddQuestioSelectTwo"
//               value={formData.selectTime}
//               onChange={handleChange}
//             >
//               <option value="" disabled selected>
//                 Вибрати час на 1 питання
//               </option>
//               <option value="45OfSeconds">45 секунд</option>
//               <option value="60OfMinute">1 хвилина</option>
//             </select>
//           </form>
//         </div>
//         <div className="MainFormAddQuestioVariantButtons">
//           <button type="submit" className="MainFormAddQuestioVariantButtonOne">
//             Додати
//           </button>
//           <button
//             className="MainFormAddQuestioVariantButtonTwo"
//             type="button"
//             onClick={onDelete}
//           >
//             Видалити питання
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import UploadImageVariant from "./UploadImageVariant";

export default function FormAddQuestion({ onDelete }) {
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
      question: formData.questionOfForm,
      points: formData.pointsOfForm,
      type: questionType,
      answers: answers.map((answer) => ({
        text: answer.text,
        correct:
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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTM4ODIyNiwianRpIjoiNWMxZDU2ODktYTdjYS00MjRjLTkzYzUtODFhNmYwN2YyZjBlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjciLCJuYmYiOjE3MzkzODgyMjYsImNzcmYiOiI1NzE4NWM4Yy03OWU4LTRlMjEtYjVkNi01ZTY0NDE1ZjFiMzAiLCJleHAiOjE3Mzk0NzQ2MjZ9.qBtZSw4KwM3_FgXL7PTqoG2UgI7LIfCDv6kusYQHVD0"
      );

      const response = await fetch(
        "http://3.91.195.136:5000/quests/18/tasks",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error("Ошибка при отправке данных");
      const result = await response.json();
      console.log("Успех:", result);
    } catch (error) {
      console.error("Ошибка:", error);
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
