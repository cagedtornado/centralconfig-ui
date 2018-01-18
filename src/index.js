import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//  Stylesheets & images
import 'bootswatch/dist/flatly/bootstrap.min.css';

//  Utils:
import CentralConfigAPIUtils from './utils/CentralConfigAPIUtils';

//  Actions:
import ConfigActions from './actions/ConfigActions';

//  Kick off the initial fetch:
let APIUtils = new CentralConfigAPIUtils();
APIUtils.getAllConfigItems();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

//	Listen to the websocket:
let wsprotocol = "ws:";
if(window.location.protocol === "https:"){ wsprotocol = "wss:"; }
let ws = new WebSocket(wsprotocol + "//"+ window.location.host + "/ws")
ws.addEventListener("message", function(e){ 
	let configEvent = JSON.parse(e.data);

	switch(configEvent.type){
		case "Updated":
			ConfigActions.recieveUpdatedConfigData(configEvent.data);
			break;
		case "Removed":
			ConfigActions.recieveRemovedConfigData(configEvent.data);
            break;
        default:
            console.log("Received unknown socket data", configEvent);
	}
})