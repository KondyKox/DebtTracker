import "./DebtList.css";
import Debtor from "../Debtor/Debtor";

const DebtList = ({ t, debtors, setDebtors }) => {
  //   Delete debtor
  const handleDelete = (index) => {
    const updatedDebtors = debtors.filter((_, i) => i !== index);
    setDebtors(updatedDebtors);
  };

  // Edit debtor
  const handleEdit = (index, editedDebtor) => {
    const updatedDebtors = debtors.map((debtor, idx) => {
      if (idx === index) return editedDebtor;

      return debtor;
    });
    setDebtors(updatedDebtors);
  };

  return (
    <div>
      {debtors.length === 0 ? (
        <div className="no-debtors">
          <h2 className="debtorsTitle">{t("debtorsList.no-debtors")}</h2>
        </div>
      ) : (
        <div className="debtors">
          <h2 className="debtorsTitle">{t("debtorsList.title")}</h2>
          {debtors.map((debtor, index) => (
            <Debtor
              key={index}
              t={t}
              debtor={debtor}
              onDelete={() => handleDelete(index)}
              onEdit={(updatedDebtor) => handleEdit(index, updatedDebtor)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DebtList;
