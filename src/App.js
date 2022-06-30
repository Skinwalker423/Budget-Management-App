import { Button, Stack} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import BudgetCard from './components/budgetCard';
import AddBudgetModal from './components/addBudgetModal';
import AddExpenseModal from './components/addExpenseModal';
import ViewExpenseModal from './components/viewExpenseModal';
import { useState } from 'react';
import { useBudgets } from './context/BudgetsContext';
import UncategorizedCard from './components/UncategorizedCard';
import TotalBudgetCard from './components/TotalBudgetCard';


export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState('');
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState('');

  const {budgets, getBudgetExpenses} = useBudgets();

  const openAddExpenseModal = (budgetId) => {
      setShowAddExpenseModal(true);
      setAddExpenseModalBudgetId(budgetId);
  }
  // const openViewExpenseModal = (budgetId) => {
  //     setViewExpenseModal(true);
  //     setAddExpenseModalBudgetId(budgetId);
  // }

  return (
  <Container className='my-5'>
    <Stack direction='horizontal' className="mb-4" gap='2'>
      <h1 className='me-auto'>Budgets</h1>
      <Button onClick={() => setShowAddBudgetModal(true)} variant="primary">Add Budget</Button>
      <Button onClick={openAddExpenseModal} variant="outline-primary">Add Expense</Button>
    </Stack>
    <div style={{
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: '1rem', 
      alignItems: 'flex-start' 
      }}>
      {budgets.map(({ max, name, id}) => {

        const amount = getBudgetExpenses(id).reduce(
          (total, exp) => total + exp.amount, 0);

          return (
            <BudgetCard 
              key={id}
              name={name}
              max={max}
              amount={amount}
              onAddExpenseClick={() => openAddExpenseModal(id)}
              onViewExpenseClick={() => setViewExpenseModalBudgetId(id)}
            />
          )
      })}
      {<UncategorizedCard 
        onAddExpenseClick={() => openAddExpenseModal()} 
        onViewExpenseClick={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
      />}
      {<TotalBudgetCard />}
      
    </div>
    {<AddBudgetModal 
      show={showAddBudgetModal} 
      handleClose={() => {
        setShowAddBudgetModal(false);
      }} />}
    {<AddExpenseModal 
      show={showAddExpenseModal} 
      handleClose={() => {
        setShowAddExpenseModal(false);
        setAddExpenseModalBudgetId(null);
      }}
      defaultBudgetId={addExpenseModalBudgetId}
    />}
    {<ViewExpenseModal 
      handleClose={() => {
        setViewExpenseModalBudgetId(null);
      }}
      budgetId={viewExpenseModalBudgetId}
    />}
  
  </Container>
  )
}

export default App;
