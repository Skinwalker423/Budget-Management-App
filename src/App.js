import { Button, Stack} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import BudgetCard from './components/budgetCard';

function App() {



  return (
  <Container className='my-5'>
    <Stack direction='horizontal' className="mb-4" gap='2'>
      <h1 className='me-auto'>Budgets</h1>
      <Button variant="primary">Add Budget</Button>
      <Button variant="outline-primary">Add Expense</Button>
    </Stack>
    <div style={{
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: '1rem', 
      alignItems: 'flex-start' 
      }}>
      <BudgetCard name={'Entertainment'} max={1000} amount={500} gray={true} />
    </div>
  </Container>
  );
}

export default App;
