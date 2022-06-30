import BudgetCard from "./budgetCard";
import { UNCATEGORIZED_BUDGET_ID } from "../App";
import { useBudgets } from "../context/BudgetsContext";


const UncategorizedCard = (props) => {

    const {getBudgetExpenses} = useBudgets();

    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
          (total, exp) => total + exp.amount, 0);;



    if(amount === 0){
        return null;
    }

    return (
        <BudgetCard
            amount={amount}
            gray
            name={'Uncategorized'}
            {...props}
         />
    )
}

export default UncategorizedCard;