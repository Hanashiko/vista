import { React, useState } from "react";

export default function UpdateForm() {
  const [uploadData, setUploadData] = useState({
    newName: "",
    newEmail: "",
    newPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: uploadData.newEmail,
      name: uploadData.newName,
      password: uploadData.newPassword,
    };

    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ"
      );

      const response = await fetch("http://54.89.245.167:5000/profile", {
        method: "PUT",
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

  const handleFormChange = (e) => {
    setUploadData({ ...uploadData, [e.target.name]: e.target.value });
  };

  return (
    <div className="MainUpdateForm">
      <h1 className="uploadFormTitle">Ваші дані</h1>
      <form className="UpdateForm" onSubmit={handleSubmit}>
        <input
          className="UpdateFormInput"
          type="text"
          placeholder="Ваше нове ім'я"
          name="newName"
          value={uploadData.newName}
          onChange={handleFormChange}
        />
        <input
          className="UpdateFormInput"
          type="text"
          placeholder="Ваш новий email"
          name="newEmail"
          value={uploadData.newEmail}
          onChange={handleFormChange}
        />
        <input
          className="UpdateFormInput"
          type="text"
          placeholder="Ваш новий пароль"
          name="newPassword"
          value={uploadData.newPassword}
          onChange={handleFormChange}
        />

        <button type="submit" className="UploadButtonForm">
          Оновити дані
        </button>
      </form>
    </div>
  );
}
