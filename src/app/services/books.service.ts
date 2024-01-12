import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Book } from '../components/models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl = 'https://openlibrary.org';

  constructor(private http: HttpClient) {}

  // Método para obtener las obras de J.K. Rowling
  getBooksByAuthor(authorId: string = 'OL23919A'): Observable<Book[]> {
    return this.http.get<any>(`${this.baseUrl}/authors/${authorId}/works.json?limit=100`).pipe(
      map(response => response.entries
        .filter((book: any) => book.covers && book.covers.length > 0) // Filtrar libros con portada
        .map((book: any) => ({
          ...book,
          cover_i: book.covers[0]
        }))
      )
    );
  }
  
// Método para obtener los detalles de un libro específico
getBookById(bookId: string): Observable<Book> {
  return this.http.get<any>(`${this.baseUrl}/works/${bookId}.json`).pipe(
    map(response => {
      // Si la propiedad 'covers' existe y tiene al menos un elemento, usamos el primer elemento como 'cover_i'
      const coverId = response.covers && response.covers.length ? response.covers[0] : undefined;
      return {
        ...response,
        cover_i: coverId,
        subjects: response.subjects,
        subject_places: response.subject_places
      };
    }),
    tap(book => console.log('Book details:', book))
  );
}


  getCoverImageUrl(coverId: number): string {
    if (!coverId) {
      // Retorna una URL de imagen por defecto o un placeholder
      return 'url_de_imagen_por_defecto.jpg';
    }
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  }
 
  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); 
  }

}

