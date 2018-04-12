import React from 'react';
const listShow = (props) => {
	const list = props.list;
	const lists = list.map((val, ind) => {
		if (val.state === 'bfr') {
			return (
        <li key={val.key} className="pick-bfr" 
        onClick={val.onClick?()=>val.onClick():null}>
					{val.value}
				</li>
			);
		} else if (val.state === 'current') {
			return (
				<li key={val.key} className={'pick-sl' + (val.class ? val.class : '')}
        onClick={val.onClick?()=>val.onClick():null}>
					{val.value}
				</li>
			);
		} else {
			return (
				<li key={val.key} className="pick-afr"
        onClick={val.onClick?()=> val.onClick():null}>
					{val.value}
				</li>
			);
		}
	});

	return lists;
};
export default listShow;
