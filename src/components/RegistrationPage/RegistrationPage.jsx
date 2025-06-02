import React from "react";
import RegistrationForm from "./RegistrationForm";
import RegistratioImage from "./RegistrationImage";
import "../../App.css";

export default function RegistrationPage() {
  return (
    <div className="registration-page">
      <div className="containerForm">
        <div className="registration-form">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
