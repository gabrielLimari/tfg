import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Evento } from '../../interfaces/evento';
import { Local } from '../../interfaces/Local';
import { ServiceDataService } from '../../service.service';
import { EventoService } from '../../services/evento.service';
import { LocalesTarjetaComponent } from "../../locales/locales-tarjeta/locales-tarjeta.component";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LocalesTarjetaComponent, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  title = 'proyecto';
  locals: Local[] = [];
  eventos: Evento[] = [];
  proximosEventos: Evento[] = []; // Para almacenar los tres próximos eventos

  showDatePicker = false;
  minDate!: string; // Para almacenar la fecha de hoy
  page: number = 1; // Página inicial
  itemsPerPage: number = 3; // Cantidad de elementos por página
  constructor(
    private serviceDataService: ServiceDataService,
    private eventoService: EventoService ) {}

  ngOnInit() {
    // Obtener la fecha de hoy para el date picker
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Obtener la fecha en formato YYYY-MM-DD

    // Obtener eventos
    this.eventoService.getEventos().subscribe((data) => {
      this.eventos = data;
    });

    // Obtener otros datos como locales
    this.serviceDataService.getServiceData().subscribe((data) => {
      this.locals = data;
    });
  }

  // Cambiar la visibilidad del calendario
  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  // Manejar la selección de la fecha
  onDateSelect(event: any) {
    const selectedDate = new Date(event.target.value);
    this.filterEventsByDate(selectedDate);
  }

  // Filtrar los eventos según la fecha seleccionada
  filterEventsByDate(selectedDate: Date) {
    // Filtrar eventos que ocurren después o en la misma fecha seleccionada
    const eventosFiltrados = this.eventos.filter((evento) => {
      const eventDate = new Date(evento.eventStartDate); // Asegúrate de que eventStartDate está en formato correcto
      return eventDate >= selectedDate;
    });

    // Ordenar los eventos filtrados por fecha y tomar los tres primeros
    this.proximosEventos = eventosFiltrados
      .sort((a, b) => new Date(a.eventStartDate).getTime() - new Date(b.eventStartDate).getTime())
      .slice(0, 3);
  }

    // Método para ir a la página anterior
    goToPreviousPage() {
      if (this.page > 1) {
        this.page--;
      }
    }
  
    // Método para ir a la siguiente página
    goToNextPage() {
      this.page++;
    }
}
