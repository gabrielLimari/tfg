import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Local } from '../../interfaces/locals';
import { Router, RouterModule } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { TarjetaEventoComponent } from '../eventos/tarjeta-evento/tarjeta-evento.component';
import { LTarjetaComponent } from './l-tarjeta/l-tarjeta.component';

@Component({
  selector: 'app-locales',
  standalone: true,
  imports: [
    CommonModule, RouterModule, LTarjetaComponent, 
    NgxPaginationModule, MatIconModule, TarjetaEventoComponent, TranslateModule
  ],
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {
  locals: Local[] = [];
  page: number = 1;  // Inicializa la página actual

  constructor(private localService: LocalService, 
    private router: Router) {}

  ngOnInit() {
    this.localService.getLocales().subscribe((data) => {
      this.locals = data; });
  
  }
  
 

  selectLocal(local: Local) {
    this.localService.setSelectedLocal(local);
    this.router.navigate(['/local']);
  }
}
