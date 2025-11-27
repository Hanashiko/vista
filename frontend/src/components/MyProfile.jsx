import React from "react";
import MainTopbarSection from "./MainTopbarSection";
import Footer from "./Footer";
import BigAvatar from "../assets/BigAvatar.png";
import UploadImage from "./UploadImage";
import UpdateForm from "./UpdateForm";

export default function MyProfile() {
  return (
    <div>
      <div className="mainProfile">
        <aside className="mainTopBar">
          <MainTopbarSection />
        </aside>
        <div className="content">
          <div className="mainProfileContainer">
            <p className="BradCrums">Головна / Мій профіль</p>
            <h1 className="MainTitle">Мій профіль</h1>
            <div className="MainContentProfile">
              <div className="ViewProfile">
                <div className="ProfileAvatar">
                  <img
                    className="ProfileAvatarImg"
                    src={BigAvatar}
                    alt="Profile Avatar"
                  />
                  <p className="ProfileAvatarText">Margo</p>
                </div>
              </div>
              <div className="ProfileInfo">
                <div className="EditProfile">
                  <h1 className="EditProfileTitle">Оновити профіль</h1>
                  <div className="EditProfileContent">
                    <UploadImage />
                    <UpdateForm />
                  </div>

                  <button type="submit" className="UploadButtonForm">
                    Оновити дані
                  </button>
                </div>
                <div className="MyHistoryQuests">
                  <h1 className="MyHistoryQuestsTitle">Моя історія квестів</h1>

                  <div className="MyHistoryQuestsContent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
