import React from "react";
import MainTopbarSection from "./MainTopbarSection";
import Header from "./Header";
import Footer from "./Footer";

export default function MyQuests() {
  return (
    <div>
      <div className="mainQuests">
        <aside className="mainTopBar">
          <MainTopbarSection />
        </aside>
        <div className="content">
          <div className="container">
            <p className="BradCrums">Головна / Мої квести</p>
            <Header />
            <div className="MainContentQuests"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
