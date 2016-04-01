import React from 'react';
import ReactDOM from 'react-dom';

window.React = React; // export for http://fb.me/react-devtools

//	The API utils
import CentralConfigAPIUtils from './utils/CentralConfigAPIUtils';

//	The app component
import MainApp from './components/MainApp.react';

//	Application element
var appElement = document.getElementById("centralconfigapp");

//	Get initial config items:
CentralConfigAPIUtils.getAllConfigItems();

//	Start the app
ReactDOM.render(<MainApp />, appElement);