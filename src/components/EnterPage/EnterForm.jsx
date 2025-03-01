import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    EnterOfEmail: "",
    EnterOfPassword: "",
  });

  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleClick = () => {

  //   navigate("/mainPage");
  // };

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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczOTk2OTYxMiwianRpIjoiNTFlNTNmMGUtZGJlMS00YjZmLTgyZjYtOGFjY2UyMjZiNzU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3Mzk5Njk2MTIsImNzcmYiOiI2NmU0NjJhNS1jMGZkLTRmN2EtOGYxNS1hZDljYmEwYTJkODYiLCJleHAiOjE3NDI1NjE2MTJ9.1q6B7-rzchZgUwTEf_rBY5-No-7D6qDqk4ynbeO0neQ"
      );

      const response = await fetch("http://54.89.245.167:5000/login", {
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
            // placeholder="vista@gmail.com"
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
            // placeholder="********"
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
