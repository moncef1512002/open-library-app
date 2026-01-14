import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
  standalone: false
})
export class SearchBar {
  title: string = '';
  year: number | null = null;

  @Output() searchEvent = new EventEmitter<{ title: string, year: number | null }>();

  onSearch() {
    this.searchEvent.emit({ title: this.title, year: this.year });
  }
}
