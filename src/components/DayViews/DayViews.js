import React, { Component } from 'react';
import JalaliDate from './../../lib/JalaliDate';
import ListShow from '../../utility/List/List';
class DayViews extends Component {
  initializeComponent() {
    this.currentYear = this.props.currentYear;
    this.currentMonth = this.props.currentMonth;
    this.currentDate = this.props.currentDate;
    this.currentDay = this.currentYear
      ? this.getCurrentDay()
      : this.props.currentDay;
  }
  daysInMonth = month => {
    if (month < 0) {
      month = 12;
    } else if (month > 11) {
      month = 1;
    }
    if (month <= 5) return 31;
    if (month >= 6 && month <= 10) return 30;
    if (JalaliDate.isLeap(this.currentYear)) {
      return 30;
    } else {
      return 29;
    }
  };
  dayNameMaker() {
    const shortName = ['ش', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه'];
    const fullName = [
      'شنبه',
      'یکشنبه',
      'دوشنبه',
      'سه شنبه',
      'چهارشنبه',
      'پنجشنبه',
      'جمعه'
    ];
    if (this.props.showLargeDate) {
      return shortName;
    } else {
      return fullName;
    }
  }
  getCurrentDay() {
    return new JalaliDate(
      this.currentYear,
      this.currentMonth+2,
      this.currentDate
    ).getDay();
  }
  makerDayList() {
    const currentDay = this.currentDay;
    const currentDate = this.currentDate;
    const dayInLastMonth = this.daysInMonth(this.currentMonth - 1);
    const dayInCurrentMonth = this.daysInMonth(this.currentMonth);
    const dayInNextMonth = this.daysInMonth(this.currentMonth + 1);
    const listDay = [];
    for (let i = dayInLastMonth - currentDay; i <= dayInLastMonth; i++) {
      listDay.push({
        state: 'bfr',
        key: 'bfr' + i,
        value: i
      });
    }
    for (let i = 1; i <= dayInCurrentMonth; i++) {
      listDay.push({
        state: 'current',
        value: i,
        key: 'current' + i,
        class: i === this.currentDate ? ' current' : ''
      });
    }
    const numberOfdayInList = listDay.length;
    for (let i = numberOfdayInList, counter = 1; i < 42; i++) {
      listDay.push({
        state: 'next',
        key: 'bfr' + counter,
        value: counter
      });
      counter++;
    }
    return listDay;
  }
  render() {
    this.initializeComponent();
    const dayNames = this.dayNameMaker();
    return (
      <div className="pick-day">
        <ul className="day-name">
          {dayNames.map((val, ind) => <li key={ind}>{val}</li>)}
        </ul>
        <ul className="pick-d">
          <ListShow list={this.makerDayList()} />
        </ul>
      </div>
    );
  }
}
export default DayViews;
