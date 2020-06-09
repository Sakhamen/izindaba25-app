import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { News } from '../interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {
  private favorites: News[] = [];
  private loaded: boolean = false;

  constructor(
    private storage: Storage
  ) { }

  getFavoriteArticles(): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.get('news').then((result) => {
        if (result) {
          this.favorites = result;
        }
        this.loaded = true;
        resolve(true);
      });

    });

  }

  hasFavorite(article: any): boolean {
    return (this.favorites.findIndex(favorite => favorite.title === article.title) > -1);
  }

  getFavoriteById(id: string): News {
    // Return the news article that has an id matching the id passed in
    return this.favorites.find(favorite => favorite.id === id);
  }

  addToFavorite(article: any): void {
    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.favorites.map(favorite => parseInt(favorite.id)), 0) + 1;

    this.favorites.push({
      id: id.toString(),
      author: article.author,
      content: article.content,
      description: article.description,
      publishedAt: article.publishedAt,
      source: article.source,
      title: article.title,
      urlToImage: article.urlToImage,
      url: article.url
    });

    this.saveArticle();
  }

  removeFavorite(article: any): void {
    const index = this.favorites.findIndex(favorite => favorite.title === article.title);
    if (index > -1) {
      this.favorites.splice(index, 1);
      this.saveArticle();
    }
  }

  private saveArticle() {
    // Save the current array of notes to storage
    this.storage.set('news', this.favorites);
  }
}
