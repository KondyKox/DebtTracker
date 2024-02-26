import { useEffect, useState } from "react";
import i18n from "../../i18n";
import "./Navbar.css";

const Navbar = ({ activeLng, setActiveLng, isDarkTheme, setDarkTheme }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
  }, []);

  // Choose your language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setActiveLng(lng);
  };

  // Open / Close side menu
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="./logo.jpg" alt="Logo" />
      </div>
      {windowWidth >= 768 ? (
        <div className="nav__elements">
          <button
            className={`theme-toggle-btn btn ${!isDarkTheme ? "active" : null}`}
            onClick={setDarkTheme}
          >
            💡
          </button>
          <ul className="languages languages_list">
            <li>
              <img
                onClick={() => changeLanguage("en")}
                src="./flags/en.png"
                alt="English"
                className={activeLng === "en" ? "active" : null}
              />
            </li>
            <li>
              <img
                onClick={() => changeLanguage("pl")}
                src="./flags/pl.png"
                alt="Polski"
                className={activeLng === "pl" ? "active" : null}
              />
            </li>
          </ul>
        </div>
      ) : (
        <button onClick={handleMenuToggle} className="toggle-menu btn">
          ☰
        </button>
      )}

      {/* Mobile side menu */}
      {isMenuOpen && windowWidth < 768 && (
        <div className="mobile__nav">
          <ul className="mobile-languages languages_list">
            <li>
              <img
                onClick={() => changeLanguage("en")}
                src="./flags/en.png"
                alt="English"
                className={activeLng === "en" ? "active" : null}
              />
            </li>
            <li>
              <img
                onClick={() => changeLanguage("pl")}
                src="./flags/pl.png"
                alt="Polski"
                className={activeLng === "pl" ? "active" : null}
              />
            </li>
          </ul>

          <button
            className={`theme-toggle-btn btn ${!isDarkTheme ? "active" : null}`}
            onClick={setDarkTheme}
          >
            💡
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
