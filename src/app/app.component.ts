import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchService } from './services/search.service';
import { AuthService } from './services/auth.service';
import { Usuario } from './interfaces/usuario';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TranslateModule, RouterModule, 
    FormsModule, MatSidenavModule, MatToolbarModule,
    MatButtonModule, MatIconModule, MatListModule, RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto';
  usuarioLogueado: Usuario | null = null;


  
  constructor(
    private router: Router,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
      // Al iniciar, carga el usuario desde el servicio (localStorage)
      this.usuarioLogueado = this.authService.getUsuarioLogeado();
    }

  idiomasVisible: boolean = false;
  mitranslate: TranslateService = inject(TranslateService);
  searchQuery!: string;
  isLocalesOpen = false;
  @Output() searchEvent: EventEmitter<string> = new EventEmitter();


  toggleIdiomas() {
    this.idiomasVisible = !this.idiomasVisible;
  }

  toggleLocales() {
    console.log('Toggle Locales clicked');
    this.isLocalesOpen = !this.isLocalesOpen;
    this.cdr.detectChanges(); // Forzar la actualización de Angular
  }

  translateText(lang: string) {
    this.mitranslate.use(lang);
  }
  onSearch() {
    this.searchService.updateSearchQuery(this.searchQuery);
  }

  cerrarSesion() {
    this.authService.logout();
    this.usuarioLogueado = null; // Actualiza variable local para ocultar usuario
  }


}