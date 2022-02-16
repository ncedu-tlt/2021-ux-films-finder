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
  { path: 'comedy', component: CategoryComponent, data: { genreId: 13 } },
  { path: 'horror', component: CategoryComponent, data: { genreId: 17 } },
  { path: 'action', component: CategoryComponent, data: { genreId: 11 } },
  { path: 'drama', component: CategoryComponent, data: { genreId: 2 } },
  { path: 'adventure', component: CategoryComponent, data: { genreId: 7 } },
  { path: 'fantasy', component: CategoryComponent, data: { genreId: 6 } },
  { path: 'thriller', component: CategoryComponent, data: { genreId: 1 } },
  { path: 'romance', component: CategoryComponent, data: { genreId: 4 } },
  { path: 'family', component: CategoryComponent, data: { genreId: 19 } },
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
