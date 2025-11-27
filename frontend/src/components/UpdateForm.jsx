import { React, useState } from "react";

export default function UpdateForm() {
  const [uploadData, setUploadData] = useState({
    newName: "",
    newEmail: "",
    newPassword: "",
  });

  const handleFormChange = (e) => {
    setUploadData({ ...uploadData, [e.target.name]: e.target.value });
  };

  return (
    <div className="MainUpdateForm">
      <h1 className="uploadFormTitle">Ваші дані</h1>
      <form className="UpdateForm">
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
      </form>
    </div>
  );
}
