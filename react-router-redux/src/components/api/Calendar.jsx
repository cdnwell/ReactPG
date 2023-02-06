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
  const [currentSelectedStatus, setCurrentSelectedStatus] = useState({});
  const [options, setOptions] = useState([]);
  const [selectedDateStatus, setSelectedDateStatus] = useState([]);
  const [currentOption, setCurrentOption] = useState();
  const [selectValue, setSelectValue] = useState();
  const [morningStatus, setMorningStatus] = useState(false);
  const [afternoonStatus, setAfternoonStatus] = useState(false);
  const [extraStatus, setExtraStatus] = useState(false);
  const [morningChecked, setMorningChecked] = useState(false);
  const [afternoonChecked, setAfternoonChecked] = useState(false);
  const [extraChecked, setExtraChecked] = useState(false);

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
        item.date.getMonth() === array.getMonth() &&
        item.date.getDate() === array.getDate()
    );

    if (isMorning && isMorning.morning) {
      return true;
    }
    return false;
  };

  const isAfternoonChecker = (item, array) => {
    let isAfternoon;
    for (const content of item) {
      if (
        content.date.getMonth() === array.getMonth() &&
        content.date.getDate() === array.getDate()
      ) {
        isAfternoon = content.afternoon;
      }
    }

    if (isAfternoon) {
      return true;
    }
    return false;
  };

  const isExtraChecker = (item, array) => {
    const isExtra = item.find(
      (item) =>
        item.date.getMonth() === array.getMonth() &&
        item.date.getDate() === array.getDate()
    );

    if (isExtra && isExtra.extra) {
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
        isMorning[j] = isMorningChecker(selectedDateStatus, array[j + i * 7]);
        isAfternoon[j] = isAfternoonChecker(
          selectedDateStatus,
          array[j + i * 7]
        );
        isExtra[j] = isExtraChecker(selectedDateStatus, array[j + i * 7]);

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
  }, [selectedDate, selectedDateArray, isOneDay, selectedDateStatus]);

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

  // useEffect 훅, option 배열 실시간 업데이트 훅
  useEffect(() => {
    let tmpArray = [];
    if (isOneDay) {
      tmpArray = [
        <option key={selectedDate.getDate()} value={selectedDate.getDate()}>
          {selectedDate.getDate() + "일"}
        </option>,
      ];
      setCurrentOption(selectedDate.getDate());
    } else {
      const sortArray = [];
      for (const date of selectedDateArray) {
        sortArray.push(date);
      }
      sortArray.sort((a, b) => {
        return a.getDate() - b.getDate();
      });
      for (const date of sortArray) {
        tmpArray.push(
          <option key={date.getDate()} value={date.getDate()}>
            {date.getDate() + "일"}
          </option>
        );
      }
      setCurrentOption(sortArray[0].getDate());
    }

    setOptions(tmpArray);
    // isOneDay를 의존성에 넣어 isOneDay가 바뀔 때도 새로 갱신되게 해준다.
  }, [selectedDate, selectedDateArray, isOneDay]);

  const onSelectHandler = (e) => {
    // select에서 onChange 속성을 이용해 값을 받아오는 함수
    // e.target.value로 값을 받아오자 값이 String으로 받아와짐
    // 일관성을 위해 앞에 +를 붙여 정수로 형변환
    setCurrentOption(+e.target.value);
  };

  const morningStatusHandler = () => {
    setMorningStatus((prevState) => !prevState);
  };

  const afternoonStatusHandler = () => {
    setAfternoonStatus((prevState) => !prevState);
  };

  const extraStatusHandler = () => {
    setExtraStatus((prevState) => !prevState);
  };

  // status가 바뀔 때 변경되는 useEffect 훅
  useEffect(() => {
    let newStatusArray = [...selectedDateStatus];
    // filter로 현재 Date가 담긴 state를 기준으로 기존의 Date와 boolean 값이 담긴 객체를 선별한다.
    // 조건에 맞는 경우에만 newStatusArray에 배열이 들어간다.
    if (isOneDay) {
      newStatusArray = [];
    } else {
      newStatusArray = newStatusArray.filter((item) => {
        let result = false;
        for (const date of selectedDateArray) {
          result = item.date.getDate() === date.getDate();
          if (result) break;
        }
        return result;
      });
    }

    const existingIndex = newStatusArray.findIndex(
      (item) => item.date.getDate() === currentOption && item.date.getMonth() === selectedDate.getMonth()
    );
    let tmpArray = [];
    if (existingIndex !== -1) {
      // 인덱스가 있어 찾은 경우
      tmpArray = [...newStatusArray];
      tmpArray[existingIndex] = {
        date: new Date(
          `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${currentOption}`
        ),
        morning: morningStatus,
        afternoon: afternoonStatus,
        extra: extraStatus,
      };
    } else if (currentOption) {
      // currentOption
      // 인덱스가 없어 새로 추가해야 하는 경우
      if (newStatusArray.length > 0) tmpArray = [...newStatusArray];
      tmpArray = tmpArray.concat({
        date: new Date(
          `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${currentOption}`
        ),
        morning: morningStatus,
        afternoon: afternoonStatus,
        extra: extraStatus,
      });
    }

    setSelectedDateStatus(tmpArray);
  }, [
    morningStatus,
    afternoonStatus,
    extraStatus,
    currentOption,
    isOneDay,
    selectedDate,
    selectedDateArray,
  ]);

  // current option이 변경 될 때 checkbox값 기존에 있는 값으로 변경 useEffect 훅
  useEffect(()=>{
    let isMorning = false, isAfternoon = false, isExtra = false;
    for(const item of selectedDateStatus){
      if(item.date.getDate() === currentOption) {
        if(item.morning) isMorning = true;
        if(item.afternoon) isAfternoon = true;
        if(item.extra) isExtra = true;
      }
    }

    setMorningStatus(isMorning);
    setAfternoonStatus(isAfternoon);
    setExtraStatus(isExtra);
    
  }, [currentOption])

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
              <select onChange={onSelectHandler} value={selectValue}>{options}</select>
              <label className={classes.checkbox} htmlFor="morning">
                {" "}
                아침
                <input
                  type="checkbox"
                  id="morning"
                  onChange={morningStatusHandler}
                  value={morningStatus}
                  checked={morningStatus}
                />
              </label>
              <label className={classes.checkbox} htmlFor="afternoon">
                {" "}
                오후
                <input
                  type="checkbox"
                  id="afternoon"
                  onChange={afternoonStatusHandler}
                  value={afternoonStatus}
                  checked={afternoonStatus}
                />
              </label>
              <label className={classes.checkbox} htmlFor="extra">
                {" "}
                추가
                <input
                  type="checkbox"
                  id="extra"
                  onChange={extraStatusHandler}
                  value={extraStatus}
                  checked={extraStatus}
                />
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
