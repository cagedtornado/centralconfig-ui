import {Component} from 'react';
import ReactDOM from 'react-dom';

class NavHeader extends Component {

	render() {
		
		return (

			<nav className="navbar navbar-default">
		        <div className="container-fluid">
		          <div className="navbar-header">
		            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		              <span className="sr-only">Toggle navigation</span>
		              <span className="icon-bar"></span>
		              <span className="icon-bar"></span>
		              <span className="icon-bar"></span>
		            </button>
		            <a className="navbar-brand" href="#">CentralConfig</a>
		          </div>

		          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		            <ul className="nav navbar-nav">
		              
		              <li className="dropdown">
		                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Applications <span className="caret"></span></a>
		                <ul className="dropdown-menu" role="menu">
		                  {this.props.applications.map(function(application) {
		                  	if(application != "*"){
			                return (<li key={application}><a href={"/ui#/app/" + application}>{application}</a></li>);
			              }})}
		                  <li className="divider"></li>
		                  <li><a href="/ui#/">All applications</a></li>
		                </ul>
		              </li>

		              <li className="dropdown">
		                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Help <span className="caret"></span></a>
		                <ul className="dropdown-menu" role="menu">
		                  <li><a href="https://github.com/cagedtornado/centralconfig" target="_blank">Project site</a></li>
		                  <li><a href="https://github.com/cagedtornado/centralconfig/issues" target="_blank">Found a bug?</a></li>
		                  <li className="divider"></li>
		                  <li><a href="https://github.com/cagedtornado/centralconfig/tree/master/api" target="_blank">API documentation</a></li>
		                </ul>
		              </li>

		            </ul>

		          </div>
		        </div>
		      </nav>
		);
	}
}

export default NavHeader