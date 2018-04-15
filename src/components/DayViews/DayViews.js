import React, { Component } from "react";
import JalaliDate from "./../../lib/JalaliDate";
import ListShow from "../../utility/List/List";
import { checkCurrentPrevNext } from "../../utility/utility";
import DayInLargeView from "./DaysInLargeView/DayInLargeView";
import DayInSmallView from "./DayInSmallView/DayInSmallView";
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
  const dayViewsLarge =(
    <DayInLargeView
    currentYear = {currentYear}
    currentMonth ={currentMonth}
    currentDate={currentDate}
    currentDay={currentDay}
    minYear = {props.minYear}
    maxYear = {props.maxYear}
    daysInMonth={(month)=>daysInMonth(month)}
    getDay={(currentYear, prevMonth, day)=>getDay(currentYear, prevMonth, day)}
    dayNameMaker={()=>dayNameMaker()}
    onChangeDay={(currentYear, currentMonth, selectedDate)=>props.onChangeDay(currentYear, currentMonth, selectedDate)}
    />
  );
  const dayViewsSmall=(
    <DayInSmallView/>
  );
  if (props.showLargeDate){
    return dayViewsLarge;
  }
  return dayViewsSmall;
};
export default DayViews;
