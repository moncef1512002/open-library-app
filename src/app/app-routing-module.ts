import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookList } from './components/book-list/book-list';
import { BookDetails } from './components/book-details/book-details';
import { Wishlist } from './components/wishlist/wishlist';

const routes: Routes = [
  { path: '', component: BookList },
  { path: 'details/:id', component: BookDetails },
  { path: 'wishlist', component: Wishlist }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
