import React from 'react';

import '../DashboardItem.css';

const HourlyForecast = ({hourlyArray}) => {
	let renderedForecast = hourlyArray.map((hour, i) => {
		return(
			<div className="row hour-item" key={i}>
				<p className="text-white hour-detail font-weight-bold">{hour.time}</p>
				<p className="text-white hour-detail font-weight-bold">{hour.temp}°</p>
				<p className="text-white hour-detail font-weight-bold">{hour.description}</p>
				<p className="text-white hour-detail-end font-weight-bold">{hour.humidity}%</p>
			</div>	
		)
	});

	return (
		<div className="hourly-details-div rounded">
			<div className="row hour-item hour-item-labels mb-3">
				<p className="text-white hour-detail font-weight-bold">Time</p>
				<p className="text-white hour-detail font-weight-bold">Temp</p>
				<p className="text-white hour-detail font-weight-bold">Descrip</p>
				<p className="text-white hour-detail-end font-weight-bold">Hum</p>
			</div>
			{renderedForecast}
		</div>
	);
}

export default HourlyForecast;
