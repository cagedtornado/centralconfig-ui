import React, { Component } from 'react';
import {Router, Route} from 'react-enroute';

//  Components
import Main from './components/Main';
import NotFound from './components/NotFound';

//  Stores
import ConfigStore from './stores/ConfigStore';
import RemovedConfigStore from './stores/RemovedConfigStore';
import AppFilterStore from './stores/AppFilterStore';

//  Stylesheets & images
import './App.css';

//  Hash based navigation for react-enroute
const getHash = hash => {
  if (typeof hash === 'string' && hash.length > 0) {
    if (hash.substring(0, 1) === '#') {
      return hash.substring(1);
    }
    return hash;
  }
  return '/';
};

class App extends Component {  

  constructor(){
    super();
    this.state = {
      location: getHash(window.location.hash),
      configItems: [],
      currentEditConfigItem: {},
      applications: [],
      appFilter: ""
    };

    //  Bind our events: 
    this.hashChangeHandler = this.hashChangeHandler.bind(this);
  }

  hashChangeHandler(e) {
    this.setState({
        location: getHash(window.location.hash)
    });
  }

  componentDidMount(){    
    //  Add a hash change listener:
    window.addEventListener("hashchange", this.hashChangeHandler);

    //  Add store listeners ... and notify ME of changes
    this.configListener = ConfigStore.addListener(this._onChange);
    this.removedConfigListener = RemovedConfigStore.addListener(this._onChange);
    this.appFilterListener = AppFilterStore.addListener(this._onChange);
  }

  componentWillUnmount() {
    //  Remove store listeners
    this.configListener.remove();
    this.removedConfigListener.remove();
    this.appFilterListener.remove();
  }

  render() {
    return (
      <Router {...this.state}>
        <Route path="/" component={Main} />
        <Route path="/app/:selectedApp" component={Main} />
        <Route path="*" component={NotFound} />
      </Router>
    );
  }

  _onChange = () => {
    this.setState({
      configItems: ConfigStore.getConfigItems(),
      applications: ConfigStore.getApplications(),
      appFilter: AppFilterStore.getAppFilter()
    });
  }

}

export default App;