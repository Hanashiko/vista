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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ"
      );

      const response = await fetch(`http://54.89.245.167:5000/profile`, {
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
