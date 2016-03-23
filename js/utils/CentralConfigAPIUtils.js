
import nprogress from 'nprogress';

//	Actions

//	Stores

class CentralConfigAPIUtils {

	constructor(){

	}

	//	Gets all configuration items from the server
	getAllConfigItems(){

		//  Format the url
        let url = `/config/getall`;

        console.time("Fetched config data");
        nprogress.start();

        $.ajax( url )
        .done(function(data) {
            //  Call the action to receive the data:
            //	WeatherActions.recieveWeatherData(weatherdata);
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
}

module.exports = new CentralConfigAPIUtils();