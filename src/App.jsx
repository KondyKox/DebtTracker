import { useEffect, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DebtList from "./components/Debtors/DebtList/DebtList";
import DebtForm from "./components/Debtors/DebtForm/DebtForm";
import LoginForm from "./components/LoginForm/LoginForm";

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
  const [isLoginFormOpen, setLoginFormOpen] = useState(false);
  const [whichForm, setWhichForm] = useState(null);
  const [debtors, setDebtors] = useState(getDebtors());
  const [filteredDebtors, setFilteredDebtors] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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

  // Handle debt form & login form
  const handleFormsOpen = () => {
    if (isLoginFormOpen) handleLoginFormOpen();
    else handleDebtFormOpen();
  };

  // Open / Close debt form
  const handleDebtFormOpen = () => {
    setDebtFormOpen(!isDebtFormOpen);
  };

  // Toggle login form
  const handleLoginFormOpen = (whichForm) => {
    setLoginFormOpen(!isLoginFormOpen);
    setWhichForm(whichForm);
  };

  // Find debtor
  const findDebtor = (searchName) => {
    const filteredDebtors = debtors.filter((debtor) =>
      debtor.name.toLowerCase().includes(searchName.toLowerCase())
    );
    return filteredDebtors;
  };

  // Handle for searching debtors
  const handleSearchDebtors = (event) => {
    const searchName = event.target.value;
    setSearchValue(searchName);

    if (searchName === "") setFilteredDebtors([]);
    else {
      const foundDebtors = findDebtor(searchName);
      setFilteredDebtors(foundDebtors);
    }
  };

  //   Add debtor
  const addDebtor = (name, amount, contacts, description) => {
    const newDebtor = {
      name,
      amount,
      contacts,
      description,
    };
    setDebtors([...debtors, newDebtor]);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Navbar
        t={t}
        activeLng={activeLng}
        setActiveLng={setActiveLng}
        isLightTheme={isLightTheme}
        setLightTheme={changeTheme}
        onClick={handleLoginFormOpen}
      />
      <header>
        <button className="btn" onClick={() => handleFormsOpen()}>
          {isDebtFormOpen || isLoginFormOpen
            ? t("debtorsList.btn-back")
            : t("debtorsList.btn-add")}
        </button>
        {!isDebtFormOpen ? (
          <input
            type="text"
            placeholder={t("debtorsList.search")}
            onChange={handleSearchDebtors}
          />
        ) : null}
      </header>

      {!isDebtFormOpen ? (
        !isLoginFormOpen ? (
          <DebtList
            t={t}
            debtors={
              searchValue.length > 0
                ? filteredDebtors.length > 0
                  ? filteredDebtors
                  : []
                : debtors
            }
            setDebtors={setDebtors}
          />
        ) : (
          <LoginForm t={t} form={whichForm} />
        )
      ) : (
        <DebtForm t={t} addDebtor={addDebtor} onSubmit={handleDebtFormOpen} />
      )}
    </I18nextProvider>
  );
};

export default App;
