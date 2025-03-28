import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Local } from '../../../interfaces/locals';
import { LocalService } from '../../../services/local.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-detalle-local',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, TranslateModule, MatIconModule],
  templateUrl: './detalle-local.component.html',
  styleUrl: './detalle-local.component.css'
})
export class DetalleLocalComponent implements OnInit {
  route!: ActivatedRoute;
  localId!: string;
  local!: Local;
  map!: mapboxgl.Map;

  constructor(
    private localService: LocalService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    const localData = localStorage.getItem('selectedLocal');
    if (localData) {
      this.local = JSON.parse(localData); // Recuperamos el local de localStorage
    } else {
      // Si no hay local en localStorage, redirige o muestra un error
      console.error('No se encontró un local seleccionado');
    }
  
    this.inicializarMapa();
  }
  




  inicializarMapa() {
    console.log(this.local);

    var nuevoMarcador = {
      lng: this.local.geoData.longitude,
      lat: this.local.geoData.latitude,
      title: this.local.basicData.name,

    };


    this.map = new mapboxgl.Map({
      container: 'mapa',
      accessToken: 'pk.eyJ1IjoiaW5mamdvbnphbGV6IiwiYSI6ImNsODcyMXF6cDE0ZDI0MmxoODFqMzR3OGIifQ.VAuTB3faQPTx7P6bRnEZjg',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [nuevoMarcador.lng, nuevoMarcador.lat],
      zoom: 14
    });

    const micolor = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    new mapboxgl.Marker({ color: micolor })
      .setLngLat([nuevoMarcador.lng, nuevoMarcador.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML('<strong>' + nuevoMarcador.title + '</strong>')
      ) 
      .addTo(this.map); 
  }

}
