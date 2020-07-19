import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { NewsDataService } from '../../services/news-data.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
})
export class BookmarkPage implements OnInit {

  articles: any = [];
  isDataLoaded: boolean = false;

  constructor(
    private storage: Storage,
    private alert: AlertService,
    private newsData: NewsDataService,
    private alertCtrl: AlertController,
    private inAppBrowser: InAppBrowser
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.newsData.getFavoriteArticles();
    this.loadArticles();
  }

  loadArticles() {
    this.storage.get('news').then(result => {
      console.log('result getFavoriteArticles', result);
      this.articles = result;
      this.isDataLoaded = true;
    })
    .catch(error => {
      this.isDataLoaded = true;
      this.alert.showAlert(error);
    });
  }

  getSourceImage(id: string) {
    if (!id) return '../assets/images/logo.png'
    let githubUrl = `https://raw.githubusercontent.com/Sakhamen/angular-news-app-with-material/master/src/assets/images/${id}.png`;
    return githubUrl;
  }

  openFullArticle(url: string) {
    const target = "_self";
    const options: InAppBrowserOptions = {
      location: 'no',
      zoom: 'no'
    };

    this.inAppBrowser.create(url, target, options);
  }

  async removeArticle(slidingItem: IonItemSliding, article: any, index: number) {

    const alert = await this.alertCtrl.create({
      header: article.title,
      message: 'Would you like to remove this article from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the article
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.newsData.removeFavorite(article);
            this.articles.splice(index, 1);

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    await alert.present();

  }

}
