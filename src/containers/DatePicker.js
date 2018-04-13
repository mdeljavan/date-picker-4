import React, { Component } from 'react';
import MonthViews from '../components/MonthViews/MonthViews';
import YearViews from '../components/YearViews/YearViews';
import DayViews from '../components/DayViews/DayViews';
import JalaliDate from './../lib/JalaliDate';
class DatePicker extends Component {
	constructor(props) {
		super(props);
		const jalaliDate = new JalaliDate();
		const current= jalaliDate.getFullYear();
		const { min, max } = this.setMinAndMaxYear(this.props.minYear, this.props.maxYear,current);
		this.state = {
			year: {
				doubleClicked: false,
				typeChange: null,
				listYear: null,
				current,
				min,
				max
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
	setMinAndMaxYear = (min, max,current) => {
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
					minYear={this.state.year.min}
					maxYear={this.state.year.max}
					onChangeDay={this.onChangeDay}
				/>
				<YearViews
					current={this.state.year.current}
					doubleClicked={this.state.year.doubleClicked}
					typeChange={this.state.year.typeChange}
					listYear={this.state.year.listYear}
					min ={this.state.year.min}
					max={this.state.year.max}
					onChangeHandler={(obj) => this.onChangeYearList(obj)}
				/>
			</div>
		);
	}
}
export default DatePicker;
