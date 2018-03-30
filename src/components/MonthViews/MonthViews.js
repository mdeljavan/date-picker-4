import React, { Component } from 'react';
import { checkCurrentPrevNext } from '../../utility/checkCurrentPrevNext';
import ListShow from '../../utility/List/List';
class MonthViews extends Component {
  constructor ( props ) {
    super( props );
    this.months = [
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
    this.state = {
      current: this.props.current
    };
  };
  month = () => {
    return checkCurrentPrevNext( this.state.current, this.months.length - 1, 0 );
  };
  onChangeHandler = ( val ) => {
    this.setState( prevState => {
      const current = checkCurrentPrevNext( prevState.current-val, this.months.length - 1, 0 ).current;
      return {
        current
      }
    }
    );
  };
  render () {
    const { current, prev, next } = this.month();
    const viewedMonth = this.months.filter( ( val, ind ) => {
      return ind === current || ind === prev || ind === next;
    } ).map( val => { 
      let state = 'current';
      if ( val.index - 1 === prev ) {
        state = 'bfr';
      } else if ( val.index - 1 === next ) {
        state = 'next'
      };
      return {...val , state}
    });
    return (
      <ul className="pick pick-m">
        <ListShow list={ viewedMonth}/>
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
      </ul>
    );
  }

};
export default MonthViews;