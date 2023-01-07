import React from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id : Math.random().toString()
        }; 
        props.onAddExpense(expenseData);
    };

    return <div className='new-expense'>
        <ExpenseForm className="new-expense__expense-form" onSaveExpenseData={saveExpenseDataHandler}/>
    </div>;
}

export default NewExpense;