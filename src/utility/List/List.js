import React from 'react';
const listShow = ( props ) => {
  const list = props.list;
  const lists = list.map( ( val ) => {
    if ( val.state === 'bfr' ) {
      return (
        <li
          key={ val.index }
          className="pick-bfr">
          { val.value }
        </li>
      )
    } else if ( val.state === 'current' ) {
      return <li
        key={ val.index }
        className="pick-sl">
        { val.value }
      </li>
    } else {
      return <li
        key={ val.index }
        className="pick-afr">
        { val.value }
      </li>
    }
  } );
  return lists;
};
export default listShow;