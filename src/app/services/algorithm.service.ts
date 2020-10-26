import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  constructor() { }

  filterNullArticles(articles: any) {
    return articles.filter(article => (article.urlToImage));
  }

  getImageUrl(imageStr: string) {
    var nullWords = /googleusercontent/ig; // text1|text2
    var imageRegex = /[\/.](jpe?g|png|gif)$/i;
    return (imageRegex.test(imageStr)) ? imageStr : (nullWords.test(imageStr)) ? null : `${imageStr}.jpg`;
  }

}
