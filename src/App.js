import { Button, Stack} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import BudgetCard from './components/budgetCard';
import AddButtonModal from './components/addButtonModal';
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
  const [viewExpenseModal, setViewExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState('');
  const {budgets, getBudgetExpenses, expenses} = useBudgets();

  const openAddExpenseModal = (budgetId) => {
      setShowAddExpenseModal(true);
      setAddExpenseModalBudgetId(budgetId);
  }
  const openViewExpenseModal = (budgetId) => {
      setViewExpenseModal(true);
      setAddExpenseModalBudgetId(budgetId);
  }



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
              onViewExpenseClick={() => openViewExpenseModal(id)}
            />
          )
      })}
      {<UncategorizedCard 
        onAddExpenseClick={() => openAddExpenseModal()} 
        onViewExpenseClick={() => openViewExpenseModal(UNCATEGORIZED_BUDGET_ID)}
      />}
      {<TotalBudgetCard />}
    </div>
    {<AddButtonModal 
      show={showAddBudgetModal} 
      handleClose={() => {
        setShowAddBudgetModal(false);
      }} />}
    {<AddExpenseModal 
      show={showAddExpenseModal} 
      handleClose={() => {
        setShowAddExpenseModal(false);
      }}
      defaultBudgetId={addExpenseModalBudgetId}
    />}
    {<ViewExpenseModal 
      show={viewExpenseModal} 
      handleClose={() => {
        setViewExpenseModal(false);
      }}
      budgetId={addExpenseModalBudgetId}
    />}
  
  </Container>
  )
}

export default App;
