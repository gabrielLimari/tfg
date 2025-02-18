import { Component, Input } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import { Evento } from '../../../interfaces/evento';
import { CommonModule } from '@angular/common';
import {  MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Local } from '../../../interfaces/local';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tarjeta-evento',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, CommonModule, MatButtonModule, TranslateModule],
  templateUrl: './tarjeta-evento.component.html',
  styleUrls: ['./tarjeta-evento.component.css']
})


export class TarjetaEventoComponent  { locals: Local[] = [];
  @Input() evento!: Evento;
 
  constructor(private router: Router) {}
  
  verDetalles(documentName: string) {
    this.router.navigate(['/detalles', documentName]);
  }
}