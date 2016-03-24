import {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

//  Grid component
import DataGrid from 'react-datagrid';

//	The stores
import ConfigStore from '../stores/ConfigStore';

class CentralConfigApp extends Component {

	constructor(props){

		super(props);

		//  Set initial state:
		this.state = {
			columns : [
				{ name: 'id', title: 'Id', width: 75 },
				{ name: 'application', title: 'Application', width: 175  },
				{ name: 'name', title: 'Name', width: 150  },
				{ name: 'value', title: 'Value', width: 300  },
				{ name: 'machine', title: 'Machine', width: 150  },
				{ name: 'updated', title: 'Last updated', width: 150, render: function(v){return moment(v).format('MMM-D h:mm a');} },
			],
			configItems: [],
			selectedItem: {},
			SELECTED_ID: '',
			itemcount: 0,
			totalcount: 0
			      
	    };

	    //  Bind our events: 
	    this.onColumnResize = this.onColumnResize.bind(this);
	    this.onColumnOrderChange = this.onColumnOrderChange.bind(this);
	    this.onSelectionChange = this.onSelectionChange.bind(this);
	    this.handleFilter = this.handleFilter.bind(this);
	    this.onColumnVisibilityChange = this.onColumnVisibilityChange.bind(this);
	    this.handleRowStyle = this.handleRowStyle.bind(this);
    	this._onChange = this._onChange.bind(this);

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


		//	Return the app HTML to render		
		return (
			<div>


				<DataGrid
		          idProperty='id'
		          dataSource={this.state.configItems}
		          columns={this.state.columns}
		          emptyText={'No config items'}
		          onColumnResize={this.onColumnResize}
		          onColumnVisibilityChange={this.onColumnVisibilityChange}
		          onColumnOrderChange={this.onColumnOrderChange}
		          selected={this.state.SELECTED_ID}
		          onSelectionChange={this.onSelectionChange}
		          onFilter={this.handleFilter}
		          liveFilter={true} //to apply the filter while typing
		          rowStyle={this.handleRowStyle}
		          style={{height: 500}} />
				</div>
			);
	}

	onColumnResize(firstCol, firstSize, secondCol, secondSize){
		firstCol.width = firstSize
		this.setState({})
  	}

  	onColumnOrderChange(index, dropIndex){
	    let cols = this.state.columns;
	    let col = cols[index];
	    cols.splice(index, 1); //delete from index, 1 item
	    cols.splice(dropIndex, 0, col);
	    this.setState({columns: cols});
  	}

  	onSelectionChange(newSelectedId, data){
	    this.setState({
	      selectedItem: data,
	      SELECTED_ID: newSelectedId
	    })
  	}

  	handleFilter(column, value, allFilterValues){
	    //  reset data to original data-array
	    let filteredData = ConfigStore.getConfigItems();

	    //  go over all filters and apply them
	    Object.keys(allFilterValues).forEach(function(name){        
	    	var columnFilter = (allFilterValues[name] + '').toUpperCase()

	    	if (columnFilter == ''){
	    		return
	    	}

	    	filteredData = filteredData.filter(function(item){
	    		if ((item[name] + '').toUpperCase().indexOf(columnFilter) >= 0){
	    			return true
	    		}
	    	})
	    })

	    this.setState({
	      configItems: filteredData
	    });
  	}

  	onColumnVisibilityChange(col, visible) {
	    col.visible = visible
	    this.setState({})
  	}

  	handleRowStyle(data, props){
	    var style = {}

	    //	Color global items differently
	    if (data.application == '*'){
	      style.color = '#31708f';
	    }

	    return style
  	}

	_onChange() {
    	this.setState({
	      configItems: ConfigStore.getConfigItems()
	    });
  	}

}

export default CentralConfigApp;