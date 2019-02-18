# Bose-SoundTouch-Web-App
Bose SoundTouch Web App to control Volume, Source, and Power ON/OFF

This webapp sets the volume of the SoundTouch device. Volume UP/Down. Lets you Power ON/OFF and select 1 Source for input.

## Technologies Used :

* [Bose SoundTouch API](https://developer.bose.com/guides/bose-soundtouch-api/bose-soundtouch-api-reference)
* [JavaScript](https://www.javascript.com/)
* [HTML](https://www.w3.org/)
* [CSS](https://www.w3schools.com/css/)

## Download SoundTouch App to get IP Address of SoundTouch Device :

Install SoundTouch App on your smartphone if you don't have it already. You'll need this to get the SoundTouch Device's IP Address.
<!-- [![](https://www.globalvillage.ae/wp-content/uploads/2015/01/app-store-icon.png)](https://itunes.apple.com/us/app/bose-soundtouch/id708379313?mt=8) -->
<div>
<center>
<a href='https://play.google.com/store/apps/details?id=com.bose.soundtouch&hl=en_US'><img alt='Get it on Google Play' src='assets/google_play.png' height='48px'/></a>
<a href='https://itunes.apple.com/us/app/bose-soundtouch/id708379313?mt=8'><img alt='Get it on the App Store' src='assets/app_store.png' height='48px'/></a>
</center>
</div>

<!-- Link to [iOS App](https://itunes.apple.com/us/app/bose-soundtouch/id708379313?mt=8) and link to [Android App](https://play.google.com/store/apps/details?id=com.bose.soundtouch&hl=en_US) -->

## Steps to execute the Web App :

1. Connect to your device via the SoundTouch App.
2. Once you've connected to the SoundTouch device via the app, go to setting of the device in the SoundTouch App
3. Go to About section in the menu
4. Get the IP Address of the device. ( We'll need this shortly )
Now go this IP Address on your computer using a browser of your choice and enter it in the address bar along with the port number ```:8090``` as follows :
```
http://<IP Address>:8090

Example :
http://127.0.0.1:8090
```
This will prompt you to enter a network password. Enter the password of the router that the soundtouch device is connected to via the soundtouch app.

5. Now fork / clone this repository
6. Save the IP Address retrieved in step 5. And save it in the file index.js in the place of ```<IPAddress>```
Save the IP Address in the following format :
```
http://<IP Address>

Example :
http://127.0.0.1
```
7. Open the index.html file in a web browser.

To set the volume enter the following command

## API Reference :

For more such commands go to [Bose Developer Portal](https://developer.bose.com/guides/bose-soundtouch-api/bose-soundtouch-api-reference) where you'll find a bunch of API calls that you can make calls to.

# Screenshot

<div>
<center>
<img alt='Bose SoundTouch Web App Screenshot' src='https://github.com/ars75/Bose-SoundTouch-Web-App/blob/master/Bose%20Remote.png'/></a>
</center>
</div>
