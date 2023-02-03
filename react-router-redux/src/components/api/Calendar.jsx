import { useEffect } from "react";
import { useState } from "react";

import classes from "./Calendar.module.css";
import CalendarWeeks from "./CalendarWeeks";

const Calendar = () => {
  const [today, setToday] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateArray, setDateArray] = useState([]);
  const [weeksCount, setWeeksCount] = useState(0);

  useEffect(() => {
    let selectedFirstDate = new Date(selectedDate);
    selectedFirstDate.setDate(1);
    let selectedFirstDay = selectedFirstDate.getDay();
    selectedFirstDate.setDate(-selectedFirstDay + 1); // 달력의 첫 번째 일

    let totalDateCount = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );
    let calendarLastDay = totalDateCount.getDay();
    let lastDate = totalDateCount.getDate();
    let lastDayCal = 6 - calendarLastDay;
    let firstDayCal = selectedFirstDay;

    let totalDate = lastDate + firstDayCal + lastDayCal; // 표시되는 전체 날짜
    let dividedWeeksTotal = totalDate / 7; // 표시되는 전체 날짜를 1주(7일)로 나눈 값
    let firstDate = selectedFirstDate;

    const array = [];

    for (let i = 0; i < totalDate; i++) {
      array.push(new Date(firstDate));
      firstDate.setDate(firstDate.getDate() + 1);
    }

    let weekArray = [];

    for (let i = 0; i < dividedWeeksTotal; i++) {
      weekArray.push(
        <CalendarWeeks key={i}>
          <div onClick={() => setSelectedDate(new Date(array[0 + i * 7]))}>{array[0 + i * 7].getDate()}</div>
          <div onClick={() => setSelectedDate(new Date(array[1 + i * 7]))}>{array[1 + i * 7].getDate()}</div>
          <div onClick={() => setSelectedDate(new Date(array[2 + i * 7]))}>{array[2 + i * 7].getDate()}</div>
          <div onClick={() => setSelectedDate(new Date(array[3 + i * 7]))}>{array[3 + i * 7].getDate()}</div>
          <div onClick={() => setSelectedDate(new Date(array[4 + i * 7]))}>{array[4 + i * 7].getDate()}</div>
          <div onClick={() => setSelectedDate(new Date(array[5 + i * 7]))}>{array[5 + i * 7].getDate()}</div>
          <div onClick={() => setSelectedDate(new Date(array[6 + i * 7]))}>{array[6 + i * 7].getDate()}</div>
        </CalendarWeeks>
      );
    }

    setDateArray([...weekArray]);
  }, [selectedDate]);

  const minusMonth = () => {
    let selectedFirstDate = new Date(selectedDate);
    selectedFirstDate.setDate(0);

    setSelectedDate(new Date(selectedFirstDate));
  };

  const plusMonth = () => {
    let selectedFirstDate = new Date(selectedDate);
    selectedFirstDate.setMonth(selectedFirstDate.getMonth() + 1);

    setSelectedDate(new Date(selectedFirstDate));
  };

  const dummyMonth = () => {};

  return (
    <div className={classes.calendar}>
      <div className={classes.month_move}>
        <button type="button" onClick={selectedDate.getFullYear() - today.getFullYear() < 1 ? minusMonth : dummyMonth }>{"<"}</button>
        <button>
          {selectedDate.getFullYear()}-{selectedDate.getMonth() < 9 && "0"}
          {selectedDate.getMonth() + 1}
        </button>
        <button type="button" onClick={selectedDate.getFullYear() - today.getFullYear() < 1 ? plusMonth : dummyMonth }>{">"}</button>
      </div>
      <div className={classes.calendar_days}>
        <div className={classes.days}>일</div>
        <div className={classes.days}>월</div>
        <div className={classes.days}>화</div>
        <div className={classes.days}>수</div>
        <div className={classes.days}>목</div>
        <div className={classes.days}>금</div>
        <div className={classes.days}>토</div>
      </div>
      <div className={classes.calendar_dates}>
        {dateArray.map((item)=>item)}
      </div>
    </div>
  );
};

export default Calendar;
