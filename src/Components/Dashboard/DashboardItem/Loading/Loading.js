import React from 'react';
import ReactLoading from 'react-loading';

import './Loading.css';

const Loading = ({message}) => {
	return(
		<div className="loading-div rounded">
			<ReactLoading type="spin" color="white" height="60px" className="spinner"/>
			<h3 className="text-white mb-5">{message}</h3>
		</div>
	);
}

export default Loading;
