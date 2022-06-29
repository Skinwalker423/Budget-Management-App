import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, ProgressBar, Stack} from "react-bootstrap";
import { currencyFormatter } from "../utils/currencyFormatter";
import AddButtonModal from './addButtonModal';


export default function BudgetCard({name, max, amount, gray, onAddExpenseClick}) {

    const className = []
    if(amount > max){
        className.push('bg-danger', 'bg-opacity-10')
    } else if (gray){
        className.push('bg-light')
    }

    const getProgressBarVariant = (amount, max) => {
        const ratio = amount / max;
        if(ratio < .50) return 'primary'
        if(ratio < .75) return 'warning'
        return 'danger'
    }



    return(

        <Card>
            <Card.Body className={className}>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{name}</div>
                    <div className='d-flex align-items-baseline'>{currencyFormatter.format(amount)} / <span className='fs-6 text-muted'>{currencyFormatter.format(max)}</span></div>
                </Card.Title> 
                <ProgressBar variant={getProgressBarVariant(amount, max)} className='my-3 rounded-pill' min={0} max={max} now={(amount)} label={`${(amount/max) * 100}%`} />
                <Stack direction={'horizontal'} className='d-flex justify-content-end'>
                    <Button onClick={onAddExpenseClick}  variant='outline-primary'>Add Expense</Button>
                    <Button  variant='outline-secondary'>View Expense</Button>
                </Stack>
            </Card.Body>
        </Card>
    )
}
