import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ArticleComponent } from './article/article.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'articles', component: MainComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: '*', redirectTo: 'articles', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
