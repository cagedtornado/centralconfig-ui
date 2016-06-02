import React from 'react';
import ReactDOM from 'react-dom';

window.React = React; // export for http://fb.me/react-devtools

//  Flat iron director
import director from 'director';

//	The actions
import ConfigActions from './actions/ConfigActions';

//	The API utils
import CentralConfigAPIUtils from './utils/CentralConfigAPIUtils';

//  Router setup  
let router = director.Router({
  '/': function () { ConfigActions.filterConfigData("");  },
  '/app/:appName': function (appName) { ConfigActions.filterConfigData(appName); }
});
router.init("/");

//	The app component
import MainApp from './components/MainApp.react';

//	Application element
var appElement = document.getElementById("centralconfigapp");

//	Get initial config items:
CentralConfigAPIUtils.getAllConfigItems();

//	Start the app
ReactDOM.render(<MainApp />, appElement);

//	Listen to the websocket:
let ws = new WebSocket("ws://"+ window.location.host + "/ws")
ws.addEventListener("message", function(e){ 
	let configEvent = JSON.parse(e.data);

	switch(configEvent.type){
		case "Updated":
			ConfigActions.recieveUpdatedConfigData(configEvent.data);
			break;
		case "Removed":
			ConfigActions.recieveRemovedConfigData(configEvent.data);
			break;
	}
})