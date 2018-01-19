
import nprogress from 'nprogress';
import appconfig from '../config';

//	Actions
import ConfigActions from '../actions/ConfigActions';

class CentralConfigAPIUtils {

    constructor()
    {
        this.baseUrl = "";
		
		//	Do a 'truthy' check to see if the config item is set
		//	Confused?  See https://stackoverflow.com/a/5515349/19020
		if(appconfig.serviceBaseHostPort)
		{
			this.baseUrl = `//${appconfig.serviceBaseHostPort}`;
		}
    }

    //	Gets all configuration items from the server
    getAllConfigItems() {        

        console.time("Fetched config data");

        //  Format the url
        let url = `${this.baseUrl}/config/getall`;
        
        nprogress.start();

        return fetch(url,
        {
            method: 'get',
            mode: 'cors'
        })
        .then(
            function (response) {
                nprogress.done();
                console.timeEnd("Fetched config data");
                
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Receive system state
                response.json().then(function (body) {
                    //  Call the action to receive the data:
                    ConfigActions.recieveConfigData(body.data);                    
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }

    //  Removes a configuration item
    removeConfigItem(configItem) {

        //  Format the url
        let url = `${this.baseUrl}/config/remove`;

        console.log("Removing config: %O", configItem)
        console.time("Called remove");

        return fetch(url,
        {
            mode: 'cors',
            method: 'post',
            body: JSON.stringify(configItem)
        })
        .then(
            function (response) {
                console.timeEnd("Called remove");

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Receive system state
                response.json().then(function (body) {
                    ConfigActions.recieveRemovedConfigData(configItem);                    
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }

    //  Creates/updates a configuration item
    setConfigItem(configItem) {

        //  Format the url
        let url = `${this.baseUrl}/config/set`;

        console.log("Setting config: %O", configItem)
        console.time("Set config data");

        return fetch(url,
        {
            mode: 'cors',
            method: 'post',
            body: JSON.stringify(configItem)
        })
        .then(
            function (response) {
                console.timeEnd("Set config data");

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Receive system state
                response.json().then(function (body) {
                    //  Clear the 'removed config' undo buffer
                    ConfigActions.clearRemovedConfigData();          
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }
}

export default CentralConfigAPIUtils;