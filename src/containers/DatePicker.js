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
			year: {
				doubleClicked: false,
				current: jalaliDate.getFullYear(),
				typeChange: null,
				listYear: null
			},
			currentDay: jalaliDate.getDay(),
			currentMonth: jalaliDate.getMonth(),
			currentDate: jalaliDate.getDate()
		};
	}
	onChangeCurrentMonth(currentMonth) {
		this.setState({
			currentMonth
		});
	}
	onChangeYearList = (obj) => {
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
	render() {
		return (
			<div className="DatePicker">
				<MonthViews
					current={this.state.currentMonth}
					changeMonth={(current) => this.onChangeCurrentMonth(current)}
				/>
				<DayViews
					currentMonth={this.state.currentMonth}
					currentDay={this.state.currentDay}
					currentDate={this.state.currentDate}
					currentYear={this.state.year.current}
					showLargeDate
					onChangeDay={this.onChangeDay}
				/>
				<YearViews
					current={this.state.year.current}
					doubleClicked={this.state.year.doubleClicked}
					typeChange={this.state.year.typeChange}
					listYear={this.state.year.listYear}
					onChangeHandler={(obj) => this.onChangeYearList(obj)}
				/>
			</div>
		);
	}
}
export default DatePicker;
