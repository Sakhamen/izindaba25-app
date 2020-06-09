import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckTutorialService implements CanLoad {

  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  canLoad() {
    return this.storage.get('ion_did_welcome').then(res => {
      if (res) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });
  }
}
