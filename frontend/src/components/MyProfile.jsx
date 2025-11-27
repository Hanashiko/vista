import { React, useState, useEffect } from "react";
import MainTopbarSection from "./MainTopbarSection";
import Footer from "./Footer";
import BigAvatar from "../assets/BigAvatar.png";
import UploadImage from "./UploadImage";
import UpdateForm from "./UpdateForm";
import MyHistoryQuests from "./MyHistoryQuests";

export default function MyProfile() {
  const [infoProfile, setinfoProfile] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllQuests();
    };
    fetchData();
  }, []);

  const fetchAllQuests = async () => {
    try {
      const headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs"
      );

      const response = await fetch(`http://localhost:5000/v1/profile`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) throw new Error("Помилка при отриманні даних");

      const data = await response.json();

      setinfoProfile(data);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  return (
    <div>
      <div className="mainProfile">
        <aside className="mainTopBar">
          <MainTopbarSection />
        </aside>
        <div className="content">
          <div className="mainProfileContainer">
            <p className="BradCrumsForMyProfile">Головна / Мій профіль</p>
            <h1 className="MainTitle">Мій профіль</h1>
            <div className="MainContentProfile">
              <div className="ViewProfile">
                <div className="ProfileAvatar">
                  <img
                    className="ProfileAvatarImg"
                    src={infoProfile.avatar}
                    alt="Profile Avatar"
                  />
                  <p className="ProfileAvatarText">{infoProfile.name}</p>
                </div>
              </div>
              <div className="ProfileInfo">
                <div className="EditProfile">
                  <h1 className="EditProfileTitle">Оновити профіль</h1>
                  <div className="EditProfileContent">
                    <UploadImage />
                    <UpdateForm />
                  </div>
                </div>
                <MyHistoryQuests />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
