import React from 'react';
import ReactDOM from 'react-dom';

window.React = React; // export for http://fb.me/react-devtools

//	The API utils
import CentralConfigAPIUtils from './utils/CentralConfigAPIUtils';

//	The app component
import CentralConfigApp from './components/CentralConfigApp.react';

//	Application element
var appElement = document.getElementById("centralconfigapp");

//	Get initial config items:
CentralConfigAPIUtils.getAllConfigItems();

//	Start the app
ReactDOM.render(<CentralConfigApp />, appElement);