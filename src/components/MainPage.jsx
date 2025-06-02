import React, { useState } from "react";
import "../App.css";
import MainTopbarSection from "./MainTopbarSection";
import Header from "./Header";
import Footer from "./Footer";
import ListQuests from "./ListQuests";
import HistoryContent from "./HistoryContent";

export default function MainPage() {
  const [searchText, setSearchText] = useState("");
  const [searchOfInfo, setSearchOfInfo] = useState("");

  return (
    <div>
      <div className="mainPage">
        <aside className="mainTopBar">
          <MainTopbarSection />
        </aside>
        <div className="content">
          <div className="container">
            <Header
              setSearchText={setSearchText}
              setSearchOfInfo={setSearchOfInfo}
            />
            <div className="MainContent">
              <ListQuests searchText={searchText} />
              <HistoryContent />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
