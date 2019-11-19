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
		{id: '01', img: ClearDayIcon, day: true},
		{id: '01', img: ClearNightIcon, day: false},
		{id: '02', img: PartlyCloudyDay, day: true},
		{id: '02', img: PartlyCloudyNight, day: false},
		{id: '03', img: CloudsDay, day: true},
		{id: '03', img: CloudsNight, day: false},
		{id: '04', img: CloudsHeavyNight, day: false},
		{id: '04', img: CloudsHeavyDay, day: true},
		{id: '09', img: RainHeavyDay, day: true},
		{id: '09', img: RainHeavyNight, day: false},
		{id: '10', img: RainNight, day: false},
		{id: '10', img: RainDay, day: true},
		{id: '11', img: StormDay, day: true},
		{id: '11', img: StormNight, day: false},
		{id: '13', img: SnowNight, day: false},
		{id: '13', img: SnowDay, day: true},
		{id: '50', img: CloudsNight, day: false},
		{id: '50', img: CloudsDay, day: true}
	]

	const [icon, setIcon] = useState();

	useEffect(() => {
		let selectedIcon = iconsArray.filter(icon => {
			return icon.id === id.slice(0, -1) && icon.day === day;
		});

		setIcon(selectedIcon[0].img);
		// eslint-disable-next-line
	}, []);

	return (
		<img className="mt-1 mb-3" src={icon} alt=""/>
	)
}

export default Icon;
