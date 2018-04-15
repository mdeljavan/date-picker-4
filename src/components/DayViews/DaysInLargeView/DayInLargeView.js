import React from "react";
import { checkCurrentPrevNext } from "../../../utility/utility";
import ListShow from "../../../utility/List/List";
const dayInLargeView = props => {
    let currentYear = props.currentYear;
    let currentMonth = props.currentMonth;
    let currentDay = props.currentDay;
    let currentDate = props.currentDate;
  const onClickBfrHandler = selectedDate => {
    if (currentMonth === 0) {
      currentYear--;
      currentMonth = 11;
    } else {
      currentMonth--;
    }
    if (currentYear < props.minYear) {
      currentYear = props.maxYear;
    }
    props.onChangeDay(currentYear, currentMonth, selectedDate);
  };
  const onClickAfrHandler = selectedDate => {
    if (currentMonth === 11) {
      currentYear++;
      currentMonth = 0;
    } else {
      currentMonth++;
    }
    if (currentYear > props.maxYear) {
      currentYear = props.minYear;
    }
    props.onChangeDay(currentYear, currentMonth, selectedDate);
  };
  const onClickCurrentHandler = selectedDate => {
    props.onChangeDay(currentYear, currentMonth, selectedDate);
  };
  const prevMonth = checkCurrentPrevNext(currentMonth, 11, 0).prev;
  const nextMonth = checkCurrentPrevNext(currentMonth, 11, 0).next;
  const makerDayList = () => {
    const dayInLastMonth = props.daysInMonth(currentMonth - 1);
    const dayInCurrentMonth = props.daysInMonth(currentMonth);
    const dayInNextMonth = props.daysInMonth(currentMonth + 1);
    const listDay = [];
    for (let i = dayInLastMonth - currentDay + 1; i <= dayInLastMonth; i++) {
      const _class = ["pick-bfr"];
      if (props.getDay(currentYear, prevMonth, i) === 6) {
        _class.push("jome");
      }
      listDay.push({
        state: "bfr",
        key: "bfr" + i,
        value: i,
        class: _class,
        onClick: () => onClickBfrHandler(i)
      });
    }
    for (let i = 1; i <= dayInCurrentMonth; i++) {
      const _class = ["pick-sl"];
      if (i === currentDate) {
        _class.push("current");
      }
      if (props.getDay(currentYear, currentMonth, i) === 6) {
        _class.push("jome");
      }
      listDay.push({
        state: "current",
        value: i,
        key: "current" + i,
        class: _class,
        onClick: () => onClickCurrentHandler(i)
      });
    }
    const numberOfdayInList = listDay.length;
    for (let i = numberOfdayInList, counter = 0; i < 42; i++) {
      ++counter;
      const _class = ["pick-afr"];
      if (props.getDay(currentYear, nextMonth, counter) === 6) {
        _class.push("jome");
      }
      listDay.push({
        state: "next",
        key: "afr" + counter,
        value: counter,
        class: _class,
        onClick: () => onClickAfrHandler(counter)
      });
    }
    return listDay;
  };
  const dayNames = props.dayNameMaker();
  let dayViews = (
    <div className="pick-day">
      <ul className="day-name">
        {dayNames.map((val, ind) => <li key={ind}>{val}</li>)}
      </ul>
      <ul className="pick-d">
        <ListShow list={makerDayList()} />
      </ul>
    </div>
  );
  return dayViews;
};
export default dayInLargeView;
