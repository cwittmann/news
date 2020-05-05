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

  constructor(private databaseService: DatabaseService) {
    this.databaseService.onLoadedFromDB.subscribe((articles: Article[]) => {
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
    });
  }

  adjustArticle(article: Article) {
    if (
      article.author?.length > 20 ||
      !article.author?.match(/^[a-zA-Z\s]+$/)
    ) {
      article.author = undefined;
    }

    let randomNumber = Math.floor(Math.random() * Math.floor(6));
    switch (randomNumber) {
      case 0:
        article.category = 'Business';
        break;
      case 1:
        article.category = 'Entertainment';
        break;
      case 2:
        article.category = 'Health';
        break;
      case 3:
        article.category = 'International';
        break;
      case 4:
        article.category = 'Politics';
        break;
      case 5:
        article.category = 'Sports';
        break;
    }

    let end = article.content?.indexOf('[');
    article.content = article.content?.substring(0, end);
  }

  ngOnInit(): void {}
}
