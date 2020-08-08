import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: any;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private alert: AlertService,
    private loader: LoaderService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController
  ) {
    this.loginForm  = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // console.log('login value?', this.loginForm.value);

    this.loader.show();
    this.authService.loginUser(this.loginForm.value).then(result => {
        // console.log('login result', result);
        this.loginForm.reset();
        this.alert.showToast("Successfully logged in.");
        this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
        this.loader.dismiss();
    }).catch(error => {
        console.log('error', error);
        this.alert.showAlert(error);
        this.loader.dismiss();
    });

  }

  guestLogin() {
    let data = { username: 'Guest07' };

    this.loader.show();
    this.authService.loginUser(data).then(() => {
        this.loginForm.reset();
        this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
        this.loader.dismiss();
        this.alert.showToast("Successfully logged in.");
    }).catch(error => {
        console.log('error', error);
        this.alert.showAlert(error);
        this.loader.dismiss();
    });
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

}
