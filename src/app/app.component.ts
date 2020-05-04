import { Component } from '@angular/core';
import { NewsService } from './shared/service/news/news.service';
import { DatabaseService } from './shared/service/database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'news';

  constructor(
    private newsService: NewsService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.databaseService.ngOnInit();
  }
}
