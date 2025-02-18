import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // Utilizamos BehaviorSubject para poder emitir y escuchar cambios en el valor de búsqueda
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  constructor() { }

  // Método para actualizar el valor de búsqueda
  updateSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }
}
