import React from 'react';

import Dashboard from './Components/Dashboard/Dashboard';
import ClearNight from './images/clear_night_2.jpg';
import ClearDay from './images/clear_2.jpg';
import CloudyDay from './images/cloudy.jpeg';
import Storm from './images/storm.jpeg';
import RainyDay from './images/rainy_day.jpg';
import RainyNight from './images/rainy_night.jpg';

import './App.css';


function App() {

	const background = {
		backgroundImage: `url(${RainyNight})`,
		paddingTop: '50px',
		paddingBottom: '50px',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundAttachment: 'fixed',
		backgroundSize: 'cover'
	}

  return (
    <div className="App" style={background}>
      <Dashboard />
    </div>
  );
}

export default App;
