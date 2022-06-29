import { Modal, Button, Form } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../context/BudgetsContext";
import { Card } from "react-bootstrap";
import { currencyFormatter } from "../utils/currencyFormatter";

const ViewExpenseModal = ({show, handleClose, budgetId}) => {

    const {getBudgetExpenses} = useBudgets();


    const viewExpenses = getBudgetExpenses(budgetId);



    return (
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Expenses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewExpenses.map(({amount, description, id}) => {
                        return (
                        <Card key={id}>
                            <Card.Body>
                                <Card.Title>{description}</Card.Title>
                                <Card.Text>
                                    {currencyFormatter.format(amount)}
                                </Card.Text>
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
