import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../shared/service/database/database.service';
import { Article } from '../shared/model/article';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  articles: Article[];

  constructor(private databaseService: DatabaseService) {
    this.databaseService.onLoadedFromDB.subscribe((articles: Article[]) => {
      this.articles = articles;
    });
  }

  ngOnInit(): void {}
}
