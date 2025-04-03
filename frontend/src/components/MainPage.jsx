import React from "react";
import "../App.css";
import MainTopbarSection from "./MainTopbarSection";
import Header from "./Header";
import Footer from "./Footer";
import ListQuests from "./ListQuests";
import HistoryContent from "./HistoryContent";

export default function MainPage() {
  return (
    <div>
      <div className="mainPage">
        <aside className="mainTopBar">
          <MainTopbarSection />
        </aside>
        <div className="content">
          <div className="container">
            <Header />
            <div className="MainContent">
              <ListQuests />
              <HistoryContent />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
