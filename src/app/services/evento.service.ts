import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../interfaces/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private apiUrl = 'https://opendata.euskadi.eus/contenidos/ds_eventos/eventos_turisticos/opendata/agenda.json'; // URL to JSON

  constructor(private http: HttpClient) { }

  // Obtener todos los eventos
  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  // Obtener un evento por su 'documentName'
  getEventoByDocumentName(documentName: string): Observable<Evento | undefined> {
    return new Observable<Evento | undefined>((observer) => {
      this.getEventos().subscribe({
        next: (eventos) => {
          const evento = eventos.find(evento => evento.documentName === documentName);
          observer.next(evento);
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }
}
