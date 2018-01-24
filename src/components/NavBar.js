//  React and reactstrap
import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';

//  Stylesheets & images
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  dropdownToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {

    return (
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="#/">CentralConfig</NavbarBrand>

        <Nav navbar>
          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
            <DropdownToggle nav caret>
              Application
            </DropdownToggle>
            <DropdownMenu>
              {this.props.applications
                .filter(app => app !== "*")
                .map(app => <DropdownItem onClick={() => this._onAppSelect(app)}>{app}</DropdownItem>)}
              <DropdownItem divider />
              <DropdownItem onClick={() => this._onAppSelect("*")}>All Applications</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>

        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/cagedtornado/centralconfig">Help</NavLink>
            </NavItem>
          </Nav>
        </Collapse>

        <NavbarToggler onClick={this.toggle} />
      </Navbar>
    );
  }

  _onAppSelect = (app) => {
    //  For consistencies sake, if the app is * just make it blank
    if (app === "*") {
      window.location.hash = "/";
    } else {
      //  Navigate to the formatted app url:
      window.location.hash = "/app/" + app;
    }
  }

}

export default NavBar;