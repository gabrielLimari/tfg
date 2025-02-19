import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Evento } from '../../interfaces/evento';
import { EventoService } from '../../services/evento.service';
import { LocalesTarjetaComponent } from "../locales/locales-tarjeta/locales-tarjeta.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { LocalService } from '../../services/local.service';
import { Local } from '../../interfaces/local';
import { MatIconModule } from '@angular/material/icon';
import { TarjetaEventoComponent } from "../eventos/tarjeta-evento/tarjeta-evento.component";
import { TranslateModule } from '@ngx-translate/core';
import { NavComponent } from "../../components/nav/nav.component";
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LocalesTarjetaComponent, NgxPaginationModule, 
    MatIconModule, TarjetaEventoComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  title = 'proyecto';
  locals: Local[] = [];
  eventos: Evento[] = []; 
  proximosEventos: Evento[] = []; // Para almacenar los tres próximos eventos
  fechaSeleccionada: string | null = null; // Guarda la fecha seleccionada por el usuario

  searchQuery: string = ''; // La consulta de búsqueda
  filteredEventos: Evento[] = [];
  filteredLocales: Local[] = [];

  showDatePicker = false;
  minDate!: string; // Para almacenar la fecha de hoy
  page: number = 1; // Página inicial
  itemsPerPage: number = 3; // Cantidad de elementos por página

  constructor(
    private localService: LocalService,
    private eventoService: EventoService,
    private searchService: SearchService,
  ) { }
  ngOnInit() {
    // Escuchar cambios en el valor de búsqueda
      this.searchService.searchQuery$.subscribe((query) => {
      this.searchQuery = query;
      this.applySearch();
    });
    // Obtener la fecha de hoy para el date picker
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Obtener la fecha en formato YYYY-MM-DD

    // Obtener eventos
    this.eventoService.getEventos().subscribe((data) => {
      this.eventos = data;
      this.filtrarEventosPorFecha(today); // Filtrar desde la fecha actual al iniciar
      this.filteredEventos = [...this.proximosEventos]; // Inicializar los eventos filtrados con los próximos eventos
    });

    // Obtener otros datos como locales
    this.localService.getLocales().subscribe((data) => {
      this.locals = data;
      this.filteredLocales = data; // Inicializar los locales filtrados
    });
  }


  // Cambiar la visibilidad del calendario
  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  onDateSelect(event: any) {
    const selectedDate = new Date(event.target.value);
    this.fechaSeleccionada = event.target.value; // Guarda la fecha seleccionada
    this.filtrarEventosPorFecha(selectedDate);
  }

  filtrarEventosPorFecha(selectedDate: Date) {
    // Asegurarse de que tanto la fecha seleccionada como la fecha de hoy no tengan la hora
    selectedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log("Fecha seleccionada:", selectedDate.toISOString().split('T')[0]);
    console.log("Fecha actual:", today.toISOString().split('T')[0]);

    // Filtrar eventos
    const eventosFiltrados = this.eventos.filter((evento) => {
      if (!evento.eventStartDate) {
        console.error(`El evento ${evento.documentName} no tiene una fecha válida.`);
        return false;
      }

      let eventDate: Date;

      // Verificar si la fecha es del formato DD/MM/YYYY
      if (evento.eventStartDate.includes("/")) {
        const [day, month, year] = evento.eventStartDate.split("/");
        eventDate = new Date(`${year}-${month}-${day}`); // Convertir a YYYY-MM-DD
      } else {
        eventDate = new Date(evento.eventStartDate); // Asumimos que ya está en formato correcto
      }

      // Verificamos si la fecha del evento es válida
      if (isNaN(eventDate.getTime())) {
        console.error(`Fecha inválida en evento: ${evento.documentName} - Valor: ${evento.eventStartDate}`);
        return false;
      }

      eventDate.setHours(0, 0, 0, 0); // Asegurarse de que solo comparamos fechas (sin horas)

      // Filtrar solo eventos posteriores a la fecha seleccionada
      return eventDate >= selectedDate;
    });

    // Ordenar los eventos filtrados por fecha de inicio, de más cercano a más lejano
    const eventosOrdenados = eventosFiltrados.sort((a, b) => {
      const dateA = new Date(a.eventStartDate.split('/').reverse().join('-')); // Convertir a formato ISO
      const dateB = new Date(b.eventStartDate.split('/').reverse().join('-'));
      return dateA.getTime() - dateB.getTime(); // Orden ascendente (más cercano primero)
    });

    // Seleccionar los 3 primeros eventos
    this.proximosEventos = eventosOrdenados.slice(0, 3);

    // Almacenar estos tres eventos en filteredEventos
    this.filteredEventos = [...this.proximosEventos];

    console.log("Los 3 eventos más próximos son:", this.proximosEventos);
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


  onSearch(query: string): void {
    this.searchQuery = query;
    this.applySearch();  // Aplicar el filtro de búsqueda
  }

  applySearch() {
    if (this.searchQuery.trim() === '') {
      // Si la búsqueda está vacía, mantén los 3 próximos eventos
      this.filteredEventos = [...this.proximosEventos];
    } else {
      // Si hay un valor en la búsqueda, aplicar el filtro normal
      this.filteredEventos = this.eventos.filter((evento) =>
        evento.documentName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        evento.eventLocationName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        evento.eventStartDate.includes(this.searchQuery)
      );
    }
  
    // Filtrar locales
    this.filteredLocales = this.locals.filter((local) =>
      local.basicData?.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      local.geoData?.address?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      local.extraData?.categories?.some((categoria) =>
        categoria.categoria?.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }
  

}