import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Local } from '../../../interfaces/locals';
import { TranslateModule } from '@ngx-translate/core';
import { LocalService } from '../../../services/local.service';

@Component({
  selector: 'app-l-tarjeta',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButton, TranslateModule, MatIconModule],
  templateUrl: './l-tarjeta.component.html',
  styleUrl: './l-tarjeta.component.css'
})

export class LTarjetaComponent {
  locals: Local[] = [];
  @Input() local!: Local;
  currentImageIndex: number = 0;
 
  constructor(
    private router: Router,
    private localService: LocalService
  ) {}

  cambiarImagen(direction: number): void {
    const totalImages = this.local.multimedia.images.length;
    this.currentImageIndex = (this.currentImageIndex + direction + totalImages) % totalImages;
  }




  verDetalles(id: string) {
    this.localService.setSelectedLocal(this.local);
    this.router.navigate(['/local']);
  }
}
