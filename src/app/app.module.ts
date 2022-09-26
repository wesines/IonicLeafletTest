import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/User.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    FormsModule,
    Geolocation,
    HttpClient,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
