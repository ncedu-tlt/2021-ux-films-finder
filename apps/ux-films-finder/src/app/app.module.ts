import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleExComponent } from './components/simple-ex/simple-ex.component';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { ApiHttpInterceptor } from './interceptors/api-http.interceptor';

@NgModule({
  declarations: [AppComponent, SimpleExComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule
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
