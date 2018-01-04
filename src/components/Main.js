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

                <Container>
                    
                    <Row className="page-heading">
                        <Col><h3>Welcome to CentralConfig</h3></Col>                        
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
                            filterable
                        />
                        </Col>
                    </Row>
                    
                </Container>
            </div>
        );
    }

}

export default Main;