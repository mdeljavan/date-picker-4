import React, { Component } from 'react';
import { checkCurrentPrevNext, contanisValueInArray, uniqueItemInarray } from '../../utility/utility';
import JalaliDate from './../../lib/JalaliDate';
import ListShow from '../../utility/List/List';
const yearViews = (props) => {
	const jumpedStep = 10;
	// const { min, max } = setMinAndMaxYear(props.min, props.max);
	const year = (step, current) => {
		return checkCurrentPrevNext(current, years.length - 1, 0, step);
	};
	const setMinAndMaxYear = (min, max) => {
		let _max = max,
			_min = min,
			_current = new JalaliDate().getFullYear();

		if (!_min) {
			_min = current ? current - diffMaxMin : _current - diffMaxMin;
		}
		if (!_max) {
			_max = current ? current + diffMaxMin : _current + diffMaxMin;
		}
		return {
			min: _min,
			max: _max
		};
	};
	const initializeYearValues = (min, max) => {
		const years = [];
		for (let i = min, counter = 1; i <= max; i++) {
			years.push({
				index: counter,
				value: i
			});
			counter++;
		}
		return years;
	};
	const getIndexCurrentYear = (year) => {
		return years.find((val) => val.value === year).index - 1;
	};
	const currentListYear = (years, current, prev, next) => {
		return years.filter((val, ind) => ind === current || ind === prev || ind === next).map((val) => {
			let state = 'current';
			let key = val.index;
			if (val.index - 1 === prev) {
				state = 'bfr';
			} else if (val.index - 1 === next) {
				state = 'next';
			}
			return { ...val, state, key };
		});
	};
	const jumpedListMaker = (_current) => {
		const { current, prev, next } = year(jumpedStep, _current);
		const jumpedListYear = currentListYear(years, current, prev, next);
		return jumpedListYear;
	};
	const normalListMaker = (_current) => {
		const { current, prev, next } = year(1, _current);
		let normalListYear = currentListYear(years, current, prev, next);
		return normalListYear;
	};
	const mergeNormalAndJumpedList = (normalList, jumpedList) => {
		const mergedList = [ ...normalList ];
		let sortedListYear = mergedList.filter((val) => val.state === 'bfr');
		sortedListYear = sortedListYear.concat(mergedList.filter((val) => val.state === 'current'));
		sortedListYear = sortedListYear.concat(mergedList.filter((val) => val.state === 'next'));
		jumpedList.forEach((val) => {
			if (val.state === 'bfr') {
				sortedListYear.splice(0, 0, val);
			} else if (val.state === 'next') {
				sortedListYear.push(val);
			}
		});
		const sortedMergList = uniqueItemInarray([ ...sortedListYear ]);
		return sortedMergList;
	};
	const currentList = (current, doubleClicked) => {
		const normalList = normalListMaker(current);
		const jumpedList = jumpedListMaker(current);
		return doubleClicked ? mergeNormalAndJumpedList(normalList, jumpedList) : normalList;
	};
	const diffMaxMin = 40;
	const { min, max } = setMinAndMaxYear(props.min, props.max);
	const prevListYear = props.listYear;
	const years = initializeYearValues(min, max);
	const current = getIndexCurrentYear(props.current);
	const getListYear = (current, typeChange, doubleClicked) => {
		let _currentList = currentList(current, doubleClicked);
		let listModified = [ ..._currentList ];
		const prevCurrent = prevListYear ? prevListYear.find((val) => val.state === 'current') : null;
		if (typeChange === 'dec') {
			if (!contanisValueInArray(_currentList, prevCurrent)) {
				listModified.push({
					...prevCurrent,
					state: 'next'
				});
			}
		} else if (typeChange === 'inc') {
			if (!contanisValueInArray(_currentList, prevCurrent)) {
				listModified.splice(0, 0, {
					...prevCurrent,
					state: 'bfr'
				});
			}
		}
		return listModified;
	};
	const listYear = getListYear(current, props.typeChange, props.doubleClicked);

	const onChangeHandler = (howManyChange) => {
		const typeChange = howManyChange > 0 ? 'inc' : 'dec';
		const _current = checkCurrentPrevNext(current + howManyChange, years.length - 1, 0).current;
		props.onChangeHandler({
			current: years[_current].value,
			onJumpedClicked: Math.abs(howManyChange) > 1 ? true : false,
			typeChange,
			listYear
		});
	};
	const onDoubleClickHandler = (event) => {
		if (event.target.tagName !== 'LI') return;
		const doubleClicked = !props.doubleClicked;
		const listYear = getListYear(current, null, doubleClicked);
		props.onChangeHandler({ doubleClicked, typeChange: null, listYear });
	};
	let listShow = null;
	if (listYear) {
		listShow = <ListShow list={listYear} />;
	}
	return (
		<ul className={'pick pick-y ' + (props.doubleClicked ? 'pick-jump' : '')} onDoubleClick={onDoubleClickHandler}>
			{listShow}
			<div className="pick-arw pick-arw-s1 pick-arw-r" onClick={() => onChangeHandler(-1)}>
				<i className="fas fa-chevron-right pick-i-r" />
			</div>
			<div className="pick-arw pick-arw-s1 pick-arw-l" onClick={() => onChangeHandler(1)}>
				<i className="fas fa-chevron-left pick-i-l" />
			</div>
			<div className="pick-arw pick-arw-s2 pick-arw-r" onClick={() => onChangeHandler(-jumpedStep)}>
				<i className="fas fa-chevron-right pick-i-r" />
			</div>
			<div className="pick-arw pick-arw-s2 pick-arw-l" onClick={() => onChangeHandler(jumpedStep)}>
				<i className="fas fa-chevron-left pick-i-l" />
			</div>
		</ul>
	);
};
export default yearViews;
