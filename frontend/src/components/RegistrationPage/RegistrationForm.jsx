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

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className="form-box" onSubmit={handleClick}>
        <label className="label" htmlFor="login">
          Ваш логін
        </label>
        <input
          className="input"
          type="text"
          id="login"
          name="login"
          value={formData.login}
          onChange={handleChange}
          placeholder="vista..."
        />

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

        <label className="label" htmlFor="confirmPassword">
          Підтвердiть Ваш пароль
        </label>
        <input
          className="input"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="********"
        />

        <button className="submit-btn" type="submit">
          Зареєструватись
        </button>

        <p className="login-link">
          Є акаунт? <Link to="/enter">Вхід</Link>
        </p>
      </form>
    </div>
  );
}
