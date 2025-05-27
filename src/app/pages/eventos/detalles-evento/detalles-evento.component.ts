import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import mapboxgl from 'mapbox-gl';
import { Evento } from '../../../interfaces/evento';
import { EventoService } from '../../../services/evento.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-detalles-evento',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './detalles-evento.component.html',
  styleUrl: './detalles-evento.component.css'
})
export class DetallesEventoComponent implements OnInit {
  route: ActivatedRoute | undefined;
  map!: mapboxgl.Map;
  documentName: string = ''; // Aquí almacenamos el nombre del evento
  evento: Evento | undefined;
  participantes: any;  // Aquí se espera que los participantes también sean obtenidos por el servicio
  centros: any[] = [];
  markers: any[] = [];
defaultImages = [
  'img_aleatorias/img_default.jpg',
  'img_aleatorias/img_default2.jpg',
  'img_aleatorias/img_default3.jpg',
  'img_aleatorias/img_default4.jpg'

];

randomDefaultImage: string = '';




  constructor(
    private eventoService: EventoService, // Usamos el servicio que se adapta al documentName
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtenemos el 'documentName' de la URL
    this.documentName = this.activatedRoute.snapshot.params['documentName'];
    this.getEventoByNombre(this.documentName);
  const randomIndex = Math.floor(Math.random() * this.defaultImages.length);
  this.randomDefaultImage = this.defaultImages[randomIndex];

  }

  getEventoByNombre(documentName: string): void {
    // Llamamos al servicio para obtener el evento usando el documentName
    this.eventoService.getEventoByDocumentName(documentName).subscribe({
      next: (evento) => {
        this.evento = evento;
         this.inicializarMapa();
      },
      error: (err) => {
        console.error('Error al obtener el evento:', err);
      }
    });
  }



  inicializarMapa(): void {
        this.markers = [{
          lat: Number(this.evento!.latwgs84),
          lng: Number(this.evento!.lonwgs84),
          title: this.evento!.documentName,
          fecha: this.evento!.eventStartDate
        }];

        this.map = new mapboxgl.Map({
          container: 'mapa',
          accessToken: 'pk.eyJ1IjoiaW5mamdvbnphbGV6IiwiYSI6ImNsODcyMXF6cDE0ZDI0MmxoODFqMzR3OGIifQ.VAuTB3faQPTx7P6bRnEZjg',
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [Number(this.evento!.lonwgs84), Number(this.evento!.latwgs84)],
          zoom: 12
        });

        this.markers.forEach(marker => {
          const micolor = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
          new mapboxgl.Marker({ color: micolor })
            .setLngLat([marker.lng, marker.lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<strong>${marker.title}</strong><br>Fecha: ${marker.fecha}`))
            .addTo(this.map);
        });
      }
  

      
  }