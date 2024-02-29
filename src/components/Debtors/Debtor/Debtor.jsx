import { useState } from "react";
import "./Debtor.css";

const Debtor = ({ t, debtor, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(debtor.name);
  const [editedAmount, setEditedAmount] = useState(debtor.amount);
  const [editedDescription, setEditedDescription] = useState(
    debtor.description
  );

  // Handle save debtor
  const handleSave = () => {
    const editedDebtor = {
      name: editedName,
      amount: editedAmount,
      description: editedDescription,
    };

    onEdit(editedDebtor);
    setEditing(false);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditedName(debtor.name);
    setEditedAmount(debtor.amount);
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
          <p className="debtor__description">
            {t("debtor.amount")}:
            <input
              type="number"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
            />
            zł
          </p>
          <p className="debtor__description">
            {t("debtor.description")}: <br />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            ></textarea>
          </p>
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
            <p className="debtor__description">
              {t("debtor.amount")}: <span>{debtor.amount} zł</span>
            </p>
            <p className="debtor__description">
              {t("debtor.description")}: <br />
              <span>{debtor.description}</span>
            </p>
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
