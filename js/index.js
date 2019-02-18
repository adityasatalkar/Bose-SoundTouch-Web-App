const powerButton = document.getElementById('power');
const sourceButton = document.getElementById('source');
const volUpButton = document.getElementById('vol-up');
const volDownButton = document.getElementById('vol-down');

var count = 0;

let apis = {
    boseSoundTouch: {
    //get user selected recomendation weather
        api:"http://192.168.1.15",
        port:":8090",
        getUrl: (endpoint) => {
            return apis.boseSoundTouch.api + apis.boseSoundTouch.port + "/" + endpoint
        },
        getVolumeUrlBody: (endpoint, value) => {
            return "<" + endpoint + ">" + value + "</"+endpoint+">"
        },
        getSourceUrlBody:(aux) => {
        	return "<ContentItem source=" + aux + " sourceAccount=" + aux + 1 + "></ContentItem>"
        },
        getPowerUrlBody:(state, sender) => {
        	return "<key state=" + state + " sender=" + sender + ">POWER</key>"
        }
    }
};

const apiCall = (endpoint, bodyOfRequest) => {
	console.log("Endpoint : " + endpoint + "\n" + "Body of Request : " + bodyOfRequest)
	fetch(apis.boseSoundTouch.getUrl(endpoint), {method: 'post', body: bodyOfRequest})
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => console.log(data))	
}

const power = () => {
	// <key state="press" sender="Gabbo">POWER</key>
	console.log('power');
	var state = "press"
	var sender = "Gabbo"
	var bodyOfRequest = apis.boseSoundTouch.getPowerUrlBody(state,sender)
	apiCall('key', bodyOfRequest)
};

const source = () => {
	// <ContentItem source="AUX" sourceAccount="AUX1"></ContentItem>
	console.log('source');
	var aux = "AUX"
	var bodyOfRequest = apis.boseSoundTouch.getSourceUrlBody(aux)
	apiCall('select', bodyOfRequest)
};

const volUp = () => {
	console.log('volUp');
	var bodyOfRequest =  apis.boseSoundTouch.getVolumeUrlBody('volume', count++)
	apiCall('volume', bodyOfRequest)
};

const volDown = () => {
	console.log('volDown');
	var bodyOfRequest =  apis.boseSoundTouch.getVolumeUrlBody('volume', count--)
	apiCall('volume', bodyOfRequest)
};

powerButton.addEventListener('click', power);
sourceButton.addEventListener('click', source);
volUpButton.addEventListener('click', volUp);
volDownButton.addEventListener('click', volDown);