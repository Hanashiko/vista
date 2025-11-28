import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    EnterOfEmail: "",
    EnterOfPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const PostOfInfo = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: formData.EnterOfEmail,
        password: formData.EnterOfPassword,
      };
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2NDI4NzA2OSwianRpIjoiNTRmMTAzZGEtODdmOS00YTEzLTliMWQtMjZkNTgxMDdmODJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NjQyODcwNjksImNzcmYiOiJkMzY3NTRhMy0xZmRiLTQ5NDQtYTA1ZS05YjEwNmZmOTZlMWUiLCJleHAiOjE3NjY4NzkwNjl9.0awDXiU1Ebiqupe4FcHdLBGET0R6h_FVKiX-Adc4GQs"
      );

      const response = await fetch("http://localhost:5000/v1/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Невірний email або пароль");
      }

      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
      alert("Вхід успішний!");
    } catch (error) {
      console.log("Помилка", error);
    }
  };

  return (
    <div>
      <form className="form-box" onSubmit={PostOfInfo}>
        <h1 className="FormBoxOfLogTitle">Login</h1>
        <div className="formBoxOfContent">
          <label className="labelOne" htmlFor="email">
            Ваш email
          </label>
          <input
            className="inputOne"
            type="email"
            id="email"
            name="EnterOfEmail"
            required
            value={formData.EnterOfEmail}
            onChange={handleChange}
          />

          <label className="labelTwo" htmlFor="password">
            Ваш пароль
          </label>
          <input
            className="inputTwo"
            type="password"
            id="password"
            name="EnterOfPassword"
            required
            value={formData.EnterOfPassword}
            onChange={handleChange}
          />

          <button className="submit-btn" type="submit">
            <Link to="/mainPage"> Вхід</Link>
          </button>

          <div className="login-linkTextDiv">
            <p className="login-linkText">
              <span className="EnterOfLoginText">Нема акаунту?</span>
              <span className="link">
                <Link className="login-link" to="/">
                  Зареєструватись
                </Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
