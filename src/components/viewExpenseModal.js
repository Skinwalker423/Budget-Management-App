import { Modal, Button, Stack } from "react-bootstrap";
import { useBudgets } from "../context/BudgetsContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import { UNCATEGORIZED_BUDGET_ID } from "../App";

const ViewExpenseModal = ({handleClose, budgetId}) => {

    

    const {getBudgetExpenses, deleteExpense, budgets, deleteBudget} = useBudgets();


    const viewExpenses = getBudgetExpenses(budgetId);
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? {
        name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID
    } : budgets.find((budget) => budgetId === budget.id);

    if(!budget){
        return;
    }

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {budget.name}</div>
                        <Button onClick={() => {
                            deleteBudget(budget);
                            console.log(`deleted ${budget.name}`)
                        }} variant="danger">Delete</Button>
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {viewExpenses.map(({amount, description, id}) => {
                    return (
                    <Stack key={id} direction="horizontal" gap="3" className="mb-3">
                        <div className="me-auto fs-4" >{description}</div>
                        <div className="fs-5">{currencyFormatter.format(amount)}</div>
                        <Button size="sm" variant="outtine-danger" onClick={() => {
                            deleteExpense({id});
                            console.log('deleted');
                        }} className="border">&times;</Button>
                    </Stack>
                    )
                })}
            </Modal.Body>
        </Modal>
    )
}

export default ViewExpenseModal;




// {budgetId !== UNCATEGORIZED_BUDGET_ID && 
//                         <Button 
//                             variant="danger"
//                             onClick={() => deleteBudget(budget)}
//                         >Delete Budget
//                         </Button>}


// <div className="d-flex justify-content-end">
                                // <Button variant="danger"  type={'button'} onClick={() => {
                                //     deleteExpense({id});
                                //     console.log('deleted');
//                                 }}>Delete Expense</Button>
//                             </div>