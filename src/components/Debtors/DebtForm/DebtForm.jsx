import { useState } from "react";
import "./DebtForm.css";

const DebtForm = ({ t, addDebtor, onSubmit }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [contacts, setContacts] = useState([]);
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addDebtor(name, amount, contacts, description);
    setName("");
    setAmount("");
    setContacts([]);
    setDescription("");
    onSubmit();
  };

  // Add contact
  const handleAddContact = (option, value) => {
    const existingContactIndex = contacts.findIndex(
      (contact) => contact.option === option
    );

    if (existingContactIndex !== -1) {
      const updatedContacts = [...contacts];
      updatedContacts[existingContactIndex].value = value;
      setContacts[updatedContacts];
    } else setContacts([...contacts, { option, value }]);
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
      ></textarea>

      <div className="debtContacts">
        <div className="debtContact">
          <img src="./icons/messenger.png" alt="Messenger" />
          <input
            className="debtInput"
            type="text"
            placeholder="Messenger"
            onChange={(e) => handleAddContact("messenger", e.target.value)}
          />
        </div>
        <div className="debtContact">
          <img src="./icons/email.png" alt="Email" />
          <input
            className="debtInput"
            type="email"
            placeholder="Email"
            onChange={(e) => handleAddContact("email", e.target.value)}
          />
        </div>
        <div className="debtContact">
          <img src="./icons/phone.png" alt="Phone" />
          <input
            className="debtInput"
            type="tel"
            placeholder={t("contact.phone")}
            onChange={(e) => handleAddContact("phone", e.target.value)}
          />
        </div>
        <div className="debtContact">
          <img src="./icons/other.png" alt="Other" />
          <input
            className="debtInput"
            type="text"
            placeholder={t("contact.other")}
            onChange={(e) => handleAddContact("other", e.target.value)}
          />
        </div>
      </div>
      <button className="btn debt-btn" type="submit">
        {t("debtForm.add")}
      </button>
    </form>
  );
};

export default DebtForm;
