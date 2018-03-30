import React, { Component } from 'react';
import MonthViews from '../components/MonthViews/MonthViews';
import YearViews from '../components/YearViews/YearViews';
class DatePicker extends Component {
  render () {
    return (
      <div className="DatePicker">
        <MonthViews current={ 1 }/>
        <YearViews current={ 1397 }/>
      </div>
    )
  };
};
export default DatePicker;