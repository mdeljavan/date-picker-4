import React, { Component } from 'react';
import {
  checkCurrentPrevNext,
  contanisValueInArray,
  uniqueItemInarray
} from '../../utility/utility';
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
        this.years.find(val => val.value === this.props.current).index - 1,
      doubleClicked: false,
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
      _max = this.props.current ? this.props.current + 25 : current + 25;
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

    this.setState(prevState => {
      const current = checkCurrentPrevNext(
        prevState.current + howManyChange,
        this.years.length - 1,
        0
      ).current;
      const listYear = this.getListYear(
        current,
        typeChange,
        prevState.doubleClicked
      );
      return {
        current,
        prevCurrent: prevState.current,
        onJumpedClicked: Math.abs(howManyChange) > 1 ? true : false,
        preListYear: prevState.listYear,
        listYear
      };
    });
  };
  onDoubleClickHandler = event => {
    if (event.target.tagName !== 'LI') return;
    this.setState(prevState => {
      const doubleClicked = !prevState.doubleClicked;
      const listYear = this.getListYear(prevState.current, null, doubleClicked);
      return {
        doubleClicked,
        listYear
      };
    });
  };
  currentListYear = (years, current, prev, next) => {
    return this.years
      .filter((val, ind) => ind === current || ind === prev || ind === next)
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
  componentWillMount() {
    const listYear = this.getListYear(this.state.current);
    console.log('didMount');
    this.setState({
      listYear
    });
  }
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
    const sortedMergList = uniqueItemInarray([...sortedListYear]);
    return sortedMergList;
  };
  currentList = (current, doubleClicked) => {
    const normalList = this.normalListMaker(current);
    const jumpedList = this.jumpedListMaker(current);
    return doubleClicked
      ? this.mergeNormalAndJumpedList(normalList, jumpedList)
      : normalList;
  };
  getListYear = (current, typeChange, doubleClicked) => {
    let currentList = this.currentList(current, doubleClicked);
    let listModified = [...currentList];
    const prevListYear = this.state.listYear ? [...this.state.listYear] : null;
    const prevCurrent = prevListYear
      ? prevListYear.find(val => val.state === 'current')
      : null;
    if (typeChange === 'dec') {
      if (!contanisValueInArray(currentList, prevCurrent)) {
        listModified.push({
          ...prevCurrent,
          state: 'next'
        });
      }
    } else if (typeChange === 'inc') {
      if (contanisValueInArray(currentList, prevCurrent)) {
        listModified.splice(0, 0, {
          ...prevCurrent,
          state: 'bfr'
        });
      }
    }
    return listModified;
  };
  shouldComponentUpdate() {
    console.log('shouldUpdate');
    return this.props.current === this.years[this.state.current + 1]['value'];
  }
  componentDidUpdate() {
    console.log('didUpdate');
    this.props.changeYear(this.years[this.state.current]['value']);
  }
  render() {
    let listShow = null;
    console.log('render');
    if (this.state.listYear) {
      console.log(this.state.listYear);
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
