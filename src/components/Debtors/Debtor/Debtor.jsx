import { useState } from "react";
import "./Debtor.css";

const Debtor = ({ t, debtor, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(debtor.name);
  const [editedAmount, setEditedAmount] = useState(debtor.amount);
  const [editedContacts, setEditedContacts] = useState(debtor.contacts);
  const [editedDescription, setEditedDescription] = useState(
    debtor.description
  );

  // Handle contact change
  const handleContactChange = (index, value) => {
    const updatedContacts = [...editedContacts];
    updatedContacts[index] = { ...updatedContacts[index], value };
    setEditedContacts(updatedContacts);
  };

  // Handle save debtor
  const handleSave = () => {
    const editedDebtor = {
      name: editedName,
      amount: editedAmount,
      contacts: editedContacts,
      description: editedDescription,
    };

    onEdit(editedDebtor);
    setEditing(false);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditedName(debtor.name);
    setEditedAmount(debtor.amount);
    setEditedContacts(debtor.contacts);
    setEditedDescription(debtor.description);
    setEditing(false);
  };

  return (
    <div className="debtor">
      {editing ? (
        <div className="debtor__edit">
          <h3 className="debtor__title">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </h3>
          <div className="debtor__description">
            {t("debtor.amount")}:
            <input
              type="number"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
            />
            zł
          </div>
          <div className="debtor__description debtor__contact">
            {t("contact.contact")}:
            <ul className="debtor__edit-contacts">
              {editedContacts &&
                editedContacts.map((contact, index) => (
                  <li key={index} className="debtor__contact-option">
                    <img
                      src={`./icons/${contact.option}.png`}
                      alt={contact.option}
                    />
                    <input
                      type="text"
                      value={editedContacts[index].value}
                      onChange={(e) =>
                        handleContactChange(index, e.target.value)
                      }
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div className="debtor__description">
            {t("debtor.description")}: <br />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="debtor-btn-container">
            <button className="debtor-btn" onClick={handleSave}>
              <img src="./btn/save.png" alt={t("debtor.save")} />
            </button>
            <button className="debtor-btn" onClick={handleCancelEdit}>
              <img src="./btn/cancel.png" alt={t("debtor.cancel")} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="debtor__title">{debtor.name}</h3>
          <div className="debtor__info">
            <div className="debtor__description">
              {t("debtor.amount")}: <span>{debtor.amount} zł</span>
            </div>
            <div className="debtor__description debtor__contact">
              {t("contact.contact")}: <br />
              <ul>
                {debtor.contacts &&
                  debtor.contacts.map((contact, index) => (
                    <li key={index} className="debtor__contact-option">
                      <img
                        src={`./icons/${contact.option}.png`}
                        alt={contact.option}
                      />
                      <span>{contact.value}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="debtor__description">
              {t("debtor.description")}: <br />
              <span>{debtor.description}</span>
            </div>
          </div>

          <div className="debtor-btn-container">
            <button className="debtor-btn" onClick={onDelete}>
              <img src="./btn/delete.png" alt={t("debtor.delete")} />
            </button>
            <button className="debtor-btn" onClick={() => setEditing(true)}>
              <img src="./btn/edit.png" alt={t("debtor.edit")} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Debtor;
