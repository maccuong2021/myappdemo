import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component'; 
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './modules/login/login.component';

@NgModule({  
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    AppComponent 
  ],
  providers: [],
})
export class AppModule {}
