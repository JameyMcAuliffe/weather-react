import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCoordinates } from '../../Geocode/Geocode';

import Radar from '../../Radar/Radar';
import DefaultDashboard from '../DefaultDashboard/DefaultDashboard';
import Loading from './Loading/Loading';
import CurrentDetails from './CurrentDetails/CurrentDetails';
import OutlookForDay from './OutlookForDay/OutlookForDay';
import HourlyForecast from './HourlyForecast/HourlyForecast';
import { convertDegreeToDirection, convertUnixToTime, dayCheck, defaultWeatherObj} from '../../Helper/Helper';

import './DashboardItem.css';

const apiKey = process.env.REACT_APP_API_KEY;

const DashBoardItem = ({getCondition, searchedValue}) => {	

	const [weatherObj, setWeatherObj] = useState(defaultWeatherObj);
	const [hourlyArray, setHourlyArray] = useState([]);
	const [coords, setCoords] = useState({latitude: 35.71, longitude: -82.63});
	const [dataFetched, setDataFetched] = useState(false);
	const [showDefault, setShowDefault] = useState(true);
	
	const apiUrlCoord = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&appid=${apiKey}`;
	const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&appid=${apiKey}`;

	useEffect(() => {
		if(searchedValue !== null) {
			//function available from Geocode
			getCoordinates(searchedValue)
				.then(coordsObj => {
					let newCoordsObject = {
						longitude: coordsObj.lng,
						latitude: coordsObj.lat
					}
					setCoords(newCoordsObject);
					setShowDefault(false);
				},
				err => {
					return err;
				});
		}
	},[searchedValue]);

	//Current conditions
	useEffect(() => {
		axios.get(apiUrlCoord)
		.then(({data}) => {
			let direction = convertDegreeToDirection(data.wind.deg);
			let dayResult = dayCheck(data.dt, data.sys.sunrise, data.sys.sunset);
			let sunrise = convertUnixToTime(data.sys.sunrise, data.timezone);
			let sunset = convertUnixToTime(data.sys.sunset, data.timezone);
			let currentTime = convertUnixToTime(data.dt, data.timezone);

			setWeatherObj({
				description: data.weather[0].description,
				id: data.weather[0].id,
				icon: data.weather[0].icon,
				temperature: {
					current: data.main.temp.toFixed(0),
					high: data.main.temp_max.toFixed(0),
					low: data.main.temp_min.toFixed(0)
				},
				wind: {
					speed: data.wind.speed.toFixed(0),
					direction: direction
				},
				location: data.name,
				humidity: data.main.humidity,
				coord: {
					lon: data.coord.lon,
					lat: data.coord.lat
				},
				time: {
					current: currentTime,
					sunrise: sunrise,
					sunset: sunset,
					day: dayResult
				}
			});

			setDataFetched(true);
		})
		.catch(err => {
			return err;
		});
	}, [apiUrlCoord]);


	//future forecast
	useEffect(() => {
		axios.get(forecastUrl)
			.then(({data}) => {
				let tempArray = [];
				for(let i = 0; i <= 4; i++) {
					let item = data.list[i];
					let time = convertUnixToTime(item.dt, data.city.timezone);
					let avgTemp = (item.main.temp_min + item.main.temp_max) / 2;
					let itemObj = {
						time: time,
						temp: avgTemp.toFixed(0),
						humidity: item.main.humidity,
						description: item.weather[0].main
					}
					tempArray.push(itemObj);
				}
				setHourlyArray(tempArray);
			},
			err => {
				return err;
			});
	}, [forecastUrl]);

	//function to pass data up to App.js
	useEffect(() => {
		if(dataFetched) {
			getCondition({
				id: weatherObj.id,
				day: weatherObj.time.day
			});
		} 
	}, [weatherObj.id, weatherObj.time.day, dataFetched, getCondition]);

	 
	const renderedDashboard = showDefault ? 
		<div>
			<DefaultDashboard />
		</div> 
		: dataFetched ? 
			<div> 	
				<CurrentDetails weatherObj={weatherObj}/>
				<OutlookForDay weatherObj={weatherObj}/>
				<Radar day={weatherObj.time.day} coord={weatherObj.coord} zoom="6"/> 
				<HourlyForecast hourlyArray={hourlyArray}/>
			</div>
				: <Loading message="Finding location..."/>


	return (	
		<div>
			{renderedDashboard}	
		</div>		
	);
}

export default DashBoardItem;
