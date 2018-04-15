import React from "react";
import ListShow from "../../../utility/List/List";
import { checkCurrentPrevNext } from "../../../utility/utility";
const dayInSmallView = props => {
  const currentDay = props.currentDay;
  const currentMonth = props.currentMonth;
  const prevMonth = checkCurrentPrevNext(currentMonth, 11, 0).prev;
  const nextMonth = checkCurrentPrevNext(currentMonth, 11, 0).next;
  const dayInCurrentmonth = props.dayInMonth(currentMonth);
  const dayInPrevmonth = props.dayInMonth(prevMonth);
  const listDaySmall = (
    <li className="pick-bfr">
      {currentDay}
      <span>{props.getDay(currentYear, prevMonth, dayInPrevmonth)}</span>
    </li>
  );
  const dayViews = (
    <div className="pick-day">
      <ul className="pick-d">
        <ListShow list={listDaySmall} />
        <div
          className="pick-arw pick-arw-s1 pick-arw-r"
          onClick={() => onChangeHandler(1)}
        >
          <i className="fas fa-chevron-right pick-i-r" />
        </div>
        <div
          className="pick-arw pick-arw-s1 pick-arw-l"
          onClick={() => onChangeHandler(-1)}
        >
          <i className="fas fa-chevron-left pick-i-l" />
        </div>
      </ul>
    </div>
  );
  return dayViews;
};
export default dayInSmallView;
