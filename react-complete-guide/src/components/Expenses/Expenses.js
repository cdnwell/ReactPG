import { useState } from 'react';

import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import ExpenseFilter from './ExpenseFilter';

import './Expenses.css';

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2021');

  const changeYearHandler = (selectedYearData) => {
    setFilteredYear(selectedYearData);
  };

  return (
    <div className="expenses">
      <ExpenseFilter selected={filteredYear} onChangeYear={changeYearHandler} />
      <Card className="expenses__card">
        {props.items.filter(expense => expense.date.getFullYear() == filteredYear ? true : false ).map( (expense, index) => 
        <ExpenseItem 
          key={expense.id}
          title={expense.title} 
          amount={expense.amount} 
          date={expense.date} 
        />)}
      </Card>
    </div>
  );
}

export default Expenses;
