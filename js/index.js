const powerButton = document.getElementById('power');
const playButton = document.getElementById('play-song');
const pauseButton = document.getElementById('pause-song');
const nextSongButton = document.getElementById('next-song');
const prevSongButton = document.getElementById('prev-song');
const sourceButton = document.getElementById('source');
const bluetoothButton = document.getElementById('bluetooth');
const volUpButton = document.getElementById('vol-up');
const volDownButton = document.getElementById('vol-down');
const volMuteButton = document.getElementById('vol-mute');

var count = 0;

function myFunction() {
  count = getData('volume', 'volume', 'actualvolume');
  console.log(count);
}

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
        getKeyUrlBody:(state, sender, key) => {
        	return "<key state=" + state + " sender=" + sender + ">" + key + "</key>"
        }
    }
};

function getData(endpoint, element1, element2) {
    var doc = ""
    var data = ""
    console.log('getVolume')
    var img = document.getElementById('image');
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", apis.boseSoundTouch.getUrl(endpoint), true);
    xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            doc = xmlHttpRequest.responseXML;
            console.log(doc)
            data = doc.getElementsByTagName(element1)[0].getElementsByTagName(element2)[0].firstChild.nodeValue;
            img.setAttribute("src", data);
            console.log(data)
            // count = volume;
        }
    };
    xmlHttpRequest.send(null);
    return data
}

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
    var key = "POWER"
	var bodyOfRequest = apis.boseSoundTouch.getKeyUrlBody(state,sender,key)
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

const playSong = () => {
    // <key state="press" sender="Gabbo">PLAY</key>
    console.log('playSong');
    var state = "press"
    var sender = "Gabbo"
    var key = "PLAY"
    var bodyOfRequest = apis.boseSoundTouch.getKeyUrlBody(state,sender,key)
    apiCall('key', bodyOfRequest)
    getData('now_playing','nowPlaying','art')
};

const pauseSong = () => {
    // <key state="press" sender="Gabbo">PAUSE</key>
    console.log('pauseSong');
    var state = "press"
    var sender = "Gabbo"
    var key = "PAUSE"
    var bodyOfRequest = apis.boseSoundTouch.getKeyUrlBody(state,sender,key)
    apiCall('key', bodyOfRequest)
    getData('now_playing','nowPlaying','art')
};

const nextSong = () => {
    // <key state="press" sender="Gabbo">NEXT_TRACK</key>
    console.log('nextSong');
    var state = "press"
    var sender = "Gabbo"
    var key = "NEXT_TRACK"
    var bodyOfRequest = apis.boseSoundTouch.getKeyUrlBody(state,sender,key)
    apiCall('key', bodyOfRequest)
    getData('now_playing','nowPlaying','art')
};

const prevSong = () => {
    // <key state="press" sender="Gabbo">PREV_TRACK</key>
    console.log('prevSong');
    var state = "press"
    var sender = "Gabbo"
    var key = "PREV_TRACK"
    var bodyOfRequest = apis.boseSoundTouch.getKeyUrlBody(state,sender,key)
    apiCall('key', bodyOfRequest)
    getData('now_playing','nowPlaying','art')
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
    // count = getVolume('volume','volume','actualvolume')
	console.log('volUp');
	var bodyOfRequest =  apis.boseSoundTouch.getVolumeUrlBody('volume', count++)
	apiCall('volume', bodyOfRequest)
};

const volDown = () => {
    // count = getVolume('volume','volume','actualvolume')
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
playButton.addEventListener('click', playSong);
pauseButton.addEventListener('click', pauseSong);
nextSongButton.addEventListener('click', nextSong);
prevSongButton.addEventListener('click', prevSong);
sourceButton.addEventListener('click', source);
bluetoothButton.addEventListener('click', bluetooth);
volUpButton.addEventListener('click', volUp);
volDownButton.addEventListener('click', volDown);
volMuteButton.addEventListener('click', volMute);