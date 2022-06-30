import { Modal, Button, Form, Stack } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../context/BudgetsContext";
import { Card } from "react-bootstrap";
import { currencyFormatter } from "../utils/currencyFormatter";
import { UNCATEGORIZED_BUDGET_ID } from "../App";

const ViewExpenseModal = ({show, handleClose, budgetId}) => {

    

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
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && 
                        <Button 
                            variant="danger"
                            onClick={() => deleteBudget(budget)}
                        >Delete Budget
                        </Button>}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {viewExpenses.map(({amount, description, id}) => {
                    return (
                    <Card key={id}>
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <Card.Title>{description}</Card.Title>
                                <Card.Text>
                                    {currencyFormatter.format(amount)}
                                </Card.Text>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Button variant="danger"  type={'button'} onClick={() => {
                                    deleteExpense({id});
                                    console.log('deleted');
                                }}>Delete Expense</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <p>footer</p>
            </Modal.Footer>
        </Modal>
    )
}

export default ViewExpenseModal;
