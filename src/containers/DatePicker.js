import React, { Component } from 'react';
import MonthViews from '../components/MonthViews/MonthViews';
import YearViews from '../components/YearViews/YearViews';
import DayViews from '../components/DayViews/DayViews';
import JalaliDay from './../lib/JalaliDate';
class DatePicker extends Component {
  constructor(props) {
    super(props);
    const jalaliDate = new JalaliDay();
    this.state = {
      currentDay: jalaliDate.getDay(),
      currentMonth: jalaliDate.getMonth(),
      currentYear: jalaliDate.getFullYear(),
      currentDate: jalaliDate.getDate()
    };
  }
  onChangeCurrentMonth(currentMonth) {
    this.setState({
      currentMonth
    });
  }
  onChangeCurrentYear(currentYear) {
    console.log('changeYear', currentYear)
    this.setState({
      currentYear
    });
  }
  onChangeCurrentDay(currentDay, currentDate) {
    this.setState({
      currentDay,
      currentDate
    });
  }
  render() {
    return (
      <div className="DatePicker">
        <MonthViews
          current={this.state.currentMonth}
          changeMonth={current => this.onChangeCurrentMonth(current)}
        />
        <DayViews
          currentMonth={this.state.currentMonth}
          currentDay={this.state.currentDay}
          currentDate={this.state.currentDate}
          currentYear={this.state.currentYear}
          showLargeDate
        />
        <YearViews
          current={this.state.currentYear}
          changeYear={current => this.onChangeCurrentYear(current)}
        />
      </div>
    );
  }
}
export default DatePicker;
