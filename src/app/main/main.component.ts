import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../shared/service/database/database.service';
import { Article } from '../shared/model/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  articles: Article[] = [];
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

    let end = article.content?.indexOf('[');
    article.content = article.content?.substring(0, end);
  }

  ngOnInit(): void {
    this.category = this.route.snapshot.params['category'];

    this.articleSubscription = this.databaseService.onLoadedArticlesFromDB.subscribe(
      (articles: Article[]) => {
        this.articles = [];
        for (let article of articles) {
          if (article.category == 'Health') {
          }

          if (this.category != undefined && article.category != this.category) {
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
