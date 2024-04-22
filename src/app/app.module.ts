import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './modules/home/page/home/home.component';
import { FiltersComponent } from './modules/home/components/filters/filters.component';
import { CardItemsComponent } from './modules/home/components/card-items/card-items.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination'

@NgModule({
  declarations: [
    AppComponent, HomeComponent, FiltersComponent, CardItemsComponent

  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
