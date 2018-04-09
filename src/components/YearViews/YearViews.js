import React, { Component } from 'react';
import { checkCurrentPrevNext } from '../../utility/checkCurrentPrevNext';
import JalaliDate from './../../lib/JalaliDate';
import ListShow from '../../utility/List/List';
class YearViews extends Component {
  constructor(props) {
    super(props);
    this.jumpedStep = 10;
    const { min, max } = this.setMinAndMaxYear(props.min, props.max);
    this.years = this.initializeYearValues(min, max);
    this.state = {
      current:
        this.years.find(val => {
          return val.value === this.props.current;
        }).index - 1,
      doubleClicked: false,
      typeChange: null,
      onJumpedClicked: false,
      preListYear: null,
      listYear: null
    };
  }
  setMinAndMaxYear = (min, max) => {
    let _max = max,
      _min = min,
      current = new JalaliDate().getFullYear();

    if (!_min) {
      _min = this.props.current ? this.props.current - 25 : current - 25;
    }
    if (!_max) {
      _max = _min + 50;
    }
    return {
      min: _min,
      max: _max
    };
  };
  initializeYearValues = (min, max) => {
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
  year = (step, current) => {
    return checkCurrentPrevNext(current, this.years.length - 1, 0, step);
  };
  onChangeHandler = howManyChange => {
    const typeChange = howManyChange > 0 ? 'inc' : 'dec';
    const current = checkCurrentPrevNext(
      this.state.current + howManyChange,
      this.years.length - 1,
      0
    ).current;
    const listYear = this.getListYear(
      current,
      typeChange,
      this.state.doubleClicked
    );
    this.setState({
      typeChange,
      current,
      prevCurrent: this.state.current,
      onJumpedClicked: Math.abs(howManyChange) > 1 ? true : false,
      preListYear: this.state.listYear,
      listYear
    });
  };
  onDoubleClickHandler = event => {
    if (event.target.tagName !== 'LI') return;
    this.setState(prevState => {
      const doubleClicked = !prevState.doubleClicked;
      const listYear = this.getListYear(
        this.state.current,
        null,
        doubleClicked
      );
      return {
        doubleClicked,
        listYear
      };
    });
  };
  currentListYear = (years, current, prev, next) => {
    return this.years
      .filter((val, ind) => {
        return ind === current || ind === prev || ind === next;
      })
      .map(val => {
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
  contanisValueInArray = (arr, v) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].index === v.index) return true;
    }
    return false;
  };
  uniqueItemInarray = arr => {
    let _arr = [];
    for (let i = 0; i < arr.length; i++) {
      if (!this.contanisValueInArray(_arr, arr[i])) {
        _arr.push(arr[i]);
      }
    }
    return _arr;
  };
  jumpedListMaker = _current => {
    const { current, prev, next } = this.year(this.jumpedStep, _current);
    const jumpedListYear = this.currentListYear(
      this.years,
      current,
      prev,
      next
    );
    return jumpedListYear;
  };
  normalListMaker = _current => {
    const { current, prev, next } = this.year(1, _current);
    let normalListYear = this.currentListYear(this.years, current, prev, next);
    return normalListYear;
  };
  componentDidMount() {
    const listYear = this.getListYear(this.state.current);
    this.setState({
      listYear
    });
  }
  // prevYearList = _current => {
  //   const current = this.state.onJumpedClicked ? _current - 5 : _current - 1;
  //   const normalList = this.normalListMaker(current);
  //   const jumpedList = this.jumpedListMaker(current);
  //   return this.state.doubleClicked
  //     ? this.mergeNormalAndJumpedList(normalList, jumpedList)
  //     : normalList;
  // };
  // nextYearList = _current => {
  //   const current = this.state.onJumpedClicked ? _current + 5 : _current + 1;
  //   const normalList = this.normalListMaker(current);
  //   const jumpedList = this.jumpedListMaker(current);
  //   return this.state.doubleClicked
  //     ? this.mergeNormalAndJumpedList(normalList, jumpedList)
  //     : normalList;
  // };
  // nextListCome = () => {
  //   let nextList = null;
  //   const current = this.state.current;
  //   if (this.state.typeChange === 'dec') {
  //     nextList = this.prevYearList(current);
  //   } else if (this.state.typeChange === 'inc') {
  //     nextList = this.nextYearList(current);
  //   } else {
  //     nextList = this.prevYearList(current);
  //   }
  //   return nextList;
  // };
  // prevListWent = () => {
  //   let prevList = null;
  //   const current = this.state.current;
  //   if (this.state.typeChange === 'dec') {
  //     prevList = this.nextYearList(current);
  //   } else if (this.state.typeChange === 'inc') {
  //     prevList = this.prevYearList(current);
  //   } else {
  //     prevList = this.prevYearList(current);
  //   }
  //   return prevList;
  // };
  mergeNormalAndJumpedList = (normalList, jumpedList) => {
    const mergedList = [...normalList];
    let sortedListYear = mergedList.filter(val => val.state === 'bfr');
    sortedListYear = sortedListYear.concat(
      mergedList.filter(val => val.state === 'current')
    );
    sortedListYear = sortedListYear.concat(
      mergedList.filter(val => val.state === 'next')
    );
    jumpedList.forEach(val => {
      if (val.state === 'bfr') {
        sortedListYear.splice(0, 0, val);
      } else if (val.state === 'next') {
        sortedListYear.push(val);
      }
    });
    const sortedMergList = this.uniqueItemInarray([...sortedListYear]);
    return sortedMergList;
  };
  currentList = (current, doubleClicked) => {
    const normalList = this.normalListMaker(current);
    const jumpedList = this.jumpedListMaker(current);
    console.log(doubleClicked)
    return doubleClicked
      ? this.mergeNormalAndJumpedList(normalList, jumpedList)
      : normalList;
  };
  getListYear = (current, typeChange, doubleClicked) => {
    console.log(doubleClicked)
    let currentList = this.currentList(current, doubleClicked);
    console.log(currentList)
    let listModified = [...currentList];
    const prevListYear = this.state.listYear ? [...this.state.listYear] : null;
    const prevCurrent = prevListYear
      ? prevListYear.find(val => val.state === 'current')
      : null;
    if (typeChange === 'dec') {
      if (!this.contanisValueInArray(currentList, prevCurrent)) {
        listModified.push({
          ...prevCurrent,
          state: 'next'
        });
      }
    } else if (typeChange === 'inc') {
      if (!this.contanisValueInArray(currentList, prevCurrent)) {
        listModified.splice(0, 0, {
          ...prevCurrent,
          state: 'bfr'
        });
      }
    }
    return listModified;
  };
  render() {
    let listShow = null;
    if (this.state.listYear) {
      listShow = <ListShow list={this.state.listYear} />;
    }
    return (
      <ul
        className={
          'pick pick-y ' + (this.state.doubleClicked ? 'pick-jump' : '')
        }
        onDoubleClick={this.onDoubleClickHandler}
      >
        {listShow}
        <div
          className="pick-arw pick-arw-s1 pick-arw-r"
          onClick={() => this.onChangeHandler(-1)}
        >
          <i className="fas fa-chevron-right pick-i-r" />
        </div>
        <div
          className="pick-arw pick-arw-s1 pick-arw-l"
          onClick={() => this.onChangeHandler(1)}
        >
          <i className="fas fa-chevron-left pick-i-l" />
        </div>
        <div
          className="pick-arw pick-arw-s2 pick-arw-r"
          onClick={() => this.onChangeHandler(-this.jumpedStep)}
        >
          <i className="fas fa-chevron-right pick-i-r" />
        </div>
        <div
          className="pick-arw pick-arw-s2 pick-arw-l"
          onClick={() => this.onChangeHandler(this.jumpedStep)}
        >
          <i className="fas fa-chevron-left pick-i-l" />
        </div>
      </ul>
    );
  }
}
export default YearViews;
