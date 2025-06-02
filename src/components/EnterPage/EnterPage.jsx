import React from "react";
import EnterForm from "./EnterForm";
import RegistratioImage from "../RegistrationPage/RegistrationImage";
import "../../App.css";

export default function EnterPage() {
  return (
    <div className="registration-page">
      <div className="containerForm">
        <div className="enter-form">
          <EnterForm />
        </div>
      </div>
    </div>
  );
}
