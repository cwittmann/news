import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/model/article';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../shared/service/database/database.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  _id: String;
  article: Article;
  subscription: any;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService
  ) {}

  get formControls() {
    return this.form.controls;
  }

  submit() {
    this.form.markAllAsTouched();
    this.article = this.form.value as Article;
    this.databaseService.storeArticleInDB(this.article);
  }

  async ngOnInit(): Promise<void> {
    this._id = this.route.snapshot.params['id'];
    this.subscription = this.databaseService.onLoadedArticleFromDB.subscribe(
      (article: Article) => {
        this.article = article;
        this.form.markAllAsTouched();
        this.form.setValue(this.article);
      }
    );
    this.databaseService.requestArticleFromDB(this._id);

    this.form = new FormGroup({
      _id: new FormControl(''),
      author: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      url: new FormControl(''),
      urlToImage: new FormControl(''),
      publishedAt: new FormControl(''),
      content: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      createdAt: new FormControl(''),
      updatedAt: new FormControl(''),
      __v: new FormControl(''),
    });
  }
  ngOnDestory() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
