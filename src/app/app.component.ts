import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';
import { LocalesTarjetaComponent } from "./pages/locales/locales-tarjeta/locales-tarjeta.component";


import { NavComponent } from "./components/nav/nav.component";
import { AuthService } from './services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalService } from './services/local.service';
import { Local } from './interfaces/locals';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TranslateModule, NavComponent, RouterModule, NavComponent,
    FormsModule,MatSidenavModule,MatToolbarModule,
    MatButtonModule,MatIconModule,MatListModule,RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent   {
  title = 'proyecto';
 
  constructor( private router: Router, ) {}
  dropdownVisible: boolean = false;
  mitranslate: TranslateService = inject(TranslateService);
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  translateText(lang: string) {
    this.mitranslate.use(lang);
  }


  /* Para detectar si estoy en la página de login */
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  
}