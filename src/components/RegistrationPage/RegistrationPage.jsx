import React from "react";
import RegistrationForm from "./RegistrationForm";
import RegistratioImage from "./RegistrationImage";
import "../../App.css";

export default function RegistrationPage() {
  return (
    <div className="registration-page">
      <div className="containerForm">
        <div className="registration-form">
          {/* <h1 className="registration">Реєстрація</h1>
          <p className="textOfRegistration">
            Будь ласка ведіть ваші дані аби продовжити далі.
          </p> */}
          <RegistrationForm />
        </div>
        {/* <RegistratioImage /> */}
      </div>
    </div>
  );
}
