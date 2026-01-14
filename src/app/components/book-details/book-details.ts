import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-book-details',
  standalone: false,
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails {
  book: any = null;
  bookKey: string = '';

  private readonly BOOKS: any = {
    'OL17365W': {
      title: '2001: A Space Odyssey',
      subtitle: 'Arthur C. Clarke',
      description: 'A classic science fiction novel about space exploration and artificial intelligence.',
      first_publish_date: '1968',
      covers: [11344400],
      price: 14.99,
      rating: 4.8,
      pages: 297,
      language: 'English',
      genre: ['Science Fiction', 'Classic'],
      isbn: '978-0451457998',
      status: 'Available'
    },
    'OL46241W': {
      title: 'I, Robot',
      subtitle: 'Isaac Asimov',
      description: 'A collection of short stories about robots and the Three Laws of Robotics.',
      first_publish_date: '1950',
      covers: [12385229],
      price: 12.99,
      rating: 4.7,
      pages: 224,
      language: 'English',
      genre: ['Science Fiction', 'Short Stories'],
      isbn: '978-0553382563',
      status: 'Available'
    },
    'OL5725956W': {
      title: 'Artemis Fowl',
      subtitle: 'Eoin Colfer',
      description: 'A young criminal mastermind kidnaps a fairy for ransom in this modern fantasy adventure.',
      first_publish_date: '1999',
      covers: [10212689],
      price: 16.99,
      rating: 4.5,
      pages: 280,
      language: 'English',
      genre: ['Fantasy', 'Young Adult'],
      isbn: '978-0786808014',
      status: 'Available'
    },
    'OL4617640W': {
      title: 'The C Programming Language',
      subtitle: 'Brian W. Kernighan & Dennis M. Ritchie',
      description: 'The definitive guide to C programming, written by the creators of the language.',
      first_publish_date: '1978',
      covers: [6684943],
      price: 49.99,
      rating: 4.9,
      pages: 272,
      language: 'English',
      genre: ['Programming', 'Computer Science'],
      isbn: '978-0131103627',
      status: 'Available'
    },
    'OL80763W': {
      title: 'Stormbreaker',
      subtitle: 'Anthony Horowitz',
      description: 'The first Alex Rider adventure where a teenage spy uncovers a sinister plot.',
      first_publish_date: '2000',
      covers: [5081706],
      price: 13.99,
      rating: 4.6,
      pages: 192,
      language: 'English',
      genre: ['Adventure', 'Thriller'],
      isbn: '978-0142406113',
      status: 'Available'
    },
    'OL57786W': {
      title: 'The Internet for Dummies',
      subtitle: 'John R. Levine, Carol Baroudi',
      description: 'A comprehensive guide to understanding and using the Internet for beginners.',
      first_publish_date: '1993',
      covers: [10934135],
      price: 24.99,
      rating: 4.2,
      pages: 432,
      language: 'English',
      genre: ['Technology', 'Reference'],
      isbn: '978-0764568190',
      status: 'Available'
    },
    'OL7938163W': {
      title: 'Advances in Computers',
      subtitle: 'Marvin V. Zelkowitz',
      description: 'A series covering the latest developments in computer science and technology.',
      first_publish_date: '1995',
      covers: [1094406],
      price: 89.99,
      rating: 4.3,
      pages: 512,
      language: 'English',
      genre: ['Computer Science', 'Academic'],
      isbn: '978-0120121492',
      status: 'Limited'
    },
    'OL5725961W': {
      title: 'Artemis Fowl: The Eternity Code',
      subtitle: 'Eoin Colfer',
      description: 'The third book in the Artemis Fowl series, featuring high-tech adventures.',
      first_publish_date: '2003',
      covers: [12636263],
      price: 15.99,
      rating: 4.6,
      pages: 309,
      language: 'English',
      genre: ['Fantasy', 'Young Adult'],
      isbn: '978-0786808786',
      status: 'Available'
    },
    'OL64843W': {
      title: 'Mastering Today\'s Software',
      subtitle: 'Edward G. Martin',
      description: 'A comprehensive guide to modern software applications and productivity tools.',
      first_publish_date: '1992',
      covers: [1063675],
      price: 39.99,
      rating: 4.0,
      pages: 654,
      language: 'English',
      genre: ['Technology', 'Education'],
      isbn: '978-0030155372',
      status: 'Available'
    },
    'OL3155000W': {
      title: 'Introducing Computers',
      subtitle: 'Robert H. Blissmer',
      description: 'An introduction to computer systems, programming, and applications.',
      first_publish_date: '1988',
      covers: [4642108],
      price: 34.99,
      rating: 3.9,
      pages: 496,
      language: 'English',
      genre: ['Computer Science', 'Textbook'],
      isbn: '978-0471534433',
      status: 'Limited'
    },
    'OL65487W': {
      title: 'Upgrading and Repairing PCs',
      subtitle: 'Scott Mueller',
      description: 'The definitive guide to PC hardware maintenance, upgrades, and troubleshooting.',
      first_publish_date: '1988',
      covers: [554975],
      price: 59.99,
      rating: 4.7,
      pages: 1400,
      language: 'English',
      genre: ['Technology', 'Hardware'],
      isbn: '978-0789756107',
      status: 'Available'
    },
    'OL98484W': {
      title: 'Player Piano',
      subtitle: 'Kurt Vonnegut',
      description: 'A dystopian novel about automation and the future of work in a technological society.',
      first_publish_date: '1952',
      covers: [280246],
      price: 11.99,
      rating: 4.4,
      pages: 320,
      language: 'English',
      genre: ['Science Fiction', 'Dystopian'],
      isbn: '978-0385333788',
      status: 'Available'
    },
    'OL45883W': {
      title: 'Neuromancer',
      subtitle: 'William Gibson',
      description: 'The groundbreaking cyberpunk novel that defined the genre and introduced the concept of cyberspace.',
      first_publish_date: '1984',
      covers: [6546454],
      price: 13.99,
      rating: 4.6,
      pages: 271,
      language: 'English',
      genre: ['Cyberpunk', 'Science Fiction'],
      isbn: '978-0441569595',
      status: 'Available'
    },
    'OL17901W': {
      title: 'Foundation',
      subtitle: 'Isaac Asimov',
      description: 'The first book in the Foundation series, about the fall and rise of galactic civilizations.',
      first_publish_date: '1951',
      covers: [7735481],
      price: 14.99,
      rating: 4.8,
      pages: 255,
      language: 'English',
      genre: ['Science Fiction', 'Classic'],
      isbn: '978-0553293357',
      status: 'Available'
    },
    'OL27258W': {
      title: 'The Hitchhiker\'s Guide to the Galaxy',
      subtitle: 'Douglas Adams',
      description: 'A comedic science fiction adventure following Arthur Dent through the galaxy.',
      first_publish_date: '1979',
      covers: [103107],
      price: 12.99,
      rating: 4.7,
      pages: 224,
      language: 'English',
      genre: ['Science Fiction', 'Comedy'],
      isbn: '978-0345391803',
      status: 'Available'
    },
    'OL262738W': {
      title: 'Cryptonomicon',
      subtitle: 'Neal Stephenson',
      description: 'A novel about cryptography, spanning World War II code-breaking and modern data havens.',
      first_publish_date: '1999',
      covers: [28446],
      price: 18.99,
      rating: 4.5,
      pages: 918,
      language: 'English',
      genre: ['Historical Fiction', 'Technology'],
      isbn: '978-0380788620',
      status: 'Available'
    },
    'OL1168083W': {
      title: 'Code Complete',
      subtitle: 'Steve McConnell',
      description: 'A comprehensive guide to software construction and best practices in programming.',
      first_publish_date: '1993',
      covers: [384224],
      price: 44.99,
      rating: 4.9,
      pages: 960,
      language: 'English',
      genre: ['Programming', 'Software Engineering'],
      isbn: '978-0735619678',
      status: 'Available'
    },
    'OL16679266W': {
      title: 'Clean Code',
      subtitle: 'Robert C. Martin',
      description: 'A handbook of agile software craftsmanship, teaching principles of writing clean, maintainable code.',
      first_publish_date: '2008',
      covers: [6663947],
      price: 42.99,
      rating: 4.8,
      pages: 464,
      language: 'English',
      genre: ['Programming', 'Software Engineering'],
      isbn: '978-0132350884',
      status: 'Available'
    },
    'OL15180797W': {
      title: 'The Pragmatic Programmer',
      subtitle: 'Andrew Hunt & David Thomas',
      description: 'Essential advice for programmers on writing better code and becoming more effective developers.',
      first_publish_date: '1999',
      covers: [311672],
      price: 39.99,
      rating: 4.9,
      pages: 352,
      language: 'English',
      genre: ['Programming', 'Career Development'],
      isbn: '978-0135957059',
      status: 'Available'
    },
    'OL17365413W': {
      title: 'Head First Design Patterns',
      subtitle: 'Eric Freeman & Elisabeth Robson',
      description: 'A brain-friendly guide to software design patterns with engaging examples.',
      first_publish_date: '2004',
      covers: [254908],
      price: 47.99,
      rating: 4.7,
      pages: 694,
      language: 'English',
      genre: ['Programming', 'Software Design'],
      isbn: '978-0596007126',
      status: 'Available'
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wishlistService: WishlistService
  ) {
    this.route.paramMap.subscribe(params => {
      this.bookKey = params.get('id') || '';
      this.book = this.BOOKS[this.bookKey] || null;
      // Add the key to the book object for wishlist functionality
      if (this.book) {
        this.book.key = this.bookKey;
      }
    });
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }

  toggleWishlist(): void {
    if (this.isInWishlist()) {
      this.wishlistService.removeFromWishlist(this.bookKey);
    } else {
      if (this.book) {
        const bookToAdd = {
          key: this.bookKey,
          title: this.book.title,
          cover_id: this.book.covers ? this.book.covers[0] : null,
          first_publish_year: this.book.first_publish_date,
          edition_count: 1 // Default value
        };
        this.wishlistService.addToWishlist(bookToAdd);
      }
    }
  }

  isInWishlist(): boolean {
    return this.wishlistService.isInWishlist(this.bookKey);
  }
}
