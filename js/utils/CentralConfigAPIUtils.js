
import nprogress from 'nprogress';

//	Actions
import ConfigActions from '../actions/ConfigActions';

class CentralConfigAPIUtils {

	constructor(){

	}

	//	Gets all configuration items from the server
	getAllConfigItems(){

		//  Format the url
        let url = `/config/getall`;

        console.time("Fetched config data");
        nprogress.start();

        return $.ajax( url )
        .done(function(data) {
            //  Call the action to receive the data:
            ConfigActions.recieveConfigData(data.data);
        }.bind(this))
        .fail(function() {
            //  Something bad happened
            console.log("There was a problem getting config items");
        })
        .always(function(){
            console.timeEnd("Fetched config data");
            nprogress.done();
        });
	}

    //  Removes a configuration item
    removeConfigItem(configItem){

        //  Format the url
        let url = `/config/remove`;

        console.log("Removing config: %O", configItem)
        console.time("Called remove");

        return $.ajax( {
          type: "POST",
          url: url,
          data: JSON.stringify(configItem)} 
        )
        .done(function(data) {
            //  We might not need to sink this - let the caller just do a 'then' on the returned promise
        }.bind(this))
        .fail(function(xhr, error, ex) {
            //  Something bad happened
            console.log("There was a problem removing config item: %O", xhr);
        })
        .always(function(){
            console.timeEnd("Called remove");
        });
    }

    //  Creates/updates a configuration item
    setConfigItem(configItem){

        //  Format the url
        let url = `/config/set`;

        console.log("Setting config: %O", configItem)
        console.time("Set config data");

        return $.ajax( {
          type: "POST",
          url: url,
          data: configItem} 
        )
        .done(function(data) {
            //  We might not need to sink this - let the caller just do a 'then' on the returned promise
        }.bind(this))
        .fail(function(xhr, error, ex) {
            //  Something bad happened
            console.log("There was a problem setting config item: %O", xhr);
        })
        .always(function(){
            console.timeEnd("Set config data");
        });
    }
}

export default new CentralConfigAPIUtils();