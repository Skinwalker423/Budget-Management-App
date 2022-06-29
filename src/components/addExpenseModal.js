import { Modal, Button, Form } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../context/BudgetsContext";
import { UNCATEGORIZED_BUDGET_ID } from "../App";

const AddExpenseModal = ({show, handleClose, defaultBudgetId}) => {
    const {addExpense, budgets} = useBudgets();

    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetIdRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value), 
            budgetId: budgetIdRef.current.value
        })
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            ref={descriptionRef}
                            type="text" 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control 
                            ref={amountRef}
                            min={0} 
                            step={.01} 
                            type="number" 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select 
                            defaultValue={defaultBudgetId}
                            ref={budgetIdRef}>
                            <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                            {budgets.map((budget) => {
                                return(
                                    <option key={budget.id} value={budget.id}>{budget.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type={'submit'} variant="primary">Add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddExpenseModal;
