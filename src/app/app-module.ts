import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HeadBar } from './components/head-bar/head-bar';
import { SearchBar } from './components/search-bar/search-bar';
import { BookList } from './components/book-list/book-list';
import { BookDetails } from './components/book-details/book-details';
import { Wishlist } from './components/wishlist/wishlist';

@NgModule({
  declarations: [
    App,
    HeadBar,
    SearchBar,
    BookList,
    BookDetails,
    Wishlist
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
