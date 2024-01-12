import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { Book } from '../models/book.interface';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book!: Book;
  showDetails = false;

  constructor(
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let bookId = this.activatedRoute.snapshot.paramMap.get('id');

    if (!bookId) {
      this.router.navigateByUrl('/');
      return;
    }

    // Elimina el segmento '/works/' del bookId
    bookId = bookId.replace('/works/', '');

    this.booksService.getBookById(bookId).subscribe((book) => {
      if (!book) {
        this.router.navigateByUrl('/');
        return;
      }

      this.book = book;
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  getCoverImageUrl(coverId: number): string {
    console.log('Cover ID:', coverId);
    return this.booksService.getCoverImageUrl(coverId);
  }
  getSubjects(): string {
    return this.book.subjects ? this.book.subjects.join(', ') : 'Subjects not available';
  }
  
  getSubjectPlaces(): string {
    return this.book.subject_places ? this.book.subject_places.join(', ') : 'Subject places not available';
  }

  getCreatedDate(): string {
    return this.book.created ? this.booksService.getFormattedDate(this.book.created.value) : 'Not available';
  }
  
  getLastModifiedDate(): string {
    return this.book.last_modified ? this.booksService.getFormattedDate(this.book.last_modified.value) : 'Not available';
  }

}


