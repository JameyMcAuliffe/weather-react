import React from 'react';

import '../DashboardItem.css';

const OutlookForDay = ({weatherObj}) => {

	const {temperature, time} = weatherObj;

	return(
		<div className="details-div row justify-content-around rounded">
			<div>
				<h5 className="text-white"><u>High</u></h5>
				<h5 className="text-white">{temperature.high}</h5>
				<h5 className="text-white"><u>Sunrise</u></h5>
				<h5 className="text-white">{time.sunrise}</h5>
			</div>
			<div>
				<h5 className="text-white"><u>Low</u></h5>
				<h5 className="text-white">{temperature.low}</h5>
				<h5 className="text-white"><u>Sunset</u></h5>
				<h5 className="text-white">{time.sunset}</h5>
			</div>
		</div>
	);
}

export default OutlookForDay;
