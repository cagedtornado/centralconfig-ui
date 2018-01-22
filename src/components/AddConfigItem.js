//  React
import React, { Component } from 'react';

import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from 'reactstrap';

import Autocomplete from 'react-autocomplete';

//  Utils
import CentralConfigAPIUtils from '../utils/CentralConfigAPIUtils';

class AddConfigItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      app: "",
      name: "",
      value: "",
      machine: ""
    };
    
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {

    return (
      <div>
        <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add a new config item</ModalHeader>
          <ModalBody>

          <div className="form-group">
            <label htmlFor="txtApplication">App name</label>
            <Autocomplete 
              getItemValue={(item) => item}
              items={this.props.applications}
              renderItem={(item, isHighlighted) =>
                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                  {item}
                </div>
              }
              inputProps={{className: 'form-control'}}
              value={this.state.app}
              onChange={this._onAppChange}
              onSelect={(val) => this.setState({app: val})}
              wrapperStyle={{}}
              wrapperProps={{id: "acApplication"}}
            />
            <small id="txtApplicationHelp" class="form-text text-muted">You can group configuration by the application that uses it.  Select * to set this for all applications</small>              
          </div>

          <div className="form-group">
            <label htmlFor="txtNewName">Name</label>
            <input type="text" className="form-control" id="txtNewName" placeholder="Config item name" value={this.state.name} onChange={this._onNameChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="txtNewValue">Value</label>
            <input type="text" className="form-control" id="txtNewValue" placeholder="Config value" value={this.state.value} onChange={this._onValueChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="txtNewMachine">Machine</label>
            <input type="text" className="form-control" id="txtNewMachine" placeholder="Optional machine name" value={this.state.machine} onChange={this._onMachineChange}/>
          </div>
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this._onSave}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  _onAppChange = (e) => {
      this.setState({
          app: e.target.value
      });
  }

  _onNameChange = (e) => {
      this.setState({
          name: e.target.value
      });
  }

  _onValueChange = (e) => {
      this.setState({
          value: e.target.value
      });
  }

  _onMachineChange = (e) => {
      this.setState({
          machine: e.target.value
      });
  }

  _onSave = (e) => {
      //  Create the object to add:
      let param = {
        application: this.state.app,
        name: this.state.name,
        value: this.state.value,
        machine: this.state.machine
      };

      //  Add the item and get all items:
      let APIUtils = new CentralConfigAPIUtils();
      APIUtils.setConfigItem(param).then(() => APIUtils.getAllConfigItems());

      //  Hide the dialog:
      this.setState({
        modal: false
      });
    }
}

export default AddConfigItem;