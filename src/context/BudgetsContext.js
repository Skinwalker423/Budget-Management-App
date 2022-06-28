import React, { Provider, createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const defaultValues = {
    budgets: 0,
}

const BudgetsContext = React.createContext(defaultValues);

export function useBudgets(){
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({children}) => {

    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])

    const getBudgetExpenses = (budgetId) => {
        return expenses.filter((expense) => expense.budgetId === budgetId )
    }
    const addExpense = ({name, amount, max}) => {
        setExpenses((prevExpense) => {
            return [...prevExpense, {budgetId: uuidv4(), amount, description}]
         })
    }
    const addBudget = ({name, max}) => {
        if(prevBudget.find((budget) => budget.name === name )){
            return prevBudget;
        }
        setBudgets(prevBudget => {
            return [...prevBudget, {id: uuidv4(), name, max } ]
        })
    }
    const deleteBudget = () => {} 
    const deleteExpense = () => {}

    const value = {budgets, expenses, getBudgetExpenses, addExpense, addBudget, deleteBudget, deleteExpense }
    return <BudgetsContext.Provider value={{value}}>{children}</BudgetsContext.Provider>
}