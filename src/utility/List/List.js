import React from 'react';
const listShow = props => {
	const list = props.list;
  const lists = list.map((val, ind) => {
    return (
      <li
        key={val.key}
        className={val.class.join(' ')}
        onClick={val.onClick ? () => val.onClick() : null}
      >
        {val.value}
        {val.children ? val.children : null}
      </li>
    );
  });
  return lists;
};
export default listShow;
