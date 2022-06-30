import { Modal, Button, Form } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../context/BudgetsContext";

const AddBudgetModal = ({show, handleClose}) => {

    const {addBudget} = useBudgets();

    const nameRef = useRef();
    const maxAmountRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        addBudget({
            name: nameRef.current.value, 
            max: parseFloat(maxAmountRef.current.value)
        })
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            ref={nameRef}
                            type="text" 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>Max Spending</Form.Label>
                        <Form.Control 
                            ref={maxAmountRef}
                            min={0} 
                            step={.01} 
                            type="number" 
                            required 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type={'submit'} variant="primary">Add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddBudgetModal;
