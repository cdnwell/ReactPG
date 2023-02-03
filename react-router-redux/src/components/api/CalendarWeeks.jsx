import classes from './CalendarWeeks.module.css';

const CalendarWeeks = (props) => {
    return (
        <div className={classes.calendar_weeks}>
            {props.children}
        </div>
    );
};

export default CalendarWeeks;