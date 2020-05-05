import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../database/database.service';

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
      // await this.getNewsFromApi();
      this.getNewsFromDB();
    });
  }

  async getNewsFromApi() {
    let data = await this.httpClient
      .get(
        `https://newsapi.org/v2/everything?q=nuremberg&lang=en&pageSize=100&apiKey=${this.apiKey}`
      )
      .toPromise();

    let articles = data['articles'];
    this.databaseService.storeArticlesInDB(articles);
  }

  async getNewsFromDB() {
    this.databaseService.requestArticlesFromDB();
  }
}
