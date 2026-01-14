import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private readonly SUBJECT_API = 'https://openlibrary.org/subjects/computers.json?limit=20';
    private readonly WORK_API_BASE = 'https://openlibrary.org/works/';

    constructor(private http: HttpClient) { }

    getBooks(): Observable<any> {
        // Use Search API instead of Subject API as it seems more reliable for the user
        // Searching for subject "computers"
        return this.searchBooks('computers');
    }

    getBooksList(): Observable<any> {
        return this.getBooks();
    }

    getBookById(id: string): Observable<any> {
        const cleanId = id.replace('/works/', '');
        return this.http.get<any>(`${this.WORK_API_BASE}${cleanId}.json`).pipe(
            timeout(10000)
        );
    }

    searchBooks(title: string, year?: number): Observable<any> {
        let url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;
        if (year) {
            url += `&first_publish_year=${year}`;
        }
        return this.http.get<any>(url);
    }
}
