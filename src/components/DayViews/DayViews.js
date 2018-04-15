import React, { Component } from "react";
import JalaliDate from "./../../lib/JalaliDate";
import ListShow from "../../utility/List/List";
import { checkCurrentPrevNext } from "../../utility/utility";
const DayViews = props => {
  const getCurrentFirstDayMonth = () => {
    return new JalaliDate(currentYear, currentMonth + 1, 1).getDay();
  };
  const getDay = (year, month, day) => {
    return new JalaliDate(year, month + 1, day).getDay();
  };
  const daysInMonth = month => {
    if (month < 0) {
      month = 12;
    } else if (month > 11) {
      month = 1;
    }
    if (month <= 5) return 31;
    if (month >= 6 && month <= 10) return 30;
    if (JalaliDate.isLeap(currentYear)) {
      return 30;
    } else {
      return 29;
    }
  };
  const currentYear = props.currentYear;
  const currentMonth = props.currentMonth;
  const currentDate = props.currentDate;
  const currentDay = currentYear ? getCurrentFirstDayMonth() : props.currentDay;
  const prevMonth = checkCurrentPrevNext(currentMonth, 11, 0).prev;
  const nextMonth = checkCurrentPrevNext(currentMonth, 11, 0).next;
  const dayNameMaker = () => {
    const shortName = ["ش", "یک", "دو", "سه", "چهار", "پنج", "جمعه"];
    const fullName = [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه شنبه",
      "چهارشنبه",
      "پنجشنبه",
      "جمعه"
    ];
    if (props.showLargeDate) {
      return shortName;
    } else {
      return fullName;
    }
  };
  const onClickBfrHandler = selectedDate => {
    let _currentYear = currentYear;
    let _currentMonth = currentMonth;
    if (currentMonth === 0) {
      _currentYear--;
      _currentMonth = 11;
    } else {
      _currentMonth--;
    }
    if (_currentYear < props.minYear) {
      _currentYear = props.maxYear;
    }
    props.onChangeDay(_currentYear, _currentMonth, selectedDate);
  };
  const onClickAfrHandler = selectedDate => {
    let _currentYear = currentYear;
    let _currentMonth = currentMonth;
    if (currentMonth === 11) {
      _currentYear++;
      _currentMonth = 0;
    } else {
      _currentMonth++;
    }
    if (_currentYear > props.maxYear) {
      _currentYear = props.minYear;
    }
    props.onChangeDay(_currentYear, _currentMonth, selectedDate);
  };
  const onClickCurrentHandler = selectedDate => {
    props.onChangeDay(currentYear, currentMonth, selectedDate);
  };
  const makerDayList = () => {
    const dayInLastMonth = daysInMonth(currentMonth - 1);
    const dayInCurrentMonth = daysInMonth(currentMonth);
    const dayInNextMonth = daysInMonth(currentMonth + 1);
    const listDay = [];
    for (let i = dayInLastMonth - currentDay + 1; i <= dayInLastMonth; i++) {
      const _class = ["pick-bfr"];
      if (getDay(currentYear, prevMonth, i) === 6) {
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
      if (getDay(currentYear, currentMonth, i) === 6) {
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
      if (getDay(currentYear, nextMonth, counter) === 6) {
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
  const dayNames = dayNameMaker();
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
  if ( !props.showLargeDate ) {
		dayViews = ( <div className="pick-day" >
			<ul className="pick-d">
      <ListShow list={listDaySmall} />
      <div
        className="pick-arw pick-arw-s1 pick-arw-r"
        onClick={() => onChangeHandler(1)}>
        <i
          className="fas fa-chevron-right pick-i-r"></i>
      </div>
      <div
        className="pick-arw pick-arw-s1 pick-arw-l"
        onClick={() => onChangeHandler(-1)}>
        <i
          className="fas fa-chevron-left pick-i-l">
        </i>
      </div>
			</ul>	
	</div>);
			}
			return dayViews;
		};
		export default DayViews;
