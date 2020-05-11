import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../database/database.service';
import { Article } from '../../model/article';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiKey: string = 'bb8b1180d2564bda8fdad5388e19e495';

  articles: Article[];

  constructor(
    private httpClient: HttpClient,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.databaseService.onInitialized.subscribe(async () => {
      //await this.getNewsFromApi();
      await this.getNewsFromServer();
      this.getNewsFromIndexedDB();
    });

    this.databaseService.onStoredArticleInDB.subscribe((article: Article) => {
      console.log('TRYING TO SAVE ON DB');
      this.saveArticleOnServer(article);
    });
  }

  async getNewsFromApi() {
    let data = await this.httpClient
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${this.apiKey}`
      )
      .toPromise();

    let articles = data['articles'];
    this.articles = articles;
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
    this.articles = articles;
    this.databaseService.storeArticlesInDB(articles);
  }

  async saveArticleOnServer(article: Article) {
    if (article._id.length != 24) {
      await this.httpClient
        .post('http://localhost:8000/api/articles', article)
        .toPromise();

      console.log('New article created successfully in Server DB.');
      return;
    }

    await this.httpClient
      .put('http://localhost:8000/api/articles/' + article._id, article)
      .toPromise();

    console.log('Article updated successfully in Server DB:' + article._id);
  }
}
