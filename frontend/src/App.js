// import "./App.css";
// import RegistrationPage from "./components/RegistrationPage";
// // import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//       <RegistrationPage />
//     </div>
//   );
// }

// export default App;

// ------------------------

import React from "react";
import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
// import RegistrationPage from "./RegistrationPage.js";
import EnterPage from "./components/EnterPage/EnterPage";
import MainPage from "./components/MainPage";
import CreateQuest from "./components/CreateQuest";
import MyProfile from "./components/MyProfile";
import MyQuests from "./components/MyQuests";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/enter" element={<EnterPage />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/mainPage/createQuest" element={<CreateQuest />} />
        <Route path="/mainPage/myProfile" element={<MyProfile />} />
        <Route path="/mainPage/myQuests" element={<MyQuests />} />
      </Routes>
    </div>
  );
}
