import { useState } from "react";
import "./DebtForm.css";

const DebtForm = ({ t, addDebtor, onSubmit }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [contactOption, setContactOption] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addDebtor(
      name,
      amount,
      [{ option: contactOption, value: contactValue }],
      description
    );
    setName("");
    setAmount("");
    setContactOption("");
    setContactValue("");
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
      <div className="debtContact">
        <select
          id="contact"
          value={contactOption}
          onChange={(e) => setContactOption(e.target.value)}
        >
          <option value=""></option>
          <option value="messenger">messenger</option>
          <option value="email">email</option>
          <option value="phone">phone</option>
          <option value="other">other</option>
        </select>
        <input
          className="debtInput"
          type="text"
          placeholder={t("debtForm.contact")}
          value={contactValue}
          onChange={(e) => setContactValue(e.target.value)}
        />
      </div>
      <textarea
        className="debtInput"
        placeholder={t("debtForm.description")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button className="btn debt-btn" type="submit">
        {t("debtForm.add")}
      </button>
    </form>
  );
};

export default DebtForm;
