import { useState } from "react";
import "./DebtForm.css";

const DebtForm = ({ t, addDebtor, onSubmit }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addDebtor(name, amount, description);
    setName("");
    setAmount("");
    setDescription("");
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{t("debtForm.title")}</h2>
      <div className="debtInputs">
        <input
          className="debtInput"
          type="text"
          placeholder={t("debtForm.name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="debtInput"
          type="number"
          placeholder={t("debtForm.amount")}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <textarea
        className="debtInput"
        placeholder={t("debtForm.description")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button className="btn debt-btn" type="submit" onSubmit={() => onClick()}>
        {t("debtForm.add")}
      </button>
    </form>
  );
};

export default DebtForm;
