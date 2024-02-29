import { useEffect, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DebtList from "./components/Debtors/DebtList/DebtList";
import DebtForm from "./components/Debtors/DebtForm/DebtForm";
import Footer from "./components/Footer/Footer";

// Get your language
const getLanguage = () => {
  const storedLanguage = localStorage.getItem("language") || "en";
  return storedLanguage;
};

// Get current theme
const getTheme = () => {
  const storedTheme = localStorage.getItem("isLightTheme") || false;
  return storedTheme;
};

// Get debtors
const getDebtors = () => {
  const storedDebtors = JSON.parse(localStorage.getItem("debtors")) || [];
  return storedDebtors;
};

// Application
const App = () => {
  const { t } = useTranslation();
  const [activeLng, setActiveLng] = useState(getLanguage());
  const [isLightTheme, setLightTheme] = useState(getTheme());
  const [isDebtFormOpen, setDebtFormOpen] = useState(false);
  const [debtors, setDebtors] = useState(getDebtors());

  // Toggle language
  useEffect(() => {
    const language = getLanguage();
    i18n.changeLanguage(language);
    setActiveLng(language);
  }, []);

  // Toggle theme
  useEffect(() => {
    document.body.classList.toggle("light-mode", !isLightTheme);
  }, [isLightTheme]);

  // Set debtors in local storage
  useEffect(() => {
    localStorage.setItem("debtors", JSON.stringify(debtors));
  }, [debtors]);

  // Change current theme
  const changeTheme = () => {
    setLightTheme(!isLightTheme);
    localStorage.setItem("isLightTheme", isLightTheme);
  };

  // Open / Close debt form
  const handleDebtFormOpen = () => {
    setDebtFormOpen(!isDebtFormOpen);
  };

  //   Add debtor
  const addDebtor = (name, amount, description) => {
    const newDebtor = { name, amount, description };
    setDebtors([...debtors, newDebtor]);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Navbar
        activeLng={activeLng}
        setActiveLng={setActiveLng}
        isLightTheme={isLightTheme}
        setLightTheme={changeTheme}
      />
      <header className="debtForm-toggle">
        <button
          className="btn debtForm-toggle-btn"
          onClick={() => handleDebtFormOpen()}
        >
          {isDebtFormOpen
            ? t("debtorsList.btn-back")
            : t("debtorsList.btn-add")}
        </button>
      </header>

      {!isDebtFormOpen ? (
        <DebtList t={t} debtors={debtors} setDebtors={setDebtors} />
      ) : (
        <DebtForm t={t} addDebtor={addDebtor} onSubmit={handleDebtFormOpen} />
      )}

      <Footer />
    </I18nextProvider>
  );
};

export default App;
