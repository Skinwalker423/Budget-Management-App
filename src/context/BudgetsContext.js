import React, { Provider, createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";


export const BudgetsContext = React.createContext();

export function useBudgets(){
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({children}) => {

    const [budgets, setBudgets] = useLocalStorage('budgets', [])
    const [expenses, setExpenses] = useLocalStorage('expenses', [])

    const getBudgetExpenses = (budgetId) => {
        return expenses.filter((expense) => expense.budgetId === budgetId )
    }
    const addExpense = ({description, amount, budgetId}) => {
        setExpenses((prevExpense) => {
            return [...prevExpense, {id: uuidv4(), amount, description, budgetId}]
         })
    }
    const addBudget = ({name, max}) => {
        setBudgets(prevBudgets => {
            if(prevBudgets.find((budget) => budget.name === name )){
                return prevBudgets;
            }
            return [...prevBudgets, {id: uuidv4(), name, max } ]
        })
    }
    const deleteBudget = ({id}) => {
        setBudgets((prevBudgets) => {
            return prevBudgets.filter((budget) => {
                return budget.id !== id;
            })
        })
    } 
    const deleteExpense = ({id}) => {
        //TODO deal with uncategorized expenses
        setExpenses(prevExpenses => {
            return prevExpenses.filter((expense) => {
                return expense.id !== id;
            })
        })
    }

    const value = {budgets, expenses, getBudgetExpenses, addExpense, addBudget, deleteBudget, deleteExpense }
    return (
        <BudgetsContext.Provider value={value}>{children}</BudgetsContext.Provider>
    )
}