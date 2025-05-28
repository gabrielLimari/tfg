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
import { Resenia } from '../../../interfaces/resenia';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-detalle-local',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, TranslateModule, MatIconModule, FormsModule],
  templateUrl: './detalle-local.component.html',
  styleUrl: './detalle-local.component.css'
})
export class DetalleLocalComponent implements OnInit {
  route!: ActivatedRoute;
  localId!: string;
  local!: Local;
  resenia!: Resenia;
  map!: mapboxgl.Map;
  imageIndexes: number = 0;  
  nuevoComentario: string = ''; // propiedad para controlarlas reseñas
  comentarios: Resenia[] = [];
  isFavorite: boolean = false; // propiedad para controlar el estado de favoritos
  usuarioLogueado: any = null;
  valoracion: number = 0;

  constructor(
    private localService: LocalService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    const localData = localStorage.getItem('selectedLocal');
    if (localData) {
      this.local = JSON.parse(localData); // Recuperamos el local de localStorage
      // Cargar comentarios del local actual al iniciar
      this.comentarios = this.obtenerResenias(this.local.id);
      
    } else {
      // Si no hay local en localStorage, redirige o muestra un error
      console.error('No se encontró un local seleccionado');
    }
      // Verificamos si el lugar está en los favoritos
      const userData = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
      if (userData && userData.favoritos) {
        this.isFavorite = userData.favoritos.includes(this.local.id);

      }

    this.inicializarMapa();
  }
  // Aquí agregas el método isUserLogged()
  isUserLogged(): boolean {
    const userData = localStorage.getItem('usuarioLogueado');
    return !!userData; // devuelve true si existe usuario logueado
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


  prevImage() {
    if (this.imageIndexes > 0) {
      this.imageIndexes--;
    }
  }

  nextImage() {
    if (this.imageIndexes < this.local.multimedia.images.length - 1) {
      this.imageIndexes++;
    }
  }

   // Método que se llama cuando el usuario hace clic en "Agregar a favoritos"
  agregarFav() {
  const userData = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}'); // Obtener datos del usuario
  if (userData && userData.id) {
    // Si existe el usuario, agregar o quitar el id del local a los favoritos
    if (!userData.favoritos) {
      userData.favoritos = [];  // Crear la lista de favoritos si no existe
    }

    // Comprobar si el lugar ya está en los favoritos
    if (userData.favoritos.includes(this.local.id)) {
      // Si el local ya está en los favoritos, eliminarlo
      userData.favoritos = userData.favoritos.filter((id: string) => id !== this.local.id);
      localStorage.setItem('usuarioLogueado', JSON.stringify(userData)); // Guardar el usuario actualizado
      this.isFavorite = false; // Cambiar estado a no favorito
      console.log('Local eliminado de favoritos');
    } else {
      // Si el local no está en los favoritos, agregarlo
      userData.favoritos.push(this.local.id);
      localStorage.setItem('usuarioLogueado', JSON.stringify(userData)); // Guardar el usuario actualizado
      this.isFavorite = true; // Cambiar estado a favorito
      console.log('Local añadido a favoritos');
    }
  } else {
    console.log('No se encontró usuario en el almacenamiento local');
  }
  
}

  agregarResenia() {
    const userData = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');

    if (userData && userData.id) {
      const nuevaResenia: Resenia = {
        comentario: this.nuevoComentario,
        fecha: new Date().toISOString(),
        username: userData.username || 'Anónimo',
        valoracion: this.valoracion
      };

      this.comentarios.push(nuevaResenia);
      this.guardarResenias(this.local.id, this.comentarios);
      this.nuevoComentario = '';
      this.valoracion = 0;
    } else {
      console.warn('Debes iniciar sesión para agregar una reseña.');
      alert('Debes iniciar sesión para agregar una reseña.');
    }
  }

  obtenerResenias(localId: string): Resenia[] {
    const resenias = localStorage.getItem('resenias_' + localId);
    return resenias ? JSON.parse(resenias) : [];
  }

  guardarResenias(localId: string, resenias: Resenia[]) {
    localStorage.setItem('resenias_' + localId, JSON.stringify(resenias));
  }
}
