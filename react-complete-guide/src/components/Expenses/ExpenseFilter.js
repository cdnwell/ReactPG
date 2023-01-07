import { useState } from 'react';
import Card from '../UI/Card';

import './ExpenseFilter.css';

const ExpenseFilter = (props) => {
    const [selectedYear, setSelectedYear] = useState('');

    const changeHandler = event => {
        props.onChangeYear(event.target.value);
    };

    return (
        <Card className="expense-filter__card">
            <div></div>
            <select value={props.selected} className='expense-filter__select' onChange={changeHandler}>
                <option value='2020'>2020</option>
                <option value='2021'>2021</option>
                <option value='2022'>2022</option>
            </select>
        </Card>
    );
};

export default ExpenseFilter;