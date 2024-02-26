import { useEffect, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

// Get your language
const getLanguage = () => {
  const storedLanguage = localStorage.getItem("language") || "en";
  return storedLanguage;
};

// Get current theme
const getTheme = () => {
  const storedTheme = localStorage.getItem("isDarkTheme") || true;
  return storedTheme;
};

const App = () => {
  const { t } = useTranslation();
  const [activeLng, setActiveLng] = useState(getLanguage());
  const [isDarkTheme, setDarkTheme] = useState(getTheme());

  useEffect(() => {
    const language = getLanguage();
    i18n.changeLanguage(language);
    setActiveLng(language);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("light-mode", isDarkTheme);
  }, [isDarkTheme]);

  // Change current theme
  const changeTheme = () => {
    setDarkTheme(!isDarkTheme);
    localStorage.setItem("isDarkTheme", isDarkTheme);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Navbar
        activeLng={activeLng}
        setActiveLng={setActiveLng}
        isDarkTheme={isDarkTheme}
        setDarkTheme={changeTheme}
      />
      <div>
        <h1>{t("greeting")}</h1>
        <p>{t("content")}</p>
      </div>
    </I18nextProvider>
  );
};

export default App;
