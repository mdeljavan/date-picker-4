import React, { Component } from 'react';
import JalaliDate from './../../lib/JalaliDate';
import ListShow from '../../utility/List/List';
const DayViews = (props) => {
	const getCurrentFirstDayMonth = () => {
		return new JalaliDate(currentYear, currentMonth + 1, 1).getDay();
	};
	const daysInMonth = (month) => {
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
		const shortName = [ 'ش', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه' ];
		const fullName = [ 'شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه' ];
		if (props.showLargeDate) {
			return shortName;
		} else {
			return fullName;
		}
	};
	const onClickBfrHandler = (selectedDate) => {
		let _currentYear = currentYear;
		let _currentMonth = currentMonth;
		if (currentMonth === 0) {
			_currentYear--;
			_currentMonth = 11;
		} else {
			_currentMonth--;
		}
		props.onChangeDay(_currentYear, _currentMonth, selectedDate);
	};
	const onClickAfrHandler = (selectedDate) => {
		let _currentYear = currentYear;
		let _currentMonth = currentMonth;
		if (currentMonth === 11) {
			_currentYear++;
			_currentMonth = 0;
		} else {
			_currentMonth++;
		}
		props.onChangeDay(_currentYear, _currentMonth, selectedDate);
	};
	const onClickCurrentHandler = (selectedDate) => {
		let _currentYear = currentYear;
		let _currentMonth = currentMonth;
		
		props.onChangeDay(_currentYear, _currentMonth, selectedDate);
	};
	const makerDayList = () => {
		const dayInLastMonth = daysInMonth(currentMonth - 1);
		const dayInCurrentMonth = daysInMonth(currentMonth);
		const dayInNextMonth = daysInMonth(currentMonth + 1);
		const listDay = [];
		for (let i = dayInLastMonth - currentDay; i < dayInLastMonth; i++) {
			listDay.push({
				state: 'bfr',
				key: 'bfr' + i,
				value: i,
				onClick: () => onClickBfrHandler(i)
			});
		}
		for (let i = 1; i <= dayInCurrentMonth; i++) {
			listDay.push({
				state: 'current',
				value: i,
				key: 'current' + i,
				class: i === currentDate ? ' current' : '',
				onClick: () => onClickCurrentHandler(i)
			});
		}
		const numberOfdayInList = listDay.length;
		for (let i = numberOfdayInList, counter = 0; i < 42; i++) {
			++counter;
			listDay.push({
				state: 'next',
				key: 'afr' + counter,
				value: counter,
				onClick: () => onClickAfrHandler(counter)
			});
		}
		return listDay;
	};
	const dayNames = dayNameMaker();
	return (
		<div className="pick-day">
			<ul className="day-name">{dayNames.map((val, ind) => <li key={ind}>{val}</li>)}</ul>
			<ul className="pick-d">
				<ListShow list={makerDayList()} />
			</ul>
		</div>
	);
};
export default DayViews;
