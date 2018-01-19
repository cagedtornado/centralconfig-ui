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
                <DropdownItem>App 1</DropdownItem>
                <DropdownItem>App 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>All applications</DropdownItem>
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

}

export default NavBar;