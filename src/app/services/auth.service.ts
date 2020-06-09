import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string;
  isLoggedIn = false;

  constructor(
    private storage: Storage,
    private platform: Platform
  ) {
    this.baseUrl = environment.api_url;
    this.platform.ready().then(() => {
      this.getToken();
    });
  }

  loginUser(user: any) {
    // fake promise
    let promise = new Promise((resolve) => {
      let currentUser = { username: user.username };
      this.isLoggedIn = true;
      this.setUser(currentUser);
      setTimeout(() => {
        resolve('Logged In');
      }, 2000); // 2sec delay
    });
    return promise;
  }

  logoutUser() {
    // fake promise
    let promise = new Promise((resolve) => {
        this.storage.clear().then(() => {console.log('storage cleared!'); }, error => console.error('logoutUser - clear error', error));
        setTimeout(() => {
          resolve('Logged Out');
        }, 2000); // 2sec delay
    });
    return promise;
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  async getToken() {
      return await this.storage.get('currentUser').then(
        data => {
          if(data) {
            this.isLoggedIn = true;
          } else {
            this.isLoggedIn = false;
          }
        }, error => {
          this.isLoggedIn = false;
        });
  }

  private async setUser(userData: any) {
    await this.storage.set('currentUser', userData).then(() => console.log('currentUser saved.'), error => console.error('saving currentUser error ', error));
  }

}
