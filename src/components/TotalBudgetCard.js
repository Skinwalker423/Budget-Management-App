import BudgetCard from "./budgetCard";
import { useBudgets } from "../context/BudgetsContext";

const TotalBudgetCard = (props) => {

    const {expenses, budgets} = useBudgets();

    
    const totalExpenses = expenses.reduce((total, exp) => total + exp.amount, 0);
    const totalBudget = budgets.reduce((total, budget) => total + budget.max, 0);
    


    if(totalExpenses === 0){
        return null;
    }

    return (
        <BudgetCard
            amount={totalExpenses}
            gray
            name={'Total'}
            {...props}
            max={totalBudget}
            hideButtons
         />
    )
}

export default TotalBudgetCard;