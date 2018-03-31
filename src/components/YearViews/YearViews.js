import React, { Component } from 'react';
import { checkCurrentPrevNext } from '../../utility/checkCurrentPrevNext';
import JalaliDate from './../../lib/JalaliDate';
import ListShow from '../../utility/List/List';
class YearViews extends Component {
  constructor(props) {
    super(props);
    const { min, max } = this.setMinAndMaxYear(props.min, props.max)
    this.years = this.initializeYearValues(min, max);
    this.state = {
      current: this.years.find(val => {
        return val.value === this.props.current
      }).index - 1,
      doubleClicked: false
    };
  };
  setMinAndMaxYear = (min, max) => {
    let _max = max, _min = min;
    if (!_min) {
      _min = new JalaliDate().getFullYear() - 5;
    };
    if (!_max) {
      _max = _min + 10;
    };
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
    };
    return years;
  };
  year = (step) => {
    return checkCurrentPrevNext(this.state.current, this.years.length - 1, 0, step);
  };
  onChangeHandler = (val) => {
    this.setState(prevState => {
      const current = checkCurrentPrevNext(prevState.current - val, this.years.length - 1, 0).current;
      return {
        current
      }
    }
    );
  };
  onDoubleClickHandler = (event) => {
    if (event.target.tagName !== 'LI') return;

    this.setState(prevState => {
      return {
        doubleClicked: !prevState.doubleClicked
      };
    });
  };
  getViewedYear = (years, current, prev, next) => {
    return this.years.filter((val, ind) => {
      return ind === current || ind === prev || ind === next;
    }).map(val => {
      let state = 'current';
      if (val.index - 1 === prev) {
        state = 'bfr';
      } else if (val.index - 1 === next) {
        state = 'next'
      };
      return { ...val, state }
    });
  }
  contanisValueInArray=(arr,v)=>{
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].index === v.index) return true;
  }
  return false;
  }
  uniqueItemInarray = (arr) => {
    let _arr = [];
    for(let i = 0; i < arr.length; i++) {
        if(!this.contanisValueInArray(_arr,arr[i])) {
            _arr.push(arr[i]);
        }
    }
    return _arr; 
  }
  joinNormalListYearByStepedList = (normalList) => {
    const { current, prev, next } = this.year(5);
    const listView = this.getViewedYear(this.years, current, prev, next);
    const stepLists = normalList.concat(listView);

    let sortedListYear = stepLists.filter(val => val.state === 'bfr');
    sortedListYear = sortedListYear.concat(stepLists.filter(val => val.state === 'current'));
    sortedListYear = sortedListYear.concat(stepLists.filter(val => val.state === 'next'));
    // sortedListYear.splice(sortedListYear.findIndex(val => val.state === 'current'), 1);
    sortedListYear = this.uniqueItemInarray([...sortedListYear]);
    return sortedListYear;
  }
  render() {
    const { current, prev, next } = this.year(1);
    let normalListYear = this.getViewedYear(this.years, current, prev, next);
    let stepedListYear = null;
    if (this.state.doubleClicked) {
      stepedListYear = this.joinNormalListYearByStepedList(normalListYear)
    }
    return (
      <ul
        className={'pick pick-y ' + (this.state.doubleClicked ? 'pick-jump' : '')}
        onDoubleClick={this.onDoubleClickHandler}>
        <ListShow list={stepedListYear ? stepedListYear : normalListYear} />
        <div
          className="pick-arw pick-arw-s1 pick-arw-r"
          onClick={() => this.onChangeHandler(1)}>
          <i
            className="fas fa-chevron-right pick-i-r"></i>
        </div>
        <div
          className="pick-arw pick-arw-s1 pick-arw-l"
          onClick={() => this.onChangeHandler(-1)}>
          <i
            className="fas fa-chevron-left pick-i-l">
          </i>
        </div>
        <div
          className="pick-arw pick-arw-s2 pick-arw-r"
          onClick={() => this.onChangeHandler(5)}>
          <i
            className="fas fa-chevron-right pick-i-r"></i>
        </div>
        <div
          className="pick-arw pick-arw-s2 pick-arw-l"
          onClick={() => this.onChangeHandler(-5)}>
          <i
            className="fas fa-chevron-left pick-i-l">
          </i>
        </div>
      </ul>
    );
  }

};
export default YearViews;