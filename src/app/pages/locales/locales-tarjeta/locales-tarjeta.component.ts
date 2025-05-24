import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Local } from '../../../interfaces/locals';
import { TranslateModule } from '@ngx-translate/core';
import { LocalService } from '../../../services/local.service';
@Component({
  selector: 'app-locales-tarjeta',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatButton, TranslateModule],
  templateUrl: './locales-tarjeta.component.html',
  styleUrl: './locales-tarjeta.component.css'
})
export class LocalesTarjetaComponent {
  
  locals: Local[] = [];
  @Input() local!: Local;
  mostrarTextoCompleto = false;

  constructor(private router: Router,
        private localService: LocalService,
    
  ) {}
  
  verDetalles(id: string) {
    this.localService.setSelectedLocal(this.local);
    this.router.navigate(['/local']);
  }

   obtenerTextoCorto(texto: string): string {
    if (this.mostrarTextoCompleto || texto.length <= 250) {
      return texto;
    }

    const textoCortado = texto.slice(0, 250);
    const ultimoEspacio = textoCortado.lastIndexOf(' ');

    // Si hay un espacio antes del carácter 250, corta ahí, si no, corta al máximo permitido
    const resultado = ultimoEspacio > -1 ? textoCortado.slice(0, ultimoEspacio) : textoCortado;

    return resultado + ' ...';
  }
}
