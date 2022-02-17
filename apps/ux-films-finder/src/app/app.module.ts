import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleExComponent } from './components/simple-ex/simple-ex.component';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { ApiHttpInterceptor } from './interceptors/api-http.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { SearchPersonsComponent } from './components/search-persons/search-persons.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { CategoryComponent } from './components/category/category.component';
import { DetailsComponent } from './components/details/details.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { HeaderComponent } from './components/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { GenresBannerComponent } from './components/genres-banner/genres-banner.component';



@NgModule({
  declarations: [
    AppComponent,
    SimpleExComponent,
    SearchPersonsComponent,
    MainPageComponent,
    NotFoundPageComponent,
    CategoryComponent,
    DetailsComponent,
    AdvancedSearchComponent,
    HeaderComponent,
    SidenavListComponent,
    GenresBannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
