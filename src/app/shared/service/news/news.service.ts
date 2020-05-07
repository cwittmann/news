import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../database/database.service';
import { Article } from '../../model/article';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiKey: string = 'bb8b1180d2564bda8fdad5388e19e495';

  constructor(
    private httpClient: HttpClient,
    private databaseService: DatabaseService
  ) {
    databaseService.onInitialized.subscribe(async () => {
      //await this.getNewsFromApi();
      //await this.getNewsFromServer();
      this.getNewsFromIndexedDB();
    });
  }

  async getNewsFromApi() {
    let data = await this.httpClient
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${this.apiKey}`
      )
      .toPromise();

    let articles = data['articles'];
    this.databaseService.storeArticlesInDB(articles);
  }

  async getNewsFromIndexedDB() {
    this.databaseService.requestArticlesFromDB();
  }

  async getNewsFromServer() {
    let data = await this.httpClient
      .get('http://localhost:8000/api/articles')
      .toPromise();

    let articles = data as Article[];
    this.databaseService.storeArticlesInDB(articles);
  }
}
