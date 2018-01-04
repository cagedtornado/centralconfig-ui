import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//  Stylesheets & images
import 'bootstrap/dist/css/bootstrap.css';

//  Utils:
import CentralConfigAPIUtils from './utils/CentralConfigAPIUtils';

//  Kick off the initial fetch:
CentralConfigAPIUtils.getAllConfigItems();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
