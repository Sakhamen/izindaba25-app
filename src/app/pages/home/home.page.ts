import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, Config, IonList, IonContent } from '@ionic/angular';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { AlertService } from '../../services/alert.service';
import { NewsApiService } from '../../services/news-api.service';
import { NewsDataService } from '../../services/news-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Gets a reference to the element (s)
  @ViewChild('newsList', { static: true }) newsList: IonList;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  ios: boolean;
  segment = 'all';
  articles: any = [];
  queryText:string = '';
  showSearchbar: boolean;
  isDataLoaded: boolean = false;

  constructor(
    private config: Config,
    private alert: AlertService,
    private newsData: NewsDataService,
    private inAppBrowser: InAppBrowser,
    private socialSharing: SocialSharing,
    private newsAPIService: NewsApiService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';

    this.newsData.getFavoriteArticles();
    this.loadAllArticles();
  }

  ionViewWillEnter() {
    this.content.scrollToTop();
  }

  loadAllArticles() {

    this.newsAPIService.getInitialArticles().then(result => {
        console.log('getInitialArticles result', result);
        this.articles = result["articles"];
        this.isDataLoaded = true;
    }).catch(error => {
        console.log('getInitialArticles error', error);
        this.isDataLoaded = true;
        let errorText:any = error;
        if (errorText.status === 0) {
            this.alert.showAlert("We are having trouble connecting. Please check your WIFI and Mobile Internet settings.");
        } else {
            var theString = errorText.error;
            this.alert.showAlert(theString.description);
        }
    });
  }

  loadCoronaVirusArticles() {

    this.newsAPIService.getCoronaVirusArticles().then(result => {
        console.log('getCoronaVirusArticles result', result);
        this.articles = result["articles"];
        this.isDataLoaded = true;
    }).catch(error => {
        console.log('getCoronaVirusArticles error', error);
        this.isDataLoaded = true;
        let errorText:any = error;
        if (errorText.status === 0) {
            this.alert.showAlert("We are having trouble connecting. Please check your WIFI and Mobile Internet settings.");
        } else {
            var theString = errorText.error;
            this.alert.showAlert(theString.description);
        }
    });
  }

  getSourceImage(id: string) {
    if (!id) return '../assets/images/logo.png'
    let githubUrl = `https://raw.githubusercontent.com/Sakhamen/angular-news-app-with-material/master/src/assets/images/${id}.png`;
    return githubUrl;
  }

  search() {

    if (this.queryText.length < 4) return;

    console.log('start search***', this.queryText);

    this.newsAPIService.searchForArticle(this.queryText).then(result => {
        console.log('searchForArticle result', result);
        this.articles = result["articles"];
    }).catch(error => {
        console.log('getCoronaVirusArticles error', error);
        let errorText:any = error;
        if (errorText.status === 0) {
            this.alert.showAlert("We are having trouble connecting. Please check your WIFI and Mobile Internet settings.");
        } else {
            var theString = errorText.error;
            this.alert.showAlert(theString.description);
        }
    });

  }

  toggleSegment() {
    console.log('segment changed', this.segment);
    this.isDataLoaded = false;
    if (this.segment === "all") {
      this.loadAllArticles();
    } else {
      this.loadCoronaVirusArticles();
    }
  }

  saveArticle(article: any) {
    if (this.newsData.hasFavorite(article)) {
      this.alert.showToast("article already added.", "bottom");
    } else {
      // Add to favorite
      this.newsData.addToFavorite(article);
      this.alert.showToast("article was successfully added to favorite.");
    }
  }

  openFullArticle(url: string) {
    const target = "_self";
    const options: InAppBrowserOptions = {
      location:'no'
    };

    this.inAppBrowser.create(url, target, options);
  }

  async shareArticle(article: any) {
    let options = {
      message: `${article.title} from *Izindaba25* .`,
      image: article.urlToImage,
      url: article.url
    };

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Social Sharing',
      buttons: [{
        text: 'Share via Facebook',
        role: 'destructive',
        icon: 'logo-facebook',
        cssClass: 'facebookIcon',
        handler: () => {
          this.socialSharing.shareViaFacebook(options.message, options.image, options.url).then(res => {
            console.log('Facebook sharing success', res);
          }).catch(error => {
            console.error('Facebook sharing error', error);
            this.alert.showCustomAlert('Facebook Sharing Error', error);
          });
        }
      }, {
        text: 'Share via Twitter',
        icon: 'logo-twitter',
        cssClass: 'twitterIcon',
        handler: () => {
          this.socialSharing.shareViaTwitter(options.message, options.image, options.url).then(res => {
            console.log('Twitter sharing success', res);
          }).catch(error => {
            console.error('Twitter sharing error', error);
            this.alert.showCustomAlert('Twitter Sharing Error', error);
          });
        }
      }, {
        text: 'Share via Whatsapp',
        icon: 'logo-whatsapp',
        cssClass: 'whatsappIcon',
        handler: () => {
          this.socialSharing.shareViaWhatsApp(options.message, options.image, options.url).then(res => {
            console.log('Whatsapp sharing success', res);
          }).catch(error => {
            console.error('Whatsapp sharing error', error);
            this.alert.showCustomAlert('Whatsapp Sharing Error', error);
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }


}
