import React from 'react';

import DashboardItem from './DashboardItem/DashboardItem';

const Dashboard = () => {

	//const [cookiesArray, setCookiesArray] = useState([]);
	const zip = '28701';

	return (
		<div>
			<DashboardItem zip={zip}/>
		</div>
	);
}

export default Dashboard;
