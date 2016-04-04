import {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Dimensions from 'react-dimensions'
import Modal from 'react-bootstrap-modal'

//	Modals
import AddItemModal from './AddItemModal.react'
import EditItemModal from './EditItemModal.react'

//  Grid component
import FixedDataTable from 'fixed-data-table';
const {Table, Column, Cell} = FixedDataTable;

//	The API utils
import CentralConfigAPIUtils from '../utils/CentralConfigAPIUtils';

//	The stores
import ConfigStore from '../stores/ConfigStore';

class MainApp extends Component {

	constructor(props){

		super(props);

		//  Set initial state:
		this.state = {
			configItems: [],
			currentEditConfigItem: {}
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
	}

	componentWillUnmount() {
	    //  Remove store listeners
	    this.configListener.remove();
	}

	render() {
 
 		//	If we don't have config items, we shouldn't display the grid -- display a welcome message
		if(this.state.configItems.length == 0){
			return null;
		}

		var {dataList} = this.state.configItems;

		//	Return the app HTML to render		
		return (
			<div>
				<h3>Welcome to CentralConfig</h3>
				<p>
					Manage your application configuration from a central place.  
					See configuration for a specific application by selecting it from the menu.
				</p>
				<p>
					<button type="button" onClick={this.showNewConfigItem}>Add config item</button>
				</p>
				
				<div>
					<Table
			        rowsCount={this.state.configItems.length}
			        rowHeight={40}
			        headerHeight={40}
			        width={this.props.containerWidth}
			        height={400}
			        {...this.props}>
			        <Column
			          header={<Cell>Application</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {this.state.configItems[props.rowIndex].application}
			            </Cell>
			          )}
			          fixed={true}
			          width={175}
			        />
			        <Column
			          header={<Cell>Name</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {this.state.configItems[props.rowIndex].name}
			            </Cell>
			          )}
			          fixed={true}
			          width={175}
			        />
			        <Column
			          header={<Cell>Value</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {this.state.configItems[props.rowIndex].value}
			            </Cell>
			          )}
			          flexGrow={2}
			          width={200}
			        />
			        <Column
			          header={<Cell>Machine</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              {this.state.configItems[props.rowIndex].machine}
			            </Cell>
			          )}
			          flexGrow={1}
			          width={200}
			        />
			        <Column
			          header={<Cell>Last updated</Cell>}
			          cell={props => (
			            <Cell {...props}>
			            	{moment(this.state.configItems[props.rowIndex].updated).format('MMM-D h:mm a')}
			            </Cell>
			          )}
			          flexGrow={1}
			          width={200}
			        />
			        <Column
			          header={<Cell>Actions</Cell>}
			          cell={props => (
			            <Cell {...props}>
			              <button onClick={()=>this.showEditConfigItem(this.state.configItems[props.rowIndex])}>Edit</button>&nbsp;
			              <button onClick={()=>this.handleRemove(this.state.configItems[props.rowIndex])}>Remove</button>
			            </Cell>
			          )}
			          width={150}
			        />
			      </Table>
				</div>

				{this.state.showNewItemDialog ? <AddItemModal show={this.state.showNewItemDialog} hide={this.hideNewConfigItem} /> : null}
				{this.state.showEditItemDialog ? <EditItemModal show={this.state.showEditItemDialog} hide={this.hideEditConfigItem} configItem={this.state.currentEditConfigItem} /> : null}
			</div>
			);
	}

	_onChange() {
    	this.setState({
	      configItems: ConfigStore.getConfigItems()
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