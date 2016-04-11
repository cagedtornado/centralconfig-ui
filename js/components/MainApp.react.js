import {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Dimensions from 'react-dimensions'
import Modal from 'react-bootstrap-modal'
import Mousetrap from 'mousetrap'

//	Components
import NavHeader from './NavHeader.react'

//	Modals
import AddItemModal from './AddItemModal.react'
import EditItemModal from './EditItemModal.react'
import UndoRemoveAlert from './UndoRemoveAlert.react';

//  Grid component
import ConfigItemsGrid from './ConfigItemsGrid.react';

//	The API utils
import CentralConfigAPIUtils from '../utils/CentralConfigAPIUtils';

//	The stores
import ConfigStore from '../stores/ConfigStore';
import RemovedConfigStore from '../stores/RemovedConfigStore';
import AppFilterStore from '../stores/AppFilterStore';

class MainApp extends Component {

	constructor(props){

		super(props);

		//  Set initial state:
		this.state = {
			configItems: [],
			currentEditConfigItem: {},
			applications: [],
			appfilter: ""
	    };

	    //  Bind our events: 
    	this._onChange = this._onChange.bind(this);
    	this.showNewConfigItem = this.showNewConfigItem.bind(this);
    	this.hideNewConfigItem = this.hideNewConfigItem.bind(this);
    	this.showEditConfigItem = this.showEditConfigItem.bind(this);
    	this.hideEditConfigItem = this.hideEditConfigItem.bind(this);
	}

	componentDidMount() {
	    //  Add store listeners ... and notify ME of changes
	    this.configListener = ConfigStore.addListener(this._onChange);
	    this.appfilterListener = AppFilterStore.addListener(this._onChange);

	    //	Add keyboard shortcuts
	    Mousetrap.bind(['ctrl+shift+a'], this.showNewConfigItem);
	}

	componentWillUnmount() {
	    //  Remove store listeners
	    this.configListener.remove();
	    this.appfilterListener.remove();

	    //	Remove keyboard shortcuts
	    Mousetrap.unbind(['ctrl+shift+a'], this.showNewConfigItem);
	}

	render() {

		var dataList = this.state.configItems;

		//	Return the app HTML to render		
		return (

			<div>

		      <NavHeader applications={this.state.applications} />

		      <div>
				<h3>Welcome to CentralConfig</h3>
				<p>
					Manage your application configuration from a central place.  
					See configuration for a specific application by selecting it from the menu.
				</p>
				<p>
					<button type="button" onClick={this.showNewConfigItem}>Add config item</button>
				</p>

				<UndoRemoveAlert />
				
				<ConfigItemsGrid 
					appfilter={this.state.appfilter} 
					configItems={this.state.configItems}
					showEditConfigItem={this.showEditConfigItem} 
					handleRemove={this.handleRemove}
					{...this.props} />

				{this.state.showNewItemDialog ? <AddItemModal show={this.state.showNewItemDialog} hide={this.hideNewConfigItem} /> : null}
				{this.state.showEditItemDialog ? <EditItemModal show={this.state.showEditItemDialog} hide={this.hideEditConfigItem} configItem={this.state.currentEditConfigItem} /> : null}
			</div>

		    </div>
			
		);
	}

	_onChange() {
    	this.setState({
	      configItems: ConfigStore.getConfigItems(),
	      applications: ConfigStore.getApplications(),
	      appfilter: AppFilterStore.getAppFilter()
	    });
  	}

  	showNewConfigItem(e) {
  		this.setState({
	      showNewItemDialog: true
	    });
  	}

  	hideNewConfigItem(e) {
  		this.setState({
	      showNewItemDialog: false
	    });
  	}

  	showEditConfigItem(configItem) {
  		//	Set the current item to edit and show the modal:
  		this.setState({
	      showEditItemDialog: true,
	      currentEditConfigItem: configItem
	    });
  	}

  	hideEditConfigItem(e) {
  		this.setState({
	      showEditItemDialog: false
	    });
  	}

  	//	Remove the item:
  	handleRemove(configItem) {
  		//	Remove the item, then refresh the data:
	    CentralConfigAPIUtils.removeConfigItem(configItem).then(CentralConfigAPIUtils.getAllConfigItems);
  	}

}

export default Dimensions()(MainApp) // Enhanced component