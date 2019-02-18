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
        }
    }
};

const sendCommand = (endpoint, value) => {
	//	fetch('endpoint', {method: 'post', body: command});
	console.log("Endpoint : " + endpoint)
	console.log("Value : " + value)
	var bodyOfRequest = "<" + endpoint + ">" + value + "</"+endpoint+">"
	console.log(bodyOfRequest)
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
	var bodyOfRequest = "<key state=" + state + " sender=" + sender+ ">POWER</key>"
		fetch("http://192.168.1.15:8090/key", {method: 'post', body: bodyOfRequest})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(data => console.log(data))
};

const source = () => {
	// <ContentItem source="AUX" sourceAccount="AUX1"></ContentItem>
	console.log('source');
	var aux = "AUX"
	var bodyOfRequest = "<ContentItem source="+aux+" sourceAccount="+aux+1+"></ContentItem>"
	fetch("http://192.168.1.15:8090/select", {method: 'post', body: bodyOfRequest})
		.then(response => response.text())
		.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
		.then(data => console.log(data))
};

const volUp = () => {
	console.log('volUp');
	sendCommand('volume',count++);
};

const volDown = () => {
	console.log('volDown');
	sendCommand('volume',count--);
};

powerButton.addEventListener('click', power);
sourceButton.addEventListener('click', source);
volUpButton.addEventListener('click', volUp);
volDownButton.addEventListener('click', volDown);