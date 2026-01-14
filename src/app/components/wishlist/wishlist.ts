import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';

@Component({
    selector: 'app-wishlist',
    standalone: false,
    templateUrl: './wishlist.html',
    styleUrl: './wishlist.css'
})
export class Wishlist implements OnInit {
    wishlistBooks: any[] = [];

    constructor(
        private wishlistService: WishlistService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadWishlist();

        // Subscribe to wishlist changes
        this.wishlistService.wishlist$.subscribe(books => {
            this.wishlistBooks = books;
        });
    }

    loadWishlist(): void {
        this.wishlistBooks = this.wishlistService.getWishlist();
    }

    removeFromWishlist(bookKey: string): void {
        this.wishlistService.removeFromWishlist(bookKey);
    }

    viewDetails(bookKey: string): void {
        this.router.navigate(['/details', bookKey]);
    }

    clearWishlist(): void {
        if (confirm('Are you sure you want to clear your entire wishlist?')) {
            this.wishlistService.clearWishlist();
        }
    }
}
