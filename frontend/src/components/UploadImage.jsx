import React, { useRef, useState } from "react";
import upload from "../assets/upload.png";

export default function UploadImage() {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFile(file);
    }
  };

  const toggleImage = () => {
    setImage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(
        "http://localhost:5000/v1/profile/avatar",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs",
          },
          body: formData,
        }
      );

      const result = await response.json();
      console.log("Успішно", result);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="upload-box" onClick={handleClick}>
          <h1 className="uploadBoxTitle">Фото профілю</h1>

          {image ? (
            <img src={image} alt="Зображення" className="preview-image" />
          ) : (
            <>
              <img src={upload} alt="upload" className="UploadImage" />
            </>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/png, image/jpeg, image/gif"
          onChange={handleFileChange}
        />

        <button className="UploadButton" onClick={toggleImage}>
          Видалити фото
        </button>
        <button type="submit" className="UpgradeButton">
          Оновити фото
        </button>
      </form>
    </div>
  );
}
