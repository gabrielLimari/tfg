import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';
import { NgxPaginationModule } from 'ngx-pagination';
import { Local } from './interfaces/local';
import { LocalesTarjetaComponent } from "./pages/locales/locales-tarjeta/locales-tarjeta.component";


import { NavComponent } from "./components/nav/nav.component";
import { AuthService } from './services/auth.service';
import { LocalService } from './services/local.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavComponent, RouterModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'proyecto';
  map!: mapboxgl.Map;
  marcadores: any[] = [];

  locals: Local[] = [];
 

  constructor(
    private router: Router, 
    private serviceDataService: LocalService, 
    private authService: AuthService) {}

  ngOnInit() {

    this.serviceDataService.getLocales().subscribe((data) => {
      this.locals = data;
    });
  }


  usuarios: any[] = []; 

  /* Para detectar si estoy en la página de login */
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  // Método para verificar si el usuario está autenticado
  esAutenticado(): boolean {
    return this.authService.esAutenticado();
  }
  
}