/**
 * @author Christopher Lance
 */

function namespace(name, publics){
    var path = name.split('\.');
    var cpath = '';
    for(var i=0;i<path.length;i++){
        cpath += path[i];
        if(typeof(eval('this.' + cpath)) == 'undefined'){
            eval(cpath + '={}');
        }
        cpath += '.';
    }
    var ns = eval(name);
    var key;
    if(typeof(publics) == 'function') publics = publics();
    for(key in publics){
        ns[key] = publics[key];
    }
}

namespace('MyBrownDog', function() {
		function Geo() {
		this.API_BASE_URL = 'http://open.mapquestapi.com';
		this.API_SEARCH_URL = this.API_BASE_URL + '/nominatim/v1/search?format=json';    
        this.getCoordinates = function(address,callback){
			var query = this.API_SEARCH_URL;
			query += "&q=" + address;
			query += "&json_callback=" + callback.name;
		    var script = document.createElement("script");
		    script.type = "text/javascript";
		    script.src = query;
		    
		    document.body.appendChild(script);
        }
    }
 
    // turn public MyClass
    return { Geo: Geo };
});
