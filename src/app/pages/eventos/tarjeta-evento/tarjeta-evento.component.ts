import { Component, Input } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import { Evento } from '../../../interfaces/evento';
import { CommonModule } from '@angular/common';
import {  MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Local } from '../../../interfaces/locals';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tarjeta-evento',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, CommonModule, MatButtonModule, TranslateModule],
  templateUrl: './tarjeta-evento.component.html',
  styleUrls: ['./tarjeta-evento.component.css']
})


export class TarjetaEventoComponent  { locals: Local[] = [];
private _evento!: Evento;

@Input() 
set evento(value: Evento) {
  this._evento = value;
  const randomIndex = Math.floor(Math.random() * this.defaultImages.length);
  this.randomDefaultImage = this.defaultImages[randomIndex];
}

get evento(): Evento {
  return this._evento;
} defaultImages = [
  'img_aleatorias/img_default.jpg',
  'img_aleatorias/img_default2.jpg',
  'img_aleatorias/img_default3.jpg',
  'img_aleatorias/img_default4.jpg'
];
randomDefaultImage: string = '';
  constructor(private router: Router) {}
  
  verDetalles(documentName: string) {
    this.router.navigate(['/evento', documentName]);
  }
}