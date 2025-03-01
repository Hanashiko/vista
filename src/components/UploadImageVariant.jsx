import React, { useRef, useState } from "react";
import upload from "../assets/upload.png";

export default function UploadImageVariant() {
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
    }
  };

  const toggleImage = () => {
    setImage(false);
  };

  // const PostOfImage = async () => {
  //   const data = {};

  //   try {
  //   } catch (error) {
  //     console.log("Помилка:", error);
  //   }
  // };

  return (
    <div>
      <div>
        <div className="uploadBoxVariant" onClick={handleClick}>
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

        <button className="UploadButtonVariant" onClick={toggleImage}>
          Видалити фото
        </button>
      </div>

      <button className="UploadButtonVariant" type="submit">
        Додати фото
      </button>
    </div>
  );
}
