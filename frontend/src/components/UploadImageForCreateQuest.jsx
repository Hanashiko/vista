import React, { useRef, useState, useEffect } from "react";
import upload from "../assets/upload.png";
import { useParams } from "react-router-dom";

export default function UploadImageForCreateQuest({ onUpload }) {
  const { questId } = useParams();
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
      onUpload(file);
      setFile(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const PostImage = async () => {
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `http://localhost:5000/v1/quests/${questId}/image`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs",
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Помилка при відправці даних");
      const result = await response.json();
      console.log("Успішна відправка:", result);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  useEffect(() => {
    PostImage();
  }, [image]);

  return (
    <div>
      <div className="MainUploadImageForCreate">
        <div onClick={handleClick}>
          <h1 className="UploadImageForCreateQuestTitle">
            Завантажити обкладинку квесту
          </h1>

          {image ? (
            <img src={image} alt="Зображення" className="preview-image" />
          ) : (
            <img src={upload} alt="upload" className="UploadImageCreate" />
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/png, image/jpeg, image/gif"
          onChange={handleFileChange}
        />

        <button
          className="UploadButtonCreate"
          onClick={removeImage}
          disabled={!image}
        >
          Видалити фото
        </button>
      </div>
      <button
        className="UpdateButtonCreate"
        onClick={PostImage}
        disabled={!image}
      >
        Оновити фото
      </button>
    </div>
  );
}
