//  React
import React, { Component } from 'react';

import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from 'reactstrap';

class EditConfigItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      app: props.item.application,
      name: props.item.name,
      value: props.item.value,
      machine: props.item.machine
    };
    
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (

      <span>
        <Button size="sm" color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit config item</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="txtApplication">App name</label>
              <input type="text" className="form-control" id="txtApplication" placeholder="Name of your application" value={this.state.app} onChange={this._onAppChange}/>              
            </div>
            <div className="form-group">
              <label htmlFor="txtNewName">Name</label>
              <input type="text" className="form-control" id="txtNewName" placeholder="Config item name" value={this.state.name}/>
            </div>
            <div className="form-group">
              <label htmlFor="txtNewValue">Value</label>
              <input type="text" className="form-control" id="txtNewValue" placeholder="Config value" value={this.state.value}/>
            </div>
            <div className="form-group">
              <label htmlFor="txtNewMachine">Machine</label>
              <input type="text" className="form-control" id="txtNewMachine" placeholder="Optional machine name" value={this.state.machine}/>
            </div>
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    );
  }

  _onAppChange = (e) => {
      this.setState({
          app: e.value
      });
  }


}

export default EditConfigItem;