import { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ t, form }) => {
  const [whichForm, setWhichForm] = useState(form);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (whichForm === "register") {
      setWhichForm("login");
      return;
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (whichForm === "login") {
      setWhichForm("register");
      return;
    }
  };

  return (
    <form className="loginForm">
      <h2 className="login__title">{t(`user.${whichForm}`)}</h2>
      <input
        className="login__input"
        type="text"
        placeholder={t(`user.username`)}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="login__input"
        type="password"
        placeholder={t("user.password")}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {whichForm === "register" ? (
        <input
          className="login__input"
          type="password"
          placeholder={t("user.repPass")}
          onChange={(e) => setRepPassword(e.target.value)}
          required
        />
      ) : null}
      <div className="login__btn-container">
        <button
          className={`btn loginForm__btn ${
            whichForm === "login" ? "active" : null
          }`}
          onClick={handleLogin}
        >
          {t(`user.login`)}
        </button>
        <button
          className={`btn loginForm__btn ${
            whichForm === "register" ? "active" : null
          }`}
          onClick={handleRegister}
        >
          {t(`user.register`)}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
