import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatabaseService } from './service/database/database.service';
import { NewsService } from './service/news/news.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [DatabaseService, NewsService],
})
export class SharedModule {}
