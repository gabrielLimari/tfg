import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../interfaces/evento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjeta-evento',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tarjeta-evento.component.html',
  styleUrls: ['./tarjeta-evento.component.css']
})


export class TarjetaEventoComponent implements OnInit {
  route: ActivatedRoute | undefined;
  map!: mapboxgl.Map;
  documentName: string = ''; // Aquí almacenamos el nombre del evento
  evento: Evento | undefined;
  participantes: any;  // Aquí se espera que los participantes también sean obtenidos por el servicio
  centros: any[] = [];
  markers: any[] = [];

  constructor(
    private eventoService: EventoService, // Usamos el servicio que se adapta al documentName
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtenemos el 'documentName' de la URL
    this.documentName = this.activatedRoute.snapshot.params['documentName'];
    this.obtenerEventoPorNombre(this.documentName);
  }

  obtenerEventoPorNombre(documentName: string): void {
    // Llamamos al servicio para obtener el evento usando el documentName
    this.eventoService.getEventoByDocumentName(documentName).subscribe({
      next: (evento) => {
        this.evento = evento;
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