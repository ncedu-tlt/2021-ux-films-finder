import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleExComponent } from './components/simple-ex/simple-ex.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ApiHttpInterceptor } from './interceptors/api-http.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { SearchPersonsComponent } from './components/search-persons/search-persons.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { CategoryComponent } from './components/category/category.component';
import { DetailsComponent } from './components/details/details.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { MatListModule } from '@angular/material/list';
import { GenresBannerComponent } from './components/genres-banner/genres-banner.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { PersonComponent } from './components/person/person.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent,
    SimpleExComponent,
    SearchPersonsComponent,
    MainPageComponent,
    NotFoundPageComponent,
    CategoryComponent,
    CardComponent,
    DetailsComponent,
    AdvancedSearchComponent,
    GenresBannerComponent,
    FooterComponent,
    HeaderComponent,
    SidenavListComponent,
    GenresBannerComponent,
    SwitcherComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatFormFieldModule,
    FormsModule
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
