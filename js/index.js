const powerButton = document.getElementById('power');
const sourceButton = document.getElementById('source');
const bluetoothButton = document.getElementById('bluetooth');
const volUpButton = document.getElementById('vol-up');
const volDownButton = document.getElementById('vol-down');
const volMuteButton = document.getElementById('vol-mute');

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
        getSourceUrlBody:(source, sourceAccount) => {
        	return "<ContentItem source=" + source + " sourceAccount=" + sourceAccount + "></ContentItem>"
        },
        getBluetoothUrlBody:(source) => {
            return "<ContentItem source=" + source + "></ContentItem>"
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

const getVolume = (endpoint) => {
    var doc = ""
    var volume = ""
    console.log('getVolume')
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", apis.boseSoundTouch.getUrl(endpoint), true);
    xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            doc = xmlHttpRequest.responseXML;
            volume = doc.getElementsByTagName("volume")[0].getElementsByTagName("actualvolume")[0].firstChild.nodeValue;
            console.log(volume)
        }
    };
    return volume
    xmlHttpRequest.send(null);
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
	var source = "AUX"
    var sourceAccount = "AUX1"
	var bodyOfRequest = apis.boseSoundTouch.getSourceUrlBody(source, sourceAccount)
	apiCall('select', bodyOfRequest)
};

const bluetooth = () => {
    // <ContentItem source="BLUETOOTH"></ContentItem>
    console.log('bluetooth');
    var source = "BLUETOOTH"
    var bodyOfRequest = apis.boseSoundTouch.getBluetoothUrlBody(source)
    apiCall('select', bodyOfRequest)
};

const spotify = () => {
    // <ContentItem source="SPOTIFY" sourceAccount=""></ContentItem>
    console.log('source');
    var source = "SPOTIFY"
    var sourceAccount = ""
    var bodyOfRequest = apis.boseSoundTouch.getSourceUrlBody(source, sourceAccount)
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

const volMute = () => {
    console.log('volMute');
    var bodyOfRequest =  apis.boseSoundTouch.getVolumeUrlBody('volume', 0)
    apiCall('volume', bodyOfRequest)
};

powerButton.addEventListener('click', power);
sourceButton.addEventListener('click', source);
bluetoothButton.addEventListener('click', bluetooth);
volUpButton.addEventListener('click', volUp);
volDownButton.addEventListener('click', volDown);
volMuteButton.addEventListener('click', volMute);