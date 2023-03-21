import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ImageUploadComponent } from './pages/home/image-upload/image-upload.component';
import { HomeComponent } from './pages/home/home.component';
import { WhatAreYouComponent } from './pages/what-are-you/what-are-you.component';
import { PredictionItemComponent } from './pages/predictions/prediction-item/prediction-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ImageUploadComponent,
    HomeComponent,
    WhatAreYouComponent,
    PredictionItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
