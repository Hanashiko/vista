// import React, { useRef, useState, useEffect } from "react";
// import upload from "../assets/upload.png";
// import { useParams } from "react-router-dom";

// export default function UploadImageForCreateQuest({ onUpload }) {
//   const { questId } = useParams();
//   const fileInputRef = useRef(null);
//   const [image, setImage] = useState(null);

//   const handleClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setImage(imageUrl);
//       onUpload(imageUrl);
//     }
//   };

//   const toggleImage = () => {
//     setImage(false);
//   };

//   const PostImage = async (e) => {
//     e.preventDefault();
//     try {
//       const data = {
//         image: image,
//       };

//       const headers = new Headers();
//       headers.append("Content-Type", "application/json");
//       headers.append(
//         "Authorization",
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ"
//       );

//       const response = await fetch(
//         `http://54.89.245.167:5000/quests/${questId}/image`,
//         {
//           method: "POST",
//           headers: headers,
//           body: JSON.stringify(data),
//         }
//       );

//       if (!response.ok) throw new Error("Помилка при відправці даних");
//       const result = await response.json();
//       console.log("Успішна відправка:", result);
//     } catch (error) {
//       console.error("Помилка:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={PostImage}>
//         <div className="MainUploadImageForCreate">
//           <div className="" onClick={handleClick}>
//             <h1 className="UploadImageForCreateQuestTitle">
//               Завантажити облакладинку квесту
//             </h1>

//             {image ? (
//               <img src={image} alt="Зображення" className="preview-image" />
//             ) : (
//               <>
//                 <img src={upload} alt="upload" className="UploadImageCreate " />
//               </>
//             )}
//           </div>
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             accept="image/png, image/jpeg, image/gif"
//             onChange={handleFileChange}
//           />

//           <button className="UploadButtonCreate" onClick={toggleImage}>
//             Видалити фото
//           </button>
//         </div>
//         <button className="UpdateButtonCreate" type="submit">
//           Оновити фото
//         </button>
//       </form>
//     </div>
//   );
// }

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
        `http://46.63.19.144:5000/v1/quests/${questId}/image`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODExNjMyMSwianRpIjoiZTc5MDQxOTUtMTlhMy00ZDFkLThmNDYtZjg1Y2JhMGI4M2JkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjE0IiwibmJmIjoxNzQ4MTE2MzIxLCJjc3JmIjoiZjFmNGVhZTgtYzc0Ny00NWRkLWE0YWQtNTc3ZmUzNDU4NzVhIiwiZXhwIjoxNzUwNzA4MzIxfQ.cAMjuyH28twxzBnEtw6McvoYp2J16JaabRv_QMbh88U",
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
