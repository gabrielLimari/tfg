import { Component, OnInit } from '@angular/core';
import { Local } from '../../../interfaces/local';
import { LocalService } from '../../../services/local.service';
import { LocalesTarjetaComponent } from "../locales-tarjeta/locales-tarjeta.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { TarjetaEventoComponent } from '../../eventos/tarjeta-evento/tarjeta-evento.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css'],
  imports: [CommonModule, RouterModule, NgxPaginationModule, 
      MatIconModule, TranslateModule, MatCardModule]
})
export class LocalesComponent implements OnInit {

  title = 'proyecto';
  locals: Local[] = [];

  filteredLocales: Local[] = [];

  page: number = 1; // Página inicial
  itemsPerPage: number = 3; // Cantidad de elementos por página

  constructor(
    private localService: LocalService,
     private router: Router
  ) { }
  ngOnInit() {

  

    // Obtener otros datos como locales
    this.localService.getLocales().subscribe((data) => {
      this.locals = data;
      this.filteredLocales = data; // Inicializar los locales filtrados
    });
  }




  filterByCategory(category: string): void {
    this.filteredLocales = this.locals.filter((local) =>
      local.extraData?.categories?.some((cat) =>
        cat.categoria?.toLowerCase() === category.toLowerCase()
      )
    );
  }
  verDetalles(id: string) {
    this.router.navigate(['/local', id]);
  }

}