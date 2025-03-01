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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const headers = new Headers();
  //     headers.append("Content-Type", "application/json");
  //     headers.append(
  //       "Authorization",
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTc5MjM2NCwianRpIjoiMWZiMWZjMTctNDRiMC00ZThjLTljOGEtNmE4MjYxOTU0ZDE3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3Mzk3OTIzNjQsImNzcmYiOiJlMWYyNTA4OS01MmU5LTQwNGQtOTJkMS01YzFlZmMzOWI2NDQiLCJleHAiOjE3Mzk4Nzg3NjR9._3xa9tXJbVnj3u-V4bSlsmZUC-BAmkt9Mram8EjBpEk"
  //     );
  //     const response = await fetch("http://54.89.245.167:5000/profile/avatar", {
  //       method: "POST",
  //       headers: headers,
  //       body: formData,
  //     });

  //     const result = await response.json();
  //     console.log("Відповідь сервера:", result);
  //   } catch (error) {
  //     console.error("Помилка завантаження:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch("http://54.89.245.167:5000/profile/avatar", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ",
        },
        body: formData,
      });

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
