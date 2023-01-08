import React, { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id : Math.random().toString()
        }; 
        props.onAddExpense(expenseData);
        setIsEditing(false);
    };

    const startEditingHandler = () => {
        setIsEditing(true);
    };

    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    return <div className='new-expense'>
        {!isEditing && 
        <div className='new-expense__button-div'>
            <button onClick={startEditingHandler}>Add New Expense</button> 
        </div>
        }
        {isEditing && <ExpenseForm 
        className="new-expense__expense-form" 
        onSaveExpenseData={saveExpenseDataHandler}
        onCancel={stopEditingHandler}
        />}
    </div>;
}

export default NewExpense;