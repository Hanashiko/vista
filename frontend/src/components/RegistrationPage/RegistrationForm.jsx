import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const PostOfData = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: formData.email,
        password: formData.password,
        name: formData.login,
      };

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODg5NTE2MiwianRpIjoiYTM4YWJhOWMtZmJlMC00NDk5LTgyYzgtYjQ0ZGNmY2Q5ZDExIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3NDg4OTUxNjIsImNzcmYiOiJhMzZmMTBlYS0yYzIwLTQ0N2EtYjNhNy00YzA1NTA5YTUwZWUiLCJleHAiOjE3NTE0ODcxNjJ9.JsN8GP71WaPBZgcup6eLgZkLpPOS0_owFVMNM6kG110"
      );

      const response = await fetch("http://46.63.19.144:5000/v1/register", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Помилка при відправці даних");
    } catch (error) {
      console.log("Помилка", error);
    }
  };

  return (
    <div>
      <form className="form-boxOfRegister" onSubmit={PostOfData}>
        <h1 className="FormBoxOfRegTitle">Registration</h1>

        <div className="formBoxRegister">
          <div className="FormOfOne">
            <label className="labelOne" htmlFor="login">
              Ваш логін
            </label>
            <input
              className="inputOne"
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleChange}
            />

            <label className="labelTwo" htmlFor="email">
              Ваш email
            </label>
            <input
              className="inputTwo"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="FormOfTwo">
            <label className="labelThree" htmlFor="password">
              Ваш пароль
            </label>
            <input
              className="inputThree"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <label className="labelFour" htmlFor="confirmPassword">
              Підтвердiть Ваш пароль
            </label>
            <input
              className="inputFour"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button className="register-btn" type="submit">
            Зареєструватись
          </button>

          <p className="login-link">
            Є акаунт? <Link to="/enter">Вхід</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
