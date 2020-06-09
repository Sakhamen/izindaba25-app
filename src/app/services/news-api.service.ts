import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  baseUrl: string;
  api_key: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.api_url;
    this.api_key = environment.api_key;
  }

  getInitialArticles() {
    let data = {
      country: 'us',
      apiKey: this.api_key
    };

    let promise = new Promise((resolve, reject) => {
        this.http.get(`${this.baseUrl}/top-headlines`, {params: data})
            .toPromise()
            .then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
    });
    return promise;
  }

  searchForArticle(searchText: string) {
    let data = {
      q: searchText,
      apiKey: this.api_key
    };

    let promise = new Promise((resolve, reject) => {
        this.http.get(`${this.baseUrl}/everything`, {params: data})
            .toPromise()
            .then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
    });
    return promise;
  }

  getArticlesByCountryCode(countryCode: string) {
    let data = {
      country: countryCode,
      apiKey: this.api_key
    };

    let promise = new Promise((resolve, reject) => {
        this.http.get(`${this.baseUrl}/top-headlines`, {params: data})
            .toPromise()
            .then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
    });
    return promise;
  }

  getArticlesBySource(source: string) {
    let data = {
      sources: source,
      apiKey: this.api_key
    };

    let promise = new Promise((resolve, reject) => {
        this.http.get(`${this.baseUrl}/top-headlines`, {params: data})
            .toPromise()
            .then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
    });
    return promise;
  }

  getCoronaVirusArticles() {
    let data = {
      q: 'covid-19',// corona virus
      apiKey: this.api_key
    };

    let promise = new Promise((resolve, reject) => {
        this.http.get(`${this.baseUrl}/top-headlines`, {params: data})
            .toPromise()
            .then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
    });
    return promise;
  }

}
