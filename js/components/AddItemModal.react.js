import update from 'react-addons-update';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap-modal'
import Autocomplete from 'react-autocomplete'

//	The API utils
import CentralConfigAPIUtils from '../utils/CentralConfigAPIUtils';

function matchStateToTerm (state, value) {
  return (
    state.toLowerCase().indexOf(value.toLowerCase()) !== -1 
  )
}

class AddItemModal extends Component {

	constructor(props){

		super(props);

		//  Set initial state:
		this.state = {
			newItem: {}
	    };

	    //  Bind our events: 
    	this._onApplicationChange = this._onApplicationChange.bind(this);
    	this._onNameChange = this._onNameChange.bind(this);
    	this._onValueChange = this._onValueChange.bind(this);
    	this._onMachineChange = this._onMachineChange.bind(this);
    	this._handleKeyPress = this._handleKeyPress.bind(this);
    	this._saveNewItem = this._saveNewItem.bind(this);
	}

	render() {

		//	Autocomplete helpers:
		let styles = {
		  item: {
		    padding: '2px 6px',
		    cursor: 'default'
		  },

		  highlightedItem: {
		    color: 'white',
		    background: 'hsl(200, 50%, 50%)',
		    padding: '2px 6px',
		    cursor: 'default'
		  },

		  menu: {
		    border: 'solid 1px #ccc'
		  }
		}

		//	Return the app HTML to render		
		return (
			<Modal show={this.props.show} onHide={this.props.hide} aria-labelledby="ModalHeader">
				<Modal.Header closeButton>
					<Modal.Title id='ModalHeader'>Add a new config item</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					
					<Autocomplete
			          value={this.state.newItem.application}
			          labelText="Application"
			          inputProps={{className: "form-control", autoFocus: "true"}}
			          wrapperStyle={{}}
			          wrapperProps={{className: "form-group", type: "text", id: "acApplication"}}
			          items={this.props.applications}
			          getItemValue={(item) => item}
			          shouldItemRender={matchStateToTerm}
			          onChange={(event, value) => this._onApplicationChange(value) }
			          onSelect={value => this._onApplicationChange(value)}
			          renderItem={(item, isHighlighted) => (
			            <div
			              style={isHighlighted ? styles.highlightedItem : styles.item}
			              key={item}
			            >{item}</div>
			          )}
			        />
					
					<div className="form-group">
					<label htmlFor="txtNewName">Name</label>
					<input type="text" className="form-control" id="txtNewName" value={this.state.newItem.name} onChange={this._onNameChange} onKeyPress={this._handleKeyPress} placeholder="Config item name"/>
					</div>
					<div className="form-group">
					<label htmlFor="txtNewValue">Value</label>
					<input type="text" className="form-control" id="txtNewValue" value={this.state.newItem.value} onChange={this._onValueChange} onKeyPress={this._handleKeyPress} placeholder="Config value"/>
					</div>
					<div className="form-group">
					<label htmlFor="txtNewMachine">Machine</label>
					<input type="text" className="form-control" id="txtNewMachine" value={this.state.newItem.machine} onChange={this._onMachineChange} onKeyPress={this._handleKeyPress} placeholder="Optional machine name"/>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
					<button className='btn btn-primary' type='button' onClick={this._saveNewItem}>
					Save
					</button>
				</Modal.Footer>
			</Modal>
		);
	}

	_handleKeyPress(event){
		if(event.which == 13){
			this._saveNewItem(event);
		}
	}

	_onApplicationChange(value){
		//  Using new Immutability helpers from 
	    //  https://facebook.github.io/react/docs/update.html
	    var newState = update(this.state, {
	      newItem: {application: {$set: value}}
	    });
	    this.setState(newState);
	}

	_onNameChange(event){
		//  Using new Immutability helpers from 
	    //  https://facebook.github.io/react/docs/update.html
	    var newState = update(this.state, {
	      newItem: {name: {$set: event.target.value}}
	    });
	    this.setState(newState);
	}

	_onValueChange(event){
		//  Using new Immutability helpers from 
	    //  https://facebook.github.io/react/docs/update.html
	    var newState = update(this.state, {
	      newItem: {value: {$set: event.target.value}}
	    });
	    this.setState(newState);
	}

	_onMachineChange(event){
		//  Using new Immutability helpers from 
	    //  https://facebook.github.io/react/docs/update.html
	    var newState = update(this.state, {
	      newItem: {machine: {$set: event.target.value}}
	    });
	    this.setState(newState);
	}

	_saveNewItem(event){
		//	Validate inputs

		//	Set the item and get all items:
		CentralConfigAPIUtils.setConfigItem(this.state.newItem).then(CentralConfigAPIUtils.getAllConfigItems);

		//	Hide the dialog:
		this.props.hide();
	}

}

export default AddItemModal