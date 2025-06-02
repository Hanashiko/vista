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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODg5NTE2MiwianRpIjoiYTM4YWJhOWMtZmJlMC00NDk5LTgyYzgtYjQ0ZGNmY2Q5ZDExIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3NDg4OTUxNjIsImNzcmYiOiJhMzZmMTBlYS0yYzIwLTQ0N2EtYjNhNy00YzA1NTA5YTUwZWUiLCJleHAiOjE3NTE0ODcxNjJ9.JsN8GP71WaPBZgcup6eLgZkLpPOS0_owFVMNM6kG110"
      );

      const response = await fetch(
        `http://46.63.19.144:5000/v1/quests/${questId}/rate`,
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
