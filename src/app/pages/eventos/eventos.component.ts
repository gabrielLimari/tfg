import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  template: '', // sin template porque redirige inmediatamente
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  constructor(
    private eventoService: EventoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventoService.getEventos().subscribe(eventos => {
      if (!eventos || eventos.length === 0) {
        // No hay eventos, puedes redirigir a otra página o mostrar un mensaje
        return;
      }

      // Obtener fecha hoy sin hora para comparar
      const today = new Date();
      today.setHours(0,0,0,0);

      // Filtrar eventos que tienen fecha válida y >= hoy
      const eventosValidos = eventos.filter(evento => {
        if (!evento.eventStartDate) return false;
        let eventDate: Date;

        if (evento.eventStartDate.includes("/")) {
          const [day, month, year] = evento.eventStartDate.split("/");
          eventDate = new Date(`${year}-${month}-${day}`);
        } else {
          eventDate = new Date(evento.eventStartDate);
        }

        if (isNaN(eventDate.getTime())) return false;
        eventDate.setHours(0,0,0,0);
        return eventDate >= today;
      });

      if (eventosValidos.length === 0) {
        // No hay eventos futuros, manejar aquí
        return;
      }

      // Ordenar eventos por fecha ascendente (más próximo primero)
      eventosValidos.sort((a, b) => {
        const dateA = new Date(a.eventStartDate.includes("/") ? 
          a.eventStartDate.split("/").reverse().join("-") : a.eventStartDate);
        const dateB = new Date(b.eventStartDate.includes("/") ? 
          b.eventStartDate.split("/").reverse().join("-") : b.eventStartDate);
        return dateA.getTime() - dateB.getTime();
      });

      // Tomar el evento más próximo
      const eventoProximo = eventosValidos[0];

      // Navegar a la ruta con el documentName de ese evento
      this.router.navigate(['/evento', eventoProximo.documentName]);
    });
  }
}
