import "./Debtor.css";

const Debtor = ({ t, name, amount, description, onDelete }) => {
  return (
    <div className="debtor">
      <h3 className="debtor__title">{name}</h3>
      <div className="debtor__info">
        <p className="debtor__description">
          {t("debtor.amount")}: <span>{amount} zł</span>
        </p>
        <p className="debtor__description">
          {t("debtor.description")}: <br /><span>{description}</span>
        </p>
      </div>
      <button className="debtor-btn" onClick={onDelete}>
        🗑️
      </button>
    </div>
  );
};

export default Debtor;
