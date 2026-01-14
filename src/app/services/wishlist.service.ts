import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    private readonly STORAGE_KEY = 'library-wishlist';
    private wishlistSubject: BehaviorSubject<any[]>;
    public wishlist$: Observable<any[]>;

    constructor() {
        const stored = this.getStoredWishlist();
        this.wishlistSubject = new BehaviorSubject<any[]>(stored);
        this.wishlist$ = this.wishlistSubject.asObservable();
    }

    private getStoredWishlist(): any[] {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    private saveToStorage(wishlist: any[]): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wishlist));
        } catch (error) {
            console.error('Failed to save wishlist to localStorage', error);
        }
    }

    getWishlist(): any[] {
        return this.wishlistSubject.value;
    }

    addToWishlist(book: any): boolean {
        const currentWishlist = this.getWishlist();
        const exists = currentWishlist.some(item => item.key === book.key);

        if (!exists) {
            const updatedWishlist = [...currentWishlist, book];
            this.wishlistSubject.next(updatedWishlist);
            this.saveToStorage(updatedWishlist);
            return true;
        }
        return false;
    }

    removeFromWishlist(bookKey: string): void {
        const currentWishlist = this.getWishlist();
        const updatedWishlist = currentWishlist.filter(item => item.key !== bookKey);
        this.wishlistSubject.next(updatedWishlist);
        this.saveToStorage(updatedWishlist);
    }

    isInWishlist(bookKey: string): boolean {
        return this.getWishlist().some(item => item.key === bookKey);
    }

    clearWishlist(): void {
        this.wishlistSubject.next([]);
        this.saveToStorage([]);
    }

    getWishlistCount(): number {
        return this.getWishlist().length;
    }
}
