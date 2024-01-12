import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { Book } from '../models/book.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  isLoading = true;
  isCardView = true;
  displayedColumns: string[] = ['title'];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.getBooksByAuthor().subscribe(books => {
      this.books = books;
      this.isLoading = false;
    });
  }

  getCoverImageUrl(coverId: number): string {
    return this.booksService.getCoverImageUrl(coverId);
  }

  goToBook(bookId: string): void {
    this.router.navigate(['/book', bookId]);
  }
}


