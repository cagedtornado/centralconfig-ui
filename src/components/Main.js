//  React
import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import ReactTable from 'react-table';
import "react-table/react-table.css"; 

//  Components
import Navbar from './NavBar';

class Main extends Component {

    render() {


        return (
            <div>
                <Navbar {...this.props} />

                <Container fluid>
                    
                    <Row className="page-heading">
                        <Col>
                            <h4>Welcome to CentralConfig</h4>
                            <p>
                                Manage your application configuration from a central place. See configuration for a 
                                specific application by selecting it from the menu.                                
                            </p>
                            <p>
                                <button>Add config item</button>
                            </p> 
                        </Col>                                                                                               
                    </Row>
                    <Row>
                        <Col>
                        <ReactTable
                            data={this.props.configItems}
                            columns={[{
                                columns: [{
                                    Header: 'Application',
                                    accessor: 'application'
                                }, {
                                    Header: 'Name',
                                    accessor: 'name'
                                }, {
                                    Header: 'Value',
                                    accessor: 'value'
                                }, {
                                    Header: 'Machine',
                                    accessor: 'machine'
                                }, {
                                    Header: 'Last updated',
                                    accessor: 'updated'
                                }, {
                                    Header: 'Actions',
                                    accessor: 'actions',
                                    Cell: row => (
                                        <div>
                                            <button>Edit</button> <button>Remove</button>
                                        </div>
                                    )
                                }]
                            }]}
                            defaultPageSize={10}
                            className="-striped -highlight"
                            defaultSorted={[
                                {
                                  id: "name",
                                  desc: true
                                }
                              ]}
                            noDataText="No config items found"
                        />
                        </Col>
                    </Row>
                    
                </Container>
            </div>
        );
    }

}

export default Main;