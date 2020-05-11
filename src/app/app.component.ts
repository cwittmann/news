import { Component } from '@angular/core';
import { DatabaseService } from './shared/service/database/database.service';
import { NewsService } from './shared/service/news/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'news';

  constructor(
    private databaseService: DatabaseService,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.databaseService.ngOnInit();
    this.newsService.ngOnInit();
  }
}
