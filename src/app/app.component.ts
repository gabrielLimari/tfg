import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';
import { LocalesTarjetaComponent } from "./pages/locales/locales-tarjeta/locales-tarjeta.component";


import { NavComponent } from "./components/nav/nav.component";
import { AuthService } from './services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalService } from './services/local.service';
import { Local } from './interfaces/local';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TranslateModule, NavComponent, RouterModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'proyecto';
  map!: mapboxgl.Map;
  marcadores: any[] = [];

  locals: Local[] = [];  
  usuarios: any[] = []; 

  constructor(
    private router: Router, 
    private serviceDataService: LocalService, 
    private authService: AuthService) {}

  ngOnInit() {

    this.serviceDataService.getLocales().subscribe((data) => {
      this.locals = data;
    });
  }

  /* Para detectar si estoy en la página de login */
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  
}