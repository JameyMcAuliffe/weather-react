import React, { useState, useEffect } from 'react';

import Dashboard from './Components/Dashboard/Dashboard';
import Nav from './Components/Nav/Nav';
import Search from './Components/Search/Search';
import { BackgroundImages } from './images/backgroundImages';
import { getIdFirstDigit } from './Components/Helper/Helper';

import './App.css';

const {ClearNight, ClearDay, CloudyDay, CloudyNight, Storm, RainyDay, RainyNight, Snow, MistyNight, MistyDay} = BackgroundImages;

const App = () => {

	const [condition, setCondition] = useState();
	const [dayTime, setDayTime] = useState(true);
	const [conditionBackground, setConditionBackground] = useState(ClearDay);
	const [searchedValue, setSearchedValue] = useState(null);

	let getCondition = ({id, day}) => {
		setCondition(id);
		setDayTime(day);
	}

	let getSearchedLocation = (input) => {
		setSearchedValue(input);
	}

	//clean this up
	useEffect(() => {
		if (getIdFirstDigit(condition) === 2 || condition === 771 || condition === 781) {
			setConditionBackground(Storm);
		} else if (dayTime === true && (getIdFirstDigit(condition) === 3 || getIdFirstDigit(condition) === 5)) {
			setConditionBackground(RainyDay);
		} else if (dayTime === false && (getIdFirstDigit(condition) === 3 || getIdFirstDigit(condition) === 5)) {
			setConditionBackground(RainyNight);
		}
			else if (getIdFirstDigit(condition) === 6) {
			setConditionBackground(Snow);
		} else if (dayTime === false && getIdFirstDigit(condition) === 7 && condition < 771) {
			setConditionBackground(MistyNight);
		} else if (dayTime === true && getIdFirstDigit(condition) === 7 && condition < 771) {
			setConditionBackground(MistyDay);
		}

			else if (dayTime === true && getIdFirstDigit(condition) === 8 && condition !== 800) {
			setConditionBackground(CloudyDay);
		} else if (dayTime === false && getIdFirstDigit(condition) === 8 && condition !== 800) {
			setConditionBackground(CloudyNight);
		} else if (dayTime === false) {
			setConditionBackground(ClearNight);
		}
			else {
			setConditionBackground(ClearDay);
		}
	}, [condition, dayTime])

	const background = {
		backgroundImage: `url(${conditionBackground})`,
		paddingTop: '50px',
		paddingBottom: '50px',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundAttachment: 'fixed',
		backgroundSize: 'cover'
	}

  return (
    <div className="App" style={background}>
    	<Nav />
    	<Search passUpValue={getSearchedLocation}/>
      <Dashboard getCondition={getCondition} searchedValue={searchedValue}/>
    </div>
  );
}

export default App;
