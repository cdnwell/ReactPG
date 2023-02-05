import { useEffect, useRef } from "react";
import { useState } from "react";

import classes from "./Calendar.module.css";
import CalendarWeeks from "./CalendarWeeks";

const DUMMY_PLAN = [
  { date: "2023-02-02", when: "afternoon" },
  { date: "2023-02-09", when: "morning" },
  { date: "2023-02-13", when: "morning" },
  { date: "2023-02-12", when: "afternoon" },
  { date: "2023-02-12", when: "extra" },
  { date: "2023-02-17", when: "morning" },
  { date: "2023-02-17", when: "extra" },
  { date: "2023-02-19", when: "extra" },
];

const Calendar = () => {
  const [today, setToday] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateArray, setSelectedDateArray] = useState([new Date()]);
  const [dateArray, setDateArray] = useState([]);
  const [isMonthOn, setIsMonthOn] = useState(false);
  const [monthArray, setMonthArray] = useState([]);
  const [dayPick, setDayPick] = useState("one");
  const [isOneDay, setIsOneDay] = useState(true);
  const [selectedDateStatus, setSelectedDateStatus] = useState([]);
  const [currentSelectedStatus, setCurrentSelectedStatus] = useState({});

  const isSelectedChecker = (array) => {
    if (
      isOneDay &&
      array.getDate() === selectedDate.getDate() &&
      array.getMonth() === selectedDate.getMonth()
    ) {
      return classes.selectedDate;
    }
    if (!isOneDay) {
      for (let tmp of selectedDateArray) {
        if (
          array.getDate() === tmp.getDate() &&
          array.getMonth() === tmp.getMonth()
        ) {
          return classes.selectedDate;
        }
      }
    }
    return "";
  };

  const isMorningChecker = (item, array) => {
    const isMorning = item.find(
      (item) =>
        new Date(item.date).getMonth() === array.getMonth() &&
        new Date(item.date).getDate() === array.getDate() &&
        item.when === "morning"
    );

    if (isMorning && isMorning.when === "morning") {
      return true;
    }
    return false;
  };

  const isAfternoonChecker = (item, array) => {
    const isAfternoon = item.find(
      (item) =>
        new Date(item.date).getMonth() === array.getMonth() &&
        new Date(item.date).getDate() === array.getDate() &&
        item.when === "afternoon"
    );

    if (isAfternoon && isAfternoon.when === "afternoon") {
      return true;
    }
    return false;
  };

  const isExtraChecker = (item, array) => {
    const isExtra = item.find(
      (item) =>
        new Date(item.date).getMonth() === array.getMonth() &&
        new Date(item.date).getDate() === array.getDate() &&
        item.when === "extra"
    );

    if (isExtra && isExtra.when === "extra") {
      return true;
    }
    return false;
  };

  const isHolidayChecker = (date) => {
    const cmpDate = new Date(date);

    if (cmpDate.getMonth() === selectedDate.getMonth()) {
      // 비교하는 날짜와 현재 날짜의 달이 같다. 그리고 토, 일 요일이다.
      return classes.holiday;
    } else {
      // 비교하는 날짜와 현재 날짜의 달이 다르다. 그리고 토, 일 요일이다.
      return classes.dimHoliday;
    }
  };

  const isDayChecker = (date) => {
    const cmpDate = new Date(date);

    if (cmpDate.getMonth() !== selectedDate.getMonth()) {
      // 비교하는 날짜와 현재 날짜의 달이 다르다.
      return classes.dimDay;
    }
  };

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

    const weekArray = [];

    for (let i = 0; i < dividedWeeksTotal; i++) {
      const isSelected = [];
      const isMorning = [];
      const isAfternoon = [];
      const isExtra = [];
      const datesArray = [];

      for (let j = 0; j < 7; j++) {
        isSelected[j] = isSelectedChecker(array[j + i * 7]);
        isMorning[j] = isMorningChecker(DUMMY_PLAN, array[j + i * 7]);
        isAfternoon[j] = isAfternoonChecker(DUMMY_PLAN, array[j + i * 7]);
        isExtra[j] = isExtraChecker(DUMMY_PLAN, array[j + i * 7]);

        const isHoliday =
          j === 0 || j === 6 ? isHolidayChecker(array[j + i * 7]) : "";
        const isDay = j !== 0 && j !== 6 ? isDayChecker(array[j + i * 7]) : "";

        datesArray[j] = (
          <div
            className={`${isHoliday} ${isDay} ${isSelected[j]} ${classes.dates_cell}`}
            onClick={() => onSelectedDateHandler(array[j + i * 7])}
            key={j + i}
          >
            {array[j + i * 7].getDate()}
            <div className={classes.three_dot_box}>
              {isMorning[j] && <div className={classes.morning_div}></div>}
              {isAfternoon[j] && <div className={classes.afternoon_div}></div>}
              {isExtra[j] && <div className={classes.extra_div}></div>}
            </div>
          </div>
        );
      }

      weekArray.push(
        <CalendarWeeks className={classes.weeks} key={i}>
          {datesArray.map((item) => item)}
        </CalendarWeeks>
      );
    }

    setDateArray([...weekArray]);
  }, [selectedDate, selectedDateArray, isOneDay]);

  const onSelectedDateHandler = (array) => {
    if (isOneDay) {
      setSelectedDate(array);
    } else {
      if (array.getMonth() !== selectedDateArray[0].getMonth()) {
        const tmpArray = [array];
        setSelectedDateArray(tmpArray);
        setDayPick("one");
        return;
      }
      setSelectedDateArray((prevState) => {
        for (let item of prevState) {
          if (
            item.getMonth() === array.getMonth() &&
            item.getDate() === array.getDate()
          ) {
            const filteredArray = prevState.filter(
              (items) => items.getDate() !== item.getDate()
            );
            return filteredArray.length > 0 ? filteredArray : [...prevState];
          }
        }
        const tmpArray = prevState.concat(array);
        return [...tmpArray];
      });
    }
  };

  const minusMonth = () => {
    if (isOneDay) {
      let selectedFirstDate = new Date(selectedDate);
      selectedFirstDate.setMonth(selectedFirstDate.getMonth() - 1);
      selectedFirstDate.setDate(1);
      setSelectedDate(selectedFirstDate);
    } else {
      let selectedFirstDate = new Date(selectedDateArray[0]);
      selectedFirstDate.setMonth(selectedFirstDate.getMonth() - 1);
      selectedFirstDate.setDate(1);
      const tmpArray = [selectedFirstDate];
      setSelectedDateArray(tmpArray);
      setDayPick("one");
    }
  };

  const plusMonth = () => {
    if (isOneDay) {
      let selectedFirstDate = new Date(selectedDate);
      selectedFirstDate.setMonth(selectedFirstDate.getMonth() + 1);
      selectedFirstDate.setDate(1);
      setSelectedDate(selectedFirstDate);
    } else {
      let selectedFirstDate = new Date(selectedDateArray[0]);
      selectedFirstDate.setMonth(selectedFirstDate.getMonth() + 1);
      selectedFirstDate.setDate(1);
      const tmpArray = [selectedFirstDate];
      setSelectedDateArray(tmpArray);
      setDayPick("one");
    }
  };

  const dummyMonth = () => {};

  let cmpMinusDate = new Date(selectedDate);
  cmpMinusDate.setDate(0);
  const minusMonthLimit =
    cmpMinusDate.getFullYear() === 2022 ? dummyMonth : minusMonth;

  let cmpPlusDate = new Date(selectedDate);
  cmpPlusDate.setMonth(cmpPlusDate.getMonth() + 1);
  const plusMonthLimit =
    cmpPlusDate.getFullYear() === 2025 ? dummyMonth : plusMonth;

  const changeMonth = () => {
    setIsMonthOn((prevState) => !prevState);
  };

  const onTodayClick = () => {
    if (isOneDay) {
      setSelectedDate(today);
      setIsMonthOn(false);
    } else {
      const tmpArray = [today];
      setSelectedDateArray(tmpArray);
      setIsMonthOn(false);
      setDayPick("one");
    }
  };

  const onMonthClick = (month) => {
    if (isOneDay) {
      const monthSetting = new Date(selectedDate);
      monthSetting.setMonth(month);
      monthSetting.setDate(1);
      setSelectedDate(monthSetting);
      setIsMonthOn(false);
    } else {
      const monthSetting = new Date(selectedDate);
      monthSetting.setMonth(month);
      monthSetting.setDate(1);
      const tmpArray = [monthSetting];
      setSelectedDateArray(tmpArray);
      setIsMonthOn(false);
      setDayPick("one");
    }
  };

  useEffect(() => {
    const monthArray = [];

    for (let i = 0; i < 3; i++) {
      const monthTmpArray = [];
      for (let j = 1; j <= 4; j++) {
        monthTmpArray.push(
          <div
            key={i + j}
            className={classes.months}
            onClick={() => onMonthClick(i * 4 + j - 1)}
          >
            {i * 4 + j}
          </div>
        );
      }
      monthArray.push(
        <div key={i} className={classes.months_box}>
          {monthTmpArray}
        </div>
      );
    }

    setMonthArray([...monthArray]);
  }, [selectedDate, selectedDateArray]);

  const onDayRadio = (event) => {
    setDayPick(event.target.value);
  };

  useEffect(() => {
    if (dayPick === "one") {
      setIsOneDay(true);
      setSelectedDate(selectedDateArray[0]);
    } else {
      setIsOneDay(false);
      setSelectedDateArray([selectedDate]);
    }
  }, [dayPick]);

  useEffect(() => {
    const tmp = (
      <span className={classes.checkbox_box}>
        <select>
          <option value="14">14일</option>
        </select>
        <label className={classes.checkbox} htmlFor="morning">
          {" "}
          아침
          <input type="checkbox" id="morning" value="morning" />
        </label>
        <label className={classes.checkbox} htmlFor="afternoon">
          {" "}
          오후
          <input type="checkbox" id="afternoon" value="afternoon" />
        </label>
        <label className={classes.checkbox} htmlFor="extra">
          {" "}
          추가
          <input type="checkbox" id="extra" value="extra" />
        </label>
      </span>
    );
  }, [selectedDate, selectedDateArray]);

  return (
    <div className={classes.calendar}>
      <div className={classes.month_move}>
        <button
          type="button"
          className={classes.arrow_button}
          onClick={minusMonthLimit}
        >
          {"<"}
        </button>
        <button
          type="button"
          className={classes.month_button}
          onClick={changeMonth}
        >
          {selectedDate.getFullYear()}-{selectedDate.getMonth() < 9 && "0"}
          {selectedDate.getMonth() + 1}
        </button>
        <button
          type="button"
          className={classes.arrow_button}
          onClick={plusMonthLimit}
        >
          {">"}
        </button>
        <div className={classes.today} onClick={onTodayClick}>
          {today.getDate()}
        </div>
      </div>

      {!isMonthOn && (
        <div className={classes.calendar_box}>
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
            {dateArray.map((item) => item)}
          </div>
          <div className={classes.calendar_dots}>
            <div className={classes.morning}>
              <div className={classes.dot_morning}></div>
              <span>오전</span>
            </div>
            <div className={classes.afternoon}>
              <div className={classes.dot_afternoon}></div>
              <span>오후</span>
            </div>
            <div className={classes.extra}>
              <div className={classes.dot_extra}></div>
              <span>추가</span>
            </div>
          </div>
          <div className={classes.calendar_day_pick}>
            <span className={classes.one_day_pick}>
              1일
              <input
                type="radio"
                name="day"
                value="one"
                onChange={onDayRadio}
                checked={isOneDay ? true : false}
              />
            </span>
            <span className={classes.two_day_pick}>
              2일 이상
              <input
                type="radio"
                name="day"
                value="two"
                onChange={onDayRadio}
                checked={isOneDay ? false : true}
              />
            </span>
          </div>
          <div className={classes.calendar_day_detail}>
            <span className={classes.checkbox_box}>
              <select>
                <option value="14">14일</option>
              </select>
              <label className={classes.checkbox} htmlFor="morning">
                {" "}
                아침
                <input type="checkbox" id="morning" value="morning" />
              </label>
              <label className={classes.checkbox} htmlFor="afternoon">
                {" "}
                오후
                <input type="checkbox" id="afternoon" value="afternoon" />
              </label>
              <label className={classes.checkbox} htmlFor="extra">
                {" "}
                추가
                <input type="checkbox" id="extra" value="extra" />
              </label>
            </span>
          </div>
        </div>
      )}
      {isMonthOn && (
        <div className={classes.calendar_month_box}>{monthArray}</div>
      )}
    </div>
  );
};

export default Calendar;
