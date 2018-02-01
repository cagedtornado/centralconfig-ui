//  React
import React, { Component } from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,

  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,

  Row,
  Col
} from 'reactstrap';

import Autocomplete from 'react-autocomplete';

import classnames from 'classnames';

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
      machine: "",
      activeTab: '1'
    };

  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  selectTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
                inputProps={{ className: 'form-control' }}
                value={this.state.app}
                onChange={this._onAppChange}
                onSelect={(val) => this.setState({ app: val })}
                wrapperStyle={{}}
                wrapperProps={{ id: "acApplication" }}
              />
              <small id="txtApplicationHelp" class="form-text text-muted">You can group configuration by the application that uses it.  Select * to set this for all applications</small>
            </div>

            <div className="form-group">
              <label htmlFor="txtNewName">Name</label>
              <input type="text" className="form-control" id="txtNewName" placeholder="Config item or feature flag name" value={this.state.name} onChange={this._onNameChange} />
            </div>

            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.selectTab('1'); }} >
                  Config item
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.selectTab('2'); }} >
                  Feature flag
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <div className="form-group">
                      <label htmlFor="txtNewValue">Value</label>
                      <input type="text" className="form-control" id="txtNewValue" placeholder="Config value" value={this.state.value} onChange={this._onValueChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="txtNewMachine">Machine</label>
                      <input type="text" className="form-control" id="txtNewMachine" placeholder="Optional machine name" value={this.state.machine} onChange={this._onMachineChange} />
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <form>

                      <div className="form-group row" style={{ marginTop: '10px' }}>
                        <label for="selectEnabled" className="col-sm-4 col-form-label">Enable / disable:</label>
                        <div className="col-sm-8">
                          <select className="form-control" id="selectEnabled" onChange={this._onFeatureEnabledChange} >
                            <option selected value="userules">Use rules below (default)</option>
                            <option value="true">Enabled for everybody</option>
                            <option value="false">Disabled for everybody</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="txtFFUsers" className="col-sm-3 col-form-label">Users</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" id="txtFFUsers" placeholder="Comma separated users to enable the feature for" onChange={this._onFeatureUsersChange} />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="txtFFGroups" className="col-sm-3 col-form-label">Groups</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" id="txtFFGroups" placeholder="Comma separated groups to enable the feature for" onChange={this._onFeatureGroupsChange} />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="txtFFPercentLoggedIn" className="col-sm-4 col-form-label">Percent logged in</label>
                        <div className="col-sm-8">
                          <input type="number" min="0" max="100" className="form-control" id="txtFFPercentLoggedIn" placeholder="Enable for % of logged in users" onChange={this._onFeaturePercentChange} />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="txtFFVariant" className="col-sm-3 col-form-label">Variant</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" id="txtFFVariant" placeholder="Variant name to use" onChange={this._onFeatureVariantChange} />
                        </div>
                      </div>
                    </form>

                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="chkAdmin" onChange={this._onFeatureAdminChange} />
                      <label className="form-check-label" for="chkAdmin">Enable for Admin users</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="chkInternal" onChange={this._onFeatureInternalChange} />
                      <label className="form-check-label" for="chkInternal">Enable for Internal users</label>
                    </div>

                  </Col>
                </Row>
              </TabPane>
            </TabContent>

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

  _onFeatureEnabledChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    let enabled = e.target.value;

    if (enabled === "userules") {
      delete flag.enabled;
    } else {
      //  Set the 'enabled' attribute
      flag.enabled = enabled;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);
  }

  _onFeatureUsersChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    //  Parse users into an array
    let users = e.target.value.split(",").map(function (item) {
      //  Trim each user
      return item.trim();
    });

    //  Filter out blank users:
    users = users.filter(function (item) {
      let retval = false;

      if (item !== "") {
        retval = true;
      }

      return retval;
    });

    //  Now if we (still) have users, set the 'users' attribute
    //  Otherwise, just remove the attribute:
    if (users.length > 0) {
      flag.users = users;
    } else {
      delete flag.users;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);
  }

  _onFeatureGroupsChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    //  Parse groups into an array
    let groups = e.target.value.split(",").map(function (item) {
      //  Trim each user
      return item.trim();
    });

    //  Filter out blank groups:
    groups = groups.filter(function (item) {
      let retval = false;

      if (item !== "") {
        retval = true;
      }

      return retval;
    });

    //  Now if we (still) have groups, set the 'groups' attribute
    //  Otherwise, just remove the attribute:
    if (groups.length > 0) {
      flag.groups = groups;
    } else {
      delete flag.groups;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);
  }

  _onFeaturePercentChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    let percent = parseInt(e.target.value.trim(), 10);

    //  If we don't have a number, just remove the attribute:
    if (isNaN(percent)) {
      delete flag.percent_loggedin;
    } else {
      //  Set the 'percent_loggedin' attribute
      flag.percent_loggedin = percent;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);
  }

  _onFeatureVariantChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    let variant = e.target.value.trim();

    if (variant === "") {
      delete flag.variant_name;
    } else {
      //  Set the 'variant_name' attribute
      flag.variant_name = variant;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);
  }

  _onFeatureAdminChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    //  If 'admin' is true, set the attribute to true
    //  If it's false, just remove the attribute:
    if (e.target.checked === true) {
      flag.admin = true;
    } else {
      delete flag.admin;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);
  }

  _onFeatureInternalChange = (e) => {
    //  Get the current feature flag:
    let flag = this.getCurrentFeatureFlag();

    //  If 'internal' is true, set the attribute to true
    //  If it's false, just remove the attribute:
    if (e.target.checked === true) {
      flag.internal = true;
    } else {
      delete flag.internal;
    }

    //  Save to the config item value
    this.saveCurrentFeatureFlag(flag);
  }

  //  Get the current feature flag object
  getCurrentFeatureFlag = () => {
    let value = {}

    //  First, see if the current value can be parsed as JSON
    try {
      //  If it can, use that object.  If it can't, use a new object
      value = JSON.parse(this.state.value);
    } catch (error) {
      console.log("Current config value doesn't appear to be a feature flag: Overwriting.");
    }

    return value;
  }

  //  Save the current feature flag object
  saveCurrentFeatureFlag = (flag) => {
    //  Serialize to JSON
    let serializedFlag = JSON.stringify(flag);

    //  Save to the config item value
    this.setState({
      value: serializedFlag
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