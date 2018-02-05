import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './routing/app-routing.module';
import { FieldRoutingModule } from './routing/routing.module';

import { SocketSerService } from './services/socket-ser/socket-ser.service';
import { WrapComponent } from './components/main/wrap/wrap.component';
import { FieldListComponent } from './components/app/field-list/field-list.component';
import { FieldDetailComponent } from './components/app/field-detail/field-detail.component';
import { HomeComponent } from './components/main/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapComponent,
    FieldListComponent,
    FieldDetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FieldRoutingModule
  ],
  providers: [SocketSerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
