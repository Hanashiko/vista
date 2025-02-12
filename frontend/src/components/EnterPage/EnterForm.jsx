import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/mainPage");
  };

  return (
    <div>
      <form className="form-box" onSubmit={handleClick}>
        <label className="label" htmlFor="email">
          Ваш email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="vista@gmail.com"
        />

        <label className="label" htmlFor="password">
          Ваш пароль
        </label>
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
        />

        <button className="submit-btn" type="submit">
          Вхід
        </button>

        <p className="login-link">
          Нема акаунту? <Link to="/">Зареєструватись</Link>
        </p>
      </form>
    </div>
  );
}
