import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { Platform, AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  app_version: any;
  dark = false;

  appPages = [
    {
      title: 'Feed',
      url: '/tabs/home',
      icon: 'newspaper'
    },
    {
      title: 'Local',
      url: '/tabs/local-news',
      icon: 'compass'
    },
    {
      title: 'Favorite',
      url: '/tabs/bookmark',
      icon: 'bookmark'
    }
  ];

  constructor(
    private router: Router,
    private platform: Platform,
    private appVersion: AppVersion,
    private authService: AuthService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _location: Location,
    private alert: AlertService,
    private loader: LoaderService,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.appPages.map(page => {
          return page['active'] = (event.url === page.url);
        });
      }
    });
  }

  async initializeApp() {
    await this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();
      this.getDeviceInformation();
      this.backbuttonHandler();
    });
  }

  logout() {

    this.loader.show();
    this.authService.logoutUser().then(result => {
        // console.log('logout result', result);
        this.alert.showToast("Successfully logged out.");
        this.router.navigateByUrl('/login', { replaceUrl: true });
        this.loader.dismiss();
    }).catch(error => {
        console.log('error', error);
        this.alert.showAlert(error);
        this.loader.dismiss();
    });

  }

  private getDeviceInformation() {
     this.appVersion.getVersionNumber().then(value => {
         this.app_version = value;
      }, error => {
        console.error('getVersionNumber', error);
      });
  }

  private backbuttonHandler() {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (this._location.isCurrentPathEqualTo('/tabs/home')) {
        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.alert.showExitConfirm();
        processNextHandler();
      } else {
        // Navigate to back page
        this._location.back();
      }
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      });
    });
  }

}
