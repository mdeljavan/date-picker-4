import React, { Component } from 'react';
import MonthViews from '../components/MonthViews/MonthViews';
import YearViews from '../components/YearViews/YearViews';
import DayViews from '../components/DayViews/DayViews';
import JalaliDate from './../lib/JalaliDate';
class DatePicker extends Component {
  constructor(props) {
    super(props);
    const {
      currentYear,
      currentDay,
      currentMonth,
      currentDate
    } = this.goToToday();
    const { min, max } = this.setMinAndMaxYear(
      this.props.minYear,
      this.props.maxYear,
      currentYear
    );
    this.state = {
      year: {
        doubleClicked: false,
        typeChange: null,
        listYear: null,
        current: currentYear,
        min,
        max
      },
      currentDay,
      currentMonth,
      currentDate,
      largeDatePicker: false
    };
  }
  goToToday = () => {
    const jalaliDate = new JalaliDate();
    return {
      currentYear: jalaliDate.getFullYear(),
      currentDay: jalaliDate.getDay(),
      currentMonth: jalaliDate.getMonth(),
      currentDate: jalaliDate.getDate()
    };
  };
  onChangeCurrentMonth(currentMonth) {
    this.setState({
      currentMonth
    });
  }
  onChangeYearList = obj => {
    const newYearState = {
      ...this.state.year,
      ...obj
    };
    this.setState({
      year: newYearState
    });
  };
  onChangeDay = (currentYear, currentMonth, currentDate) => {
    const newStateYear = {
      ...this.state.year,
      current: currentYear
    };
    this.setState({
      year: newStateYear,
      currentDate,
      currentMonth
    });
  };
  setMinAndMaxYear = (min, max, current) => {
    const diffMaxMin = 40;
    let _max = max,
      _min = min;
    if (!_min) {
      _min = current - diffMaxMin;
    }
    if (!_max) {
      _max = current + diffMaxMin;
    }
    return {
      min: _min,
      max: _max
    };
  };
  toggleDatePicker = () => {
    this.setState(prevState => {
      return {
        largeDatePicker: !prevState.largeDatePicker
      };
    });
  };
  onGoToToday = () => {
    const {
      currentYear,
      currentDay,
      currentMonth,
      currentDate
    } = this.goToToday();
    const newStateYear = {
      ...this.state.year,
      current: currentYear
    }; 
    this.setState( {
      year:newStateYear,
      currentDay,
      currentMonth,
      currentDate
    });
  };
  render() {
    return (
      <div
        className={'DatePicker' + (this.state.largeDatePicker ? ' ' : ' small')}
      >
        <MonthViews
          current={this.state.currentMonth}
          changeMonth={current => this.onChangeCurrentMonth(current)}
        />
        <DayViews
          currentMonth={this.state.currentMonth}
          currentDay={this.state.currentDay}
          currentDate={this.state.currentDate}
          currentYear={this.state.year.current}
          showLargeDate={this.state.largeDatePicker}
          minYear={this.state.year.min}
          maxYear={this.state.year.max}
          onChangeDay={this.onChangeDay}
          toggleDatePicker={this.toggleDatePicker}
        />
        <YearViews
          current={this.state.year.current}
          doubleClicked={this.state.year.doubleClicked}
          typeChange={this.state.year.typeChange}
          listYear={this.state.year.listYear}
          min={this.state.year.min}
          max={this.state.year.max}
          onChangeHandler={obj => this.onChangeYearList(obj)}
        />
        <div className="pick-btns">
          <div
            className="btn-datePicker toggleDatePicker"
            onClick={this.toggleDatePicker}
          >
            <i className="fas fa-chevron-right pick-i-r" />
            <i className="fas fa-chevron-left pick-i-l" />
          </div>
          <div className="btn-datePicker today" onClick={this.onGoToToday}>
            امروز
          </div>
        </div>
      </div>
    );
  }
}
export default DatePicker;
