import React, { useState, useEffect } from 'react';

import ClearDayIcon from '../../../images/icons/clear_day.png';
import ClearNightIcon from '../../../images/icons/clear_night.png';
import CloudsHeavyDay from '../../../images/icons/clouds_heavy.png'
import CloudsDay from '../../../images/icons/cloudy.png'
import CloudsNight from '../../../images/icons/cloudy_night.png'
import CloudsHeavyNight from '../../../images/icons/heavy_clouds_night.png'
import RainHeavyDay from '../../../images/icons/heavy_rain_day.png'
import RainHeavyNight from '../../../images/icons/heavy_rain_night.png'
import PartlyCloudyDay from '../../../images/icons/partly_cloudy_day.png'
import PartlyCloudyNight from '../../../images/icons/partly_cloudy_night.png'
import RainNight from '../../../images/icons/rain_night.png'
import RainDay from '../../../images/icons/rain_day.png'
import SnowDay from '../../../images/icons/snow_day.png'
import SnowNight from '../../../images/icons/snow_night.png'
import StormNight from '../../../images/icons/storm_night.png'
import StormDay from '../../../images/icons/storm_day.png'

const Icon = ({id, day}) => {

	const iconsArray = [
		{id: '01d', img: ClearDayIcon},
		{id: '01n', img: ClearNightIcon},
		{id: '02d', img: PartlyCloudyDay},
		{id: '02n', img: PartlyCloudyNight},
		{id: '03d', img: CloudsDay},
		{id: '03n', img: CloudsNight},
		{id: '04n', img: CloudsHeavyNight},
		{id: '04d', img: CloudsHeavyDay},
		{id: '09d', img: RainHeavyDay},
		{id: '09n', img: RainHeavyNight},
		{id: '10n', img: RainNight},
		{id: '10d', img: RainDay},
		{id: '11d', img: StormDay},
		{id: '11n', img: StormNight},
		{id: '13n', img: SnowNight},
		{id: '13d', img: SnowDay},
		{id: '50n', img: CloudsNight},
		{id: '50d', img: CloudsDay}
	]

	const [icon, setIcon] = useState();

	useEffect(() => {
		let selectedIcon = iconsArray.filter(icon => {
			return icon.id === id;
		});

		setIcon(selectedIcon[0].img);
		
	}, [iconsArray, id]);

	return (
		<img className="mt-1 mb-3" src={icon} alt=""/>
	)
}

export default Icon;
