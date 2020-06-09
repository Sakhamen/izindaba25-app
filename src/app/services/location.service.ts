import { Injectable } from '@angular/core';

// location imports
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // geolocation options
  private geolocationOptions: GeolocationOptions = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };

  // geocoder options
  private nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private locationAccuracy: LocationAccuracy,
    private androidPermissions: AndroidPermissions
  ) { }

  async getLocationCoordinates() {
     return new Promise((resolve, reject) => {
       this.geolocation.getCurrentPosition(this.geolocationOptions).then((resp) => {
       this.getLocationAddress(resp.coords).then((response) => {
         resolve(response);
     }, error => reject(error));
    }).catch((error) => {
       reject(error);
     });
    });
  }

  async getLocationAddress(coords: any) {
    const {latitude, longitude} = coords;
     return new Promise((resolve, reject) => {
       this.nativeGeocoder.reverseGeocode(latitude, longitude, this.nativeGeocoderOptions).then((resp) => {
           resolve(resp[0]);
       }).catch((error) => {
           reject(error);
       });
    });
  }

  async checkGPSPermission() {
    return new Promise((resolve, reject) => {
       this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
          result => {
            if (result.hasPermission) {
               //If having permission show 'Turn On GPS' dialogue
               this.askToTurnOnGPS().then((response) => {
                 resolve(response);
             }, error => reject(error));
           } else {
             //If not having permission ask for permission
             this.requestGPSPermission().then((response) => {
                resolve(response);
              }, error => reject(error));
             }
           },
           err => {
             reject(err);
           });
        });
  }

  private async requestGPSPermission() {
     return new Promise((resolve, reject) => {
       this.locationAccuracy.canRequest().then((canRequest: boolean) => {
         if (canRequest) {
            console.log("4");
         } else {
          //Show 'GPS Permission Request' dialogue
             this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(() => {
              // call method to turn on GPS
              this.askToTurnOnGPS().then((response) => {
                 console.log('askToTurnOnGPS-requestGPSPermission', response);
                 resolve(response);
               }, error => reject(error));
             },
              error => {
               //Show alert if user click on 'No Thanks'
               reject('requestPermission Error requesting location permissions\n' + error.message);
              });
         }
      });
     });
  }

  private async askToTurnOnGPS() {
   return new Promise((resolve, reject) => {
       this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then((resp) => {
          // When GPS Turned ON call method to get Accurate location coordinates
          resolve(resp);
       }, error => {
          reject(error);
      });
   });
  }

}
