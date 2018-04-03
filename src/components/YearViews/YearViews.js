import React, { Component } from 'react';
import { checkCurrentPrevNext } from '../../utility/checkCurrentPrevNext';
import JalaliDate from './../../lib/JalaliDate';
import ListShow from '../../utility/List/List';
class YearViews extends Component {
  constructor ( props ) {
    super( props );
    const { min, max } = this.setMinAndMaxYear( props.min, props.max )
    this.years = this.initializeYearValues( min, max );
    this.state = {
      current: this.years.find( val => {
        return val.value === this.props.current
      } ).index - 1,
      normalList: null,
      jumpedList: null,
      doubleClicked: false
    };
  };
  setMinAndMaxYear = ( min, max ) => {
    let _max = max, _min = min;
    if ( !_min ) {
      _min = new JalaliDate().getFullYear() - 5;
    };
    if ( !_max ) {
      _max = _min + 10;
    };
    return {
      min: _min,
      max: _max
    };
  };
  initializeYearValues = ( min, max ) => {
    const years = [];
    for ( let i = min, counter = 1; i <= max; i++ ) {
      years.push( {
        index: counter,
        value: i
      } );
      counter++;
    };
    return years;
  };
  year = ( step, current ) => {
    return checkCurrentPrevNext( current, this.years.length - 1, 0, step );
  };
  onChangeHandler = ( val ) => {
    this.setState( prevState => {
      const current = checkCurrentPrevNext( prevState.current + val, this.years.length - 1, 0 ).current;
      const typeChange = val > 0 ? 'inc' : 'dec';
      const prevCurrent = [ ...this.state.normalList ].find( val => val.state === 'current' );
      const normalList = this.normalListMaker( current, prevCurrent, typeChange );
      const jumpedList = this.jumpedListMaker( normalList, current, typeChange, prevCurrent );
      return {
        current,
        normalList,
        jumpedList
      }
    }
    );
  };
  onDoubleClickHandler = ( event ) => {
    if ( event.target.tagName !== 'LI' ) return;

    this.setState( prevState => {
      const jumpedList = this.jumpedListMaker( this.state.normalList, this.state.current,'dec' );
      return {
        doubleClicked: !prevState.doubleClicked,
        jumpedList
      };
    } );
  };
  getViewedYear = ( years, current, prev, next, typeChange, isJumped ) => {
    return this.years.filter( ( val, ind ) => {
      return ind === current || ind === prev || ind === next;
    } ).map( val => {
      let state = 'current';
      let key = val.index;
      console.log(isJumped ,this.state.doubleClicked,isJumped && this.state.doubleClicked)
      if ( isJumped && this.state.doubleClicked ) {
        key = Math.random();
      }
      if ( val.index - 1 === prev ) {
        state = 'bfr';
      } else if ( val.index - 1 === next ) {
        // if ( isJumped && typeChange === 'dec' ) {
        //   key = Math.random();
        // }
        state = 'next';

      };
      return { ...val, state, key, isJumped }
    } );
  }
  contanisValueInArray = ( arr, v ) => {
    for ( let i = 0; i < arr.length; i++ ) {
      if ( arr[ i ].index === v.index ) return true;
    }
    return false;
  }
  uniqueItemInarray = ( arr ) => {
    let _arr = [];
    for ( let i = 0; i < arr.length; i++ ) {
      if ( !this.contanisValueInArray( _arr, arr[ i ] ) ) {
        _arr.push( arr[ i ] );
      }
    }
    return _arr;
  }
  jumpedListMaker = ( normalList, _current, typeChange ) => {
    const { current, prev, next } = this.year( 5, _current );
    const listView = this.getViewedYear( this.years, null, prev, next, typeChange, true );
    console.log(listView)
    console.log(normalList)
    const stepLists = normalList.concat( listView );
    let sortedListYear = stepLists.filter( val => val.state === 'bfr' );
    sortedListYear = sortedListYear.concat( stepLists.filter( val => val.state === 'current' ) );
    sortedListYear = sortedListYear.concat( stepLists.filter( val => val.state === 'next' ) );
    sortedListYear = this.uniqueItemInarray( [ ...sortedListYear ] );

    return sortedListYear;
  }
  normalListMaker = ( _current, prevCurrent, typeChange,onClickJumped ) => {
    const { current, prev, next } = this.year( 1, _current );
    let normalListYear = this.getViewedYear( this.years, current, prev, next, typeChange, false,onClickJumped );
    if ( prevCurrent ) {
      let isPrevCurrent = normalListYear.find( val => val.index === prevCurrent.index );
      if ( !isPrevCurrent ) {
        if ( typeChange === 'inc' ) {
          normalListYear.push( {
            index: prevCurrent.index,
            value: prevCurrent.value,
            key: prevCurrent.index,
            state: 'bfr'
          } );
        };
      };
    };

    return normalListYear;
  }
  componentDidMount () {
    const normalList = this.normalListMaker( this.state.current );
    this.setState( {
      normalList
    } )
  }
  render () {
    let listShow = null;
    if ( this.state.normalList ) {
      listShow = <ListShow
        list={ this.state.doubleClicked ? this.state.jumpedList : this.state.normalList }
        typeChange={ this.state.typeChange } />
    };
    return (
      <ul
        className={ 'pick pick-y ' + ( this.state.doubleClicked ? 'pick-jump' : '' ) }
        onDoubleClick={ this.onDoubleClickHandler }>
        { listShow }
        <div
          className="pick-arw pick-arw-s1 pick-arw-r"
          onClick={ () => this.onChangeHandler( -1 ) }>
          <i
            className="fas fa-chevron-right pick-i-r"></i>
        </div>
        <div
          className="pick-arw pick-arw-s1 pick-arw-l"
          onClick={ () => this.onChangeHandler( 1 ) }>
          <i
            className="fas fa-chevron-left pick-i-l">
          </i>
        </div>
        <div
          className="pick-arw pick-arw-s2 pick-arw-r"
          onClick={ () => this.onChangeHandler( -5 ) }>
          <i
            className="fas fa-chevron-right pick-i-r"></i>
        </div>
        <div
          className="pick-arw pick-arw-s2 pick-arw-l"
          onClick={ () => this.onChangeHandler( 5 ) }>
          <i
            className="fas fa-chevron-left pick-i-l">
          </i>
        </div>
      </ul>
    );
  }

};
export default YearViews;