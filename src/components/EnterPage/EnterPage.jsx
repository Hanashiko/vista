import React from "react";
import EnterForm from "./EnterForm";
import RegistratioImage from "../RegistrationPage/RegistrationImage";
import "../../App.css";

export default function EnterPage() {
  return (
    <div className="registration-page">
      <div className="containerForm">
        <div className="enter-form">
          {/* <h1 className="registration">Вхід</h1>
          <p className="textOfRegistration">
            Будь ласка ведіть ваші дані аби продовжити далі.
          </p> */}
          <EnterForm />
        </div>
        {/* <RegistratioImage /> */}
      </div>
    </div>
  );
}
