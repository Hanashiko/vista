import React from "react";
import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import EnterPage from "./components/EnterPage/EnterPage";
import MainPage from "./components/MainPage";
import CreateQuest from "./components/CreateQuest";
import MyProfile from "./components/MyProfile";
import MyQuests from "./components/MyQuests";
import EditQuest from "./components/EditQuest";
import PageOfQuest from "./components/PageOfQuest";
import JustQuest from "./components/JustQuest";
import PageOfFinishedOfQuest from "./components/PageOfFinishedOfQuest";
import MyGames from "./components/MyGames";
import GameOfPuzzle from "./components/GameOfPuzzle";
import GameOfDrop from "./components/GameOfDrop";

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
        <Route path="/mainPage/myGames" element={<MyGames />} />
        <Route path="/mainPage/myGames/puzzle" element={<GameOfPuzzle />} />
        <Route path="/mainPage/myGames/drop" element={<GameOfDrop />} />

        {/* <Route path="/mainPage/EditQuest" element={<EditQuest />} /> */}

        <Route path="/mainPage/EditQuest/:questId" element={<EditQuest />} />
        <Route
          path="/mainPage/PageOfQuest/:questId"
          element={<PageOfQuest />}
        />
        <Route
          path="/mainPage/PageOfQuest/JustQuest/:questId"
          element={<JustQuest />}
        />
        <Route
          path="/mainPage/PageOfQuest/JustQuest/PageOfFinishedOfQuest/:questId"
          element={<PageOfFinishedOfQuest />}
        />
      </Routes>
    </div>
  );
}
