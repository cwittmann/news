import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../shared/service/database/database.service';
import { Article } from '../shared/model/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  _id: String;
  article: Article;
  subscription: any;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  edit(_id) {
    this.router.navigate(['/edit', _id]);
  }

  async ngOnInit(): Promise<void> {
    this._id = this.route.snapshot.params['id'];
    this.subscription = this.databaseService.onLoadedArticleFromDB.subscribe(
      (article: Article) => {
        this.article = article;
      }
    );
    this.databaseService.requestArticleFromDB(this._id);
  }
  ngOnDestory() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
