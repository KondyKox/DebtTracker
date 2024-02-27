import "./DebtList.css";
import Debtor from "../Debtor/Debtor";

const DebtList = ({ t, debtors, setDebtors }) => {
  //   Delete debtor
  const handleDelete = (index) => {
    const updatedDebtors = debtors.filter((_, i) => i !== index);
    setDebtors(updatedDebtors);
  };

  return (
    <div>
      <h2 className="debtorsTitle">{t("debtorsList.title")}</h2>
      {debtors.map((debtor, index) => (
        <Debtor
          key={index}
          t={t}
          name={debtor.name}
          amount={debtor.amount}
          description={debtor.description}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </div>
  );
};

export default DebtList;
