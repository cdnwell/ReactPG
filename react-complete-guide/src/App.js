import React, { useState } from 'react';
import './App.css';

import NewExpense from './components/NewExpense/NewExpense';
import Expenses from './components/Expenses/Expenses'

const DUMMY_EXPENSES = [
  {
    id : 'e1',
    title : 'Car Insurance costs',
    amount : '213.24',
    date : new Date('2022-01-02 00:00:00')
  },
  {
    id : 'e2',
    title : 'Subway costs',
    amount : '10.21',
    date : new Date(2022,11,12)
  },
  {
    id : 'e3',
    title : 'food buying',
    amount : '300.1',
    date : new Date(2022,10,11)
  },
  {
    id : 'e4',
    title : 'building repairing',
    amount : '250',
    date : new Date(2021,11,10)
  },
  {
    id : 'e5',
    title : 'touring',
    amount : '550.12',
    date : new Date(2021,5,10)
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = expense => {
    setExpenses((prevExpenses)=>{
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses}/>
    </div>
  );

  // return React.createElement(
  //   'div',
  //   {},  // div의 속성을 의미한다. 속성이 없으므로 빈칸
  //   React.createElement('h2', {}, "Let's get started!"),
  //   React.createElement(Expenses, {items : expenses}) // 안에 컨텐츠가 없으므로 세 번째 자리는 없어도 된다.
  // );
}

export default App;
