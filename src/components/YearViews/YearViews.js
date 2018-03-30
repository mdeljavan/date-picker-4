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
      } ).index-1
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
  year = () => {
    return checkCurrentPrevNext( this.state.current, this.years.length - 1, 0 );
  };
  onChangeHandler = ( val ) => {
    this.setState( prevState => {
      const current = checkCurrentPrevNext( prevState.current - val, this.years.length - 1, 0 ).current;
      return {
        current
      }
    }
    );
  };
  render () {
    const { current, prev, next } = this.year();
    const viewedYear = this.years.filter( ( val, ind ) => {
      return ind === current || ind === prev || ind === next;
    } ).map( val => {
      let state = 'current';
      if ( val.index - 1 === prev ) {
        state = 'bfr';
      } else if ( val.index - 1 === next ) {
        state = 'next'
      };
      return { ...val, state }
    } );
    return (
      <ul
        className="pick pick-y"
        onDoubleClick={ this.onDoubleClickHandler }>
        <ListShow list={ viewedYear } />
        <div
          className="pick-arw pick-arw-s1 pick-arw-r"
          onClick={ () => this.onChangeHandler( 1 ) }>
          <i
            className="fas fa-chevron-right pick-i-r"></i>
        </div>
        <div
          className="pick-arw pick-arw-s1 pick-arw-l"
          onClick={ () => this.onChangeHandler( -1 ) }>
          <i
            className="fas fa-chevron-left pick-i-l">
          </i>
        </div>
        <div
          className="pick-arw pick-arw-s2 pick-arw-r"
          onClick={ () => this.onChangeHandler( 1 ) }>
          <i
            className="fas fa-chevron-right pick-i-r"></i>
        </div>
        <div
          className="pick-arw pick-arw-s2 pick-arw-l"
          onClick={ () => this.onChangeHandler( -1 ) }>
          <i
            className="fas fa-chevron-left pick-i-l">
          </i>
        </div>
      </ul>
    );
  }

};
export default YearViews;