import { useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import "./App.css";

const App = () => {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <div>
        <h1>{t("greeting")}</h1>
        <p>{t("content")}</p>
      </div>
    </I18nextProvider>
  );
};

export default App;
