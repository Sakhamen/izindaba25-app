import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private loadingController: LoadingController) { }

  async show(message?: any) {
    if (!message) message = 'Please wait...';
    await this.loadingController.create({message: message})
      .then(res => {
        res.present();
      });
  }

  async showWithDismiss(message: any) {
    await this.loadingController.create({backdropDismiss: true, message: message})
      .then(res => {
        res.present();
      });
  }

  async dismiss() {
    while (await this.loadingController.getTop() !== undefined) {
       await this.loadingController.dismiss();
     }
  }

}
