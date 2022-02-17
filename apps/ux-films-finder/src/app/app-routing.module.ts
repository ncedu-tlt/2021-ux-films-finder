import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { CategoryComponent } from './components/category/category.component';
import { DetailsComponent } from './components/details/details.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { SearchPersonsComponent } from './components/search-persons/search-persons.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SimpleExComponent } from './components/simple-ex/simple-ex.component';
const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'search-films', component: AdvancedSearchComponent },
  { path: 'comedy', component: CategoryComponent },
  { path: 'horror', component: CategoryComponent },
  { path: 'action', component: CategoryComponent },
  { path: 'drama', component: CategoryComponent },
  { path: 'adventure', component: CategoryComponent },
  { path: 'fantasy', component: CategoryComponent },
  { path: 'thriller', component: CategoryComponent },
  { path: 'romance', component: CategoryComponent },
  { path: 'family', component: CategoryComponent },
  { path: 'news', component: CategoryComponent },
  { path: 'show', component: CategoryComponent },
  { path: 'child', component: CategoryComponent },
  { path: 'cartoon', component: CategoryComponent },
  { path: 'search-persons', component: SearchPersonsComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'simple-ex', component: SimpleExComponent },
  { path: '**', component: NotFoundPageComponent }
];
@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
