import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Local } from '../../../interfaces/local';
@Component({
  selector: 'app-locales-tarjeta',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatButton],
  templateUrl: './locales-tarjeta.component.html',
  styleUrl: './locales-tarjeta.component.css'
})
export class LocalesTarjetaComponent {
  
  locals: Local[] = [];
  @Input() local!: Local;
 
  constructor(private router: Router) {}
  
  verDetalles(id: string) {
    this.router.navigate(['/local', id]);
  }
}
