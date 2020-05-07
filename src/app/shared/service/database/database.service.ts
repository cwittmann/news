import { Injectable, EventEmitter } from '@angular/core';
import { Article } from '../../model/article';
import { openDB, deleteDB, wrap, unwrap } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  onInitialized: EventEmitter<Boolean>;
  onLoadedArticlesFromDB: EventEmitter<Article[]>;
  onLoadedArticleFromDB: EventEmitter<Article>;

  db: any;

  constructor() {
    this.onInitialized = new EventEmitter();
    this.onLoadedArticlesFromDB = new EventEmitter();
    this.onLoadedArticleFromDB = new EventEmitter();
  }

  ngOnInit(): void {
    let db;
    let dbReq = indexedDB.open('newsDB', 2);

    dbReq.onupgradeneeded = function (event: any) {
      db = event.target.result;
      db.createObjectStore('article', { keyPath: '_id', autoIncrement: true });
    };

    dbReq.onsuccess = function (event: any) {
      db = event.target.result;
      this.onInitialized.emit(true);
    }.bind(this);

    dbReq.onerror = function (event: any) {
      alert('error opening database ' + event.target.errorCode);
    };
  }

  public storeArticlesInDB(articles) {
    let indexedDB = window.indexedDB;
    let open = indexedDB.open('newsDB', 2);

    open.onsuccess = function () {
      let db = open.result;
      let transaction = db.transaction('article', 'readwrite');
      let store = transaction.objectStore('article');
      store.clear();

      for (let article of articles) {
        store.add(article);
      }

      transaction.oncomplete = function () {
        console.log('All articles stored in IndexedDB.');
      };
      transaction.onerror = function (event: any) {
        alert('Error storing article ' + event.target.errorCode);
      };
    };
  }

  public async requestArticlesFromDB() {
    const db = await openDB('newsDB', 2);

    const transaction = db.transaction('article', 'readwrite');
    const store = await transaction.objectStore('article');
    const articles = await db
      .transaction('article')
      .objectStore('article')
      .getAll();

    this.onLoadedArticlesFromDB.emit(articles);
    console.log('All articles retrieved from IndexedDB.');
  }

  public async requestArticleFromDB(_id) {
    const db = await openDB('newsDB', 2);

    const transaction = db.transaction('article', 'readwrite');
    const store = await transaction.objectStore('article');

    const article = await db
      .transaction('article')
      .objectStore('article')
      .get(_id);

    this.onLoadedArticleFromDB.emit(article);
    console.log('Article retrieved from IndexedDB: ' + _id);
  }
}
