import { Component, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../models/book';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  // Données statiques initiales (20 livres populaires sur l'informatique)
  filteredBooks: Book[] = [
    { key: '/works/OL17365W', title: '2001: A Space Odyssey', edition_count: 116, cover_id: 11344400, first_publish_year: 1968 },
    { key: '/works/OL46241W', title: 'I, Robot', edition_count: 98, cover_id: 12385229, first_publish_year: 1950 },
    { key: '/works/OL5725956W', title: 'Artemis Fowl', edition_count: 93, cover_id: 10212689, first_publish_year: 1999 },
    { key: '/works/OL4617640W', title: 'The C Programming Language', edition_count: 49, cover_id: 6684943, first_publish_year: 1978 },
    { key: '/works/OL80763W', title: 'Stormbreaker', edition_count: 50, cover_id: 5081706, first_publish_year: 2000 },
    { key: '/works/OL57786W', title: 'The Internet for Dummies', edition_count: 62, cover_id: 10934135, first_publish_year: 1993 },
    { key: '/works/OL7938163W', title: 'Advances in Computers', edition_count: 69, cover_id: 1094406, first_publish_year: 1995 },
    { key: '/works/OL5725961W', title: 'Artemis Fowl: The Eternity Code', edition_count: 63, cover_id: 12636263, first_publish_year: 2003 },
    { key: '/works/OL64843W', title: 'Mastering Today\'s Software', edition_count: 49, cover_id: 1063675, first_publish_year: 1992 },
    { key: '/works/OL3155000W', title: 'Introducing Computers', edition_count: 45, cover_id: 4642108, first_publish_year: 1988 },
    { key: '/works/OL65487W', title: 'Upgrading and Repairing PCs', edition_count: 44, cover_id: 554975, first_publish_year: 1988 },
    { key: '/works/OL98484W', title: 'Player Piano', edition_count: 44, cover_id: 280246, first_publish_year: 1952 },
    { key: '/works/OL45883W', title: 'Neuromancer', edition_count: 42, cover_id: 6546454, first_publish_year: 1984 },
    { key: '/works/OL17901W', title: 'Foundation', edition_count: 40, cover_id: 7735481, first_publish_year: 1951 },
    { key: '/works/OL27258W', title: 'The Hitchhiker\'s Guide to the Galaxy', edition_count: 38, cover_id: 103107, first_publish_year: 1979 },
    { key: '/works/OL262738W', title: 'Cryptonomicon', edition_count: 36, cover_id: 28446, first_publish_year: 1999 },
    { key: '/works/OL1168083W', title: 'Code Complete', edition_count: 34, cover_id: 384224, first_publish_year: 1993 },
    { key: '/works/OL16679266W', title: 'Clean Code', edition_count: 32, cover_id: 6663947, first_publish_year: 2008 },
    { key: '/works/OL15180797W', title: 'The Pragmatic Programmer', edition_count: 30, cover_id: 311672, first_publish_year: 1999 },
    { key: '/works/OL17365413W', title: 'Head First Design Patterns', edition_count: 28, cover_id: 254908, first_publish_year: 2004 }
  ];

  constructor(private router: Router, private bookService: BookService, private cdr: ChangeDetectorRef) { }

  onSearch(event: { title: string, year: number | null }): void {
    const { title, year } = event;

    // Si vide, retourner aux données statiques
    if (!title && !year) {
      this.filteredBooks = this.filteredBooks.length > 0 ? this.filteredBooks : this.filteredBooks;
      return;
    }

    // Sinon, rechercher via l'API
    console.log('Recherche API:', title, year);
    this.bookService.searchBooks(title, year || undefined).subscribe({
      next: (data) => {
        if (data.docs && data.docs.length > 0) {
          this.filteredBooks = data.docs.map((doc: any) => ({
            key: doc.key,
            title: doc.title,
            edition_count: doc.edition_count,
            cover_id: doc.cover_i,
            first_publish_year: doc.first_publish_year,
            subtitle: doc.subtitle
          }));
          console.log('Résultats trouvés:', this.filteredBooks.length);
          this.cdr.detectChanges(); // Force UI update
        } else {
          console.log('Aucun résultat');
        }
      },
      error: (err) => {
        console.error('Erreur de recherche:', err);
      }
    });
  }

  viewDetails(key: string): void {
    const id = key.replace('/works/', '');
    this.router.navigate(['/details', id]);
  }
}
