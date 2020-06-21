import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  showSkip = true;

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.storage.get('ion_did_welcome').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });

    this.menuCtrl.enable(false);
  }

  startApp() {
    this.router
      .navigateByUrl('/login', { replaceUrl: true })
      .then(() => this.storage.set('ion_did_welcome', true));
  }

  onSlideChangeStart(event: any) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }

}
