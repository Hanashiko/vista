import React, { useRef, useState } from "react";
import upload from "../assets/upload.png";

export default function UploadImageForCreateQuest({ onUpload }) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onUpload(imageUrl);
    }
  };

  const toggleImage = () => {
    setImage(false);
  };

  return (
    <div className="MainUploadImageForCreate">
      <div className="" onClick={handleClick}>
        <h1 className="UploadImageForCreateQuestTitle">
          Завантажити облакладинку квесту
        </h1>

        {image ? (
          <img src={image} alt="Зображення" className="preview-image" />
        ) : (
          <>
            <img src={upload} alt="upload" className="UploadImageCreate " />
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

      <button className="UploadButtonCreate" onClick={toggleImage}>
        Видалити фото
      </button>
    </div>
  );
}
