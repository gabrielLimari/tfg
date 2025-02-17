import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceDataService } from './service.service';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';
import { NgxPaginationModule } from 'ngx-pagination';
import { Local } from './interface/local';
import { LocalesTarjetaComponent } from "./locales/locales-tarjeta/locales-tarjeta.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxPaginationModule, CommonModule, LocalesTarjetaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'proyecto';
  map!: mapboxgl.Map;
  marcadores: any[] = [];

  locals: Local[] = [];
  page: number = 1; // Página inicial
  itemsPerPage: number = 3; // Cantidad de elementos por página

  constructor(private serviceDataService: ServiceDataService) {}

  ngOnInit() {

    this.serviceDataService.getServiceData().subscribe((data) => {
      this.locals = data;
    });
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