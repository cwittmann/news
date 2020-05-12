import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../shared/service/database/database.service';
import { Article } from '../shared/model/article';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../shared/service/news/news.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  articles: Article[];
  category: String;
  articleSubscription: any;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.ngOnDestroy();
      this.ngOnInit();
    });
  }

  adjustArticle(article: Article) {
    if (
      article.author?.length > 20 ||
      !article.author?.match(/^[a-zA-Z\s]+$/)
    ) {
      article.author = undefined;
    }
  }

  ngOnInit(): void {
    this.category = this.route.snapshot.params['category'];

    this.articleSubscription = this.databaseService.onLoadedArticlesFromDB.subscribe(
      (articles: Article[]) => {
        this.articles = [];
        for (let article of articles) {
          if (this.category != undefined && article.category != this.category) {
            continue;
          }
          if (!article.content) {
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
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }
}
