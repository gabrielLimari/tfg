import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Local } from '../../interfaces/locals';
import { Router, RouterModule } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { TarjetaEventoComponent } from '../eventos/tarjeta-evento/tarjeta-evento.component';
import { LocalesTarjetaComponent } from './locales-tarjeta/locales-tarjeta.component';

@Component({
  selector: 'app-locales',
  standalone: true,
  imports: [
    CommonModule, RouterModule, LocalesTarjetaComponent, 
    NgxPaginationModule, MatIconModule, TarjetaEventoComponent, TranslateModule
  ],
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {
  locals: Local[] = [];
  paginatedLocals: Local[] = [];
  currentIndex: number = 0;
  itemsPerPage: number = 3; // Cantidad de elementos en el carrusel

  @ViewChild('track', { static: false }) track!: ElementRef;
  @ViewChild('slickList', { static: false }) slickList!: ElementRef;

  constructor(private localService: LocalService, private router: Router, private renderer: Renderer2) {}

  ngOnInit() {
    this.adjustItemsPerPage();
    this.localService.getLocales().subscribe((data) => {
      this.locals = data;
      this.updatePaginatedLocals();
    });
  
    window.addEventListener('resize', () => this.adjustItemsPerPage());
  }
  
  adjustItemsPerPage() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth > 1200) {
      this.itemsPerPage = 5;
    } else if (screenWidth > 768) {
      this.itemsPerPage = 4;
    } else {
      this.itemsPerPage = 3; // Para móviles
    }
  
    this.updatePaginatedLocals();
  }
  

  updatePaginatedLocals() {
    this.paginatedLocals = this.locals; // Mostrar todos sin paginación
  }
  
  nextSlide() {
    if (this.currentIndex + this.itemsPerPage < this.locals.length) {
      this.currentIndex++;
      this.updatePaginatedLocals();
      this.moveCarousel();
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updatePaginatedLocals();
      this.moveCarousel();
    }
  }

  moveCarousel() {
    const trackEl = this.track.nativeElement;
    const slideWidth = this.track.nativeElement.children[0].offsetWidth; // Obtiene el ancho de un slide
  
    this.renderer.setStyle(trackEl, 'transform', `translateX(-${this.currentIndex * slideWidth}px)`);
  }
  

  selectLocal(local: Local) {
    this.localService.setSelectedLocal(local);
    this.router.navigate(['/local']);
  }
}
