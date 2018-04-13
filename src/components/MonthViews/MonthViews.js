import React from 'react';
import { checkCurrentPrevNext,listMaker } from '../../utility/utility';
import ListShow from '../../utility/List/List';
const monthViews = (props) => {
  const months = [
    {
      value: 'فروردین',
      index: 1

    },
    {
      value: 'اردیبهشت',
      index: 2

    },
    {
      value: 'خرداد',
      index: 3

    },
    {
      value: 'تیر',
      index: 4

    },
    {
      value: 'مرداد',
      index: 5

    },
    {
      value: 'شهریور',
      index: 6

    },
    {
      value: 'مهر',
      index: 7

    },
    {
      value: 'آبان',
      index: 8

    },
    {
      value: 'آذر',
      index: 9

    },
    {
      value: 'دی',
      index: 10

    },
    {
      value: 'بهمن',
      index: 11

    },
    {
      value: 'اسفند',
      index: 12

    }
  ];
  const { current, prev, next } = checkCurrentPrevNext(props.current, months.length - 1, 0);
  const onChangeHandler = (val) => {
    const _current = checkCurrentPrevNext(current - val, months.length - 1, 0).current;
    props.changeMonth(_current);
  };
  const viewedMonth = listMaker(months,current,prev,next);
  return (
    <ul className="pick pick-m">
      <ListShow list={viewedMonth} />
      <div
        className="pick-arw pick-arw-s1 pick-arw-r"
        onClick={() => onChangeHandler(1)}>
        <i
          className="fas fa-chevron-right pick-i-r"></i>
      </div>
      <div
        className="pick-arw pick-arw-s1 pick-arw-l"
        onClick={() => onChangeHandler(-1)}>
        <i
          className="fas fa-chevron-left pick-i-l">
        </i>
      </div>
    </ul>
  );
}
export default monthViews;