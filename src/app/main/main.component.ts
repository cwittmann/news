import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../shared/service/database/database.service';
import { Article } from '../shared/model/article';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  articles: Article[] = [];
  subscription: any;

  constructor(private databaseService: DatabaseService) {}

  adjustArticle(article: Article) {
    if (
      article.author?.length > 20 ||
      !article.author?.match(/^[a-zA-Z\s]+$/)
    ) {
      article.author = undefined;
    }

    let end = article.content?.indexOf('[');
    article.content = article.content?.substring(0, end);
  }

  ngOnInit(): void {
    this.subscription = this.databaseService.onLoadedArticlesFromDB.subscribe(
      (articles: Article[]) => {
        this.articles = [];
        for (let article of articles) {
          if (
            article.urlToImage == undefined ||
            article.description == undefined ||
            article.description?.length < 50 ||
            article.content == undefined ||
            article.content.length < 100
          ) {
            continue;
          }

          this.adjustArticle(article);
          this.articles.push(article);
        }
      }
    );

    this.databaseService.requestArticlesFromDB();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
