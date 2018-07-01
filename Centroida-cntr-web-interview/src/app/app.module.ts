import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddressService } from './address.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddressDetailsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

    AppRoutingModule
  ],
  providers: [
    AddressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
