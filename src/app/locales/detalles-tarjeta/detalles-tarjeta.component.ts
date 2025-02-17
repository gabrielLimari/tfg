import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Local } from '../../interface/local';
import { LocalService } from '../../services/local.service'; // Servicio para obtener datos
import { ServiceDataService } from '../../service.service';

@Component({
  selector: 'app-detalles-tarjeta',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './detalles-tarjeta.component.html',
  styleUrls: ['./detalles-tarjeta.component.css']
})
export class DetallesTarjetaComponent implements OnInit {
  @Input() local!: Local; // Puede recibir un Local como Input
  localId?: string;

  constructor(private route: ActivatedRoute, private localService: ServiceDataService {
  ) {}

  ngOnInit() {
    // Intentar obtener el ID desde la URL
    this.localId = this.route.snapshot.paramMap.get('id') || undefined;
    
    // Si hay un ID y no se recibió por @Input, buscar el Local
    if (this.localId && !this.local) {
      this.localService.getLocalById(this.localId).subscribe((data: Local) => {
        this.local = data;
      });
    }
  }
}
