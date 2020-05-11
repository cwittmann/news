import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
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

  @ViewChild('title') title: ElementRef;
  @ViewChild('description') description: ElementRef;
  @ViewChild('content') content: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private renderer: Renderer2
  ) {}

  save(_id) {
    this.databaseService.storeArticleInDB(this.article);
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

  ngAfterViewChecked() {
    this.resizeElement(this.title);
    this.resizeElement(this.description);
    this.resizeElement(this.content);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resizeElement(elementRef: ElementRef) {
    let scrollHeight = elementRef.nativeElement.scrollHeight;

    this.renderer.setStyle(
      elementRef.nativeElement,
      'height',
      scrollHeight + 'px'
    );
  }
}
