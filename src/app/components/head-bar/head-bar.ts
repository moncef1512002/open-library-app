import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-head-bar',
  standalone: false,
  templateUrl: './head-bar.html',
  styleUrl: './head-bar.css',
})
export class HeadBar implements OnInit {
  wishlistCount = 0;

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    // Subscribe to wishlist changes to update count
    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlistCount = wishlist.length;
    });
  }
}
