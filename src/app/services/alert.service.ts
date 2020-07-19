import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async showAlert(message: any) {
    const alert = await this.alertController.create({
      header: 'Notification:',
      message: message,
      buttons: ['OK'],
      backdropDismiss: false
    });
    await alert.present();
  }

  async showInterceptorAlert() {
    const alert = await this.alertController.create({
      header: "Unauthorized",
      subHeader: "Your credentials have expired. Please log in.",
      buttons: ['OK']
    });
    await alert.present();
  }

  async showCustomAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showExitConfirm() {
    const alert = await this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Exit canceled!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
  }

  async showToast(msg: any, position?: any) {
    if (!position) position = 'top';
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: position
    });
    await toast.present();
  }

}
