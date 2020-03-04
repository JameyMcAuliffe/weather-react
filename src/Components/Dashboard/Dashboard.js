import React from 'react';

import DashboardItem from './DashboardItem/DashboardItem';
import './Dashboard.css';


const Dashboard = ({getCondition, searchedValue}) => {

	//create cookie from coords of default location, store in state and pass as prop
	//if cookie value is null, show default dashboard with overview of major cities and zoomed out radar

	//const [savedCoords, setSavedCoords] = useState(null);
	//const [showDefault, seShowDefault] = useState(true);

	return (
		<div>
			<DashboardItem getCondition={getCondition} searchedValue={searchedValue}/>
		</div>
	);
}

export default Dashboard;
