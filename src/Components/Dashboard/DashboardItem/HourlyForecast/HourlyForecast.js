import React from 'react';

import '../DashboardItem.css';

const HourlyForecast = ({hourlyArray}) => {
	let renderedForecast = hourlyArray.map((hour, i) => {
		return(
			<div className="row hour-item" key={i}>
				<p className="text-white hour-detail">{hour.time}</p>
				<p className="text-white hour-detail">{hour.temp}°</p>
				<p className="text-white hour-detail">{hour.description}</p>
				<p className="text-white hour-detail-end">{hour.humidity}%</p>
			</div>
		)
	});

	return (
		<div className="details-div rounded">
			{renderedForecast}
		</div>
	);
}

export default HourlyForecast;
