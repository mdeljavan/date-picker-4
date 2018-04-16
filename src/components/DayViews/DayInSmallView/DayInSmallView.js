import React from 'react';
import ListShow from '../../../utility/List/List';
import { checkCurrentPrevNext } from '../../../utility/utility';
import Auxi from './../../../utility/Auxi/auxi';
const dayInSmallView = props => {
  const { currentDate, currentMonth, currentYear, getDay } = props;
  const prevMonth = checkCurrentPrevNext(currentMonth, 11, 0).prev;
  const nextMonth = checkCurrentPrevNext(currentMonth, 11, 0).next;
  const prevYear = checkCurrentPrevNext(
    currentYear,
    props.maxYear,
    props.minYear
  ).prev;
  const nextYear = checkCurrentPrevNext(
    currentYear,
    props.maxYear,
    props.minYear
  ).next;
  const dayNames = props.dayNameMaker();
  const dayInCurrentmonth = props.daysInMonth(currentMonth);
  const dayInPrevmonth = props.daysInMonth(prevMonth);
  const makeArrayDayObject = (className, date, day) => {
    const dayName = dayNames[day];
    return {
      class: [className],
      value: date,
      key: date,
      children: <span>{dayName}</span>
    };
  };
  const arrayDaySmall = [];
  arrayDaySmall[0] =
    currentDate === 1
      ? makeArrayDayObject(
          'pick-bfr',
          dayInPrevmonth,
          getDay(currentYear, prevMonth, dayInPrevmonth)
        )
      : makeArrayDayObject(
          'pick-bfr',
          currentDate - 1,
          getDay(currentYear, currentMonth, currentDate - 1)
        );
  arrayDaySmall[1] = makeArrayDayObject(
    'pick-sl',
    currentDate,
    getDay(currentYear, currentMonth, currentDate)
  );
  arrayDaySmall[2] =
    currentDate === dayInCurrentmonth
      ? makeArrayDayObject('pick-afr', 1, getDay(currentYear, nextMonth, 1))
      : makeArrayDayObject(
          'pick-afr',
          currentDate + 1,
          getDay(currentYear, currentMonth, currentDate + 1)
        );
  const onNextHandler = () => {
    let _currentMonth = currentMonth;
    let _currrentYear = currentYear;
    let _currentDate = currentDate;
    if (currentDate === dayInCurrentmonth) {
      if (currentMonth === 11) {
        _currrentYear = nextYear;
        _currentMonth = 0;
      } else {
        _currentMonth++;
      }
      _currentDate = 1;
    } else {
      _currentDate++;
    }
    props.onChangeDay(_currrentYear, _currentMonth, _currentDate);
  };
  const onBeforeHandler = () => {
    let _currentMonth = currentMonth;
    let _currrentYear = currentYear;
    let _currentDate = currentDate;
    if (currentDate === 1) {
      if (currentMonth === 0) {
        _currrentYear = prevYear;
        _currentMonth = 11;
      } else {
        _currentMonth--;
      }
      _currentDate = dayInPrevmonth;
    } else {
      _currentDate--;
    }
    props.onChangeDay(_currrentYear, _currentMonth, _currentDate);
  };
  const dayViews = (
    <Auxi>
      <ListShow list={arrayDaySmall} />
      <div
        className="pick-arw pick-arw-s1 pick-arw-r"
        onClick={() => onNextHandler()}
      >
        <i className="fas fa-chevron-right pick-i-r" />
      </div>
      <div
        className="pick-arw pick-arw-s1 pick-arw-l"
        onClick={() => onBeforeHandler()}
      >
        <i className="fas fa-chevron-left pick-i-l" />
      </div>
    </Auxi>
  );
  return dayViews;
};
export default dayInSmallView;
