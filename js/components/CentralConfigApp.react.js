import {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Dimensions from 'react-dimensions'
import Modal from 'react-bootstrap-modal'

//  Grid component
import FixedDataTable from 'fixed-data-table';
const {Table, Column, Cell} = FixedDataTable;

//	The API utils
import CentralConfigAPIUtils from '../utils/CentralConfigAPIUtils';

//	The stores
import ConfigStore from '../stores/ConfigStore';

class CentralConfigApp extends Component {

	constructor(props){

		super(props);

		//  Set initial state:
		this.state = {
			configItems: []
	    };

	    //  Bind our events: 
    	this._onChange = this._onChange.bind(this);
    	this.handleEdit = this.handleEdit.bind(this);
    	this.showNewConfigItem = this.showNewConfigItem.bind(this);
    	this.hideNewConfigItem = this.hideNewConfigItem.bind(this);
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
 
	    let saveAndClose = () => {
	      api.saveData()
	        .then(() => this.setState({ open: false }))
	    }

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
			        height={500}
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
			              <button onClick={()=>this.handleEdit(this.state.configItems[props.rowIndex])}>Edit</button>&nbsp;
			              <button onClick={()=>this.handleRemove(this.state.configItems[props.rowIndex])}>Remove</button>
			            </Cell>
			          )}
			          width={150}
			        />
			      </Table>
				</div>

				<Modal 
		          show={this.state.open} 
		          onHide={this.hideNewConfigItem}
		          aria-labelledby="ModalHeader"
		        >
		          <Modal.Header closeButton>
		            <Modal.Title id='ModalHeader'>Add a new config item</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
					  <div className="form-group">
					    <label htmlFor="txtNewAppName">Application</label>
					    <input className="form-control" id="txtNewAppName" placeholder="Your application name" autoFocus/>
					  </div>
					  <div className="form-group">
					    <label htmlFor="txtNewName">Name</label>
					    <input className="form-control" id="txtNewName" placeholder="Config item name"/>
					  </div>
					  <div className="form-group">
					    <label htmlFor="txtNewValue">Value</label>
					    <input className="form-control" id="txtNewValue" placeholder="Config value"/>
					  </div>
					  <div className="form-group">
					    <label htmlFor="txtNewMachine">Machine</label>
					    <input className="form-control" id="txtNewMachine" placeholder="Optional machine name"/>
					  </div>
		          </Modal.Body>
		          <Modal.Footer>
		            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
		            <button className='btn btn-primary' onClick={saveAndClose}>
		              Save
		            </button>
		          </Modal.Footer>
		        </Modal>
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
	      open: true
	    });
  	}

  	hideNewConfigItem(e) {
  		this.setState({
	      open: false
	    });
  	}

  	handleEdit(e) {
  		console.log("Edit");
  		console.log(e);
  	}

  	//	Remove the item:
  	handleRemove(configItem) {
  		//	Remove the item, then refresh the data:
	    CentralConfigAPIUtils.removeConfigItem(configItem).then(CentralConfigAPIUtils.getAllConfigItems);
  	}

}

export default Dimensions()(CentralConfigApp) // Enhanced component