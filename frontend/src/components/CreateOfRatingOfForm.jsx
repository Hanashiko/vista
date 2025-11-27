import React, { useState } from "react";

import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { useParams } from "react-router-dom";

export default function CreateOfRatingOfForm() {
  const { questId } = useParams();
  const [rating, setRating] = useState(0);

  const handleRating = ({ rating }) => {
    setRating(rating);
    setFormData((prev) => ({
      ...prev,
      ValueOfRating: rating,
    }));
  };

  const [formData, setFormData] = useState({
    ValueOfText: "",
    ValueOfRating: "",
  });

  const handleInformation = (e) => {
    setFormData({
      ...formData,
      ValueOfText: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      stars: Number(formData.ValueOfRating),
      comment: formData.ValueOfText,
    };

    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs"
      );

      const response = await fetch(
        `http://localhost:5000/v1/quests/${questId}/rate`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Помилка при відправці даних");
      const result = await response.json();
      console.log("Успішна відправка:", result);
    } catch (error) {
      console.log("Помилка:", error);
    }
  };

  return (
    <div className="MainRatingOfForm">
      <div className="CreateContentOfRatingOfForm">
        <h2 className="MainContentOfRatingOfFormTitle">Створіть Ваш відгук</h2>

        <form className="CreateForm" onSubmit={handleSubmit}>
          <Rater
            total={5}
            rating={rating}
            onRate={handleRating}
            interactive={true}
            className="large-star"
            value={formData.ValueOfRating}
            onChange={handleInformation}
          />

          <label
            htmlFor="CreateContentOfRatingOfFormTextarea"
            className="CreateContentOfRatingOfFormLabel"
          ></label>

          <textarea
            placeholder="Ваш відгук"
            name="CreateContentOfRatingOfFormTextarea"
            className="CreateContentOfRatingOfFormTextarea"
            value={formData.ValueOfText}
            onChange={handleInformation}
          />
          <button className="CreateContentOfRatingOfFormButton" type="submit">
            Відправити
          </button>
        </form>
      </div>
    </div>
  );
}
