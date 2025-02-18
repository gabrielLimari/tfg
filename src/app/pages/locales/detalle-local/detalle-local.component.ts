import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Local } from '../../../interfaces/local';
import { LocalService } from '../../../services/local.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-detalle-local',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, TranslateModule],
  templateUrl: './detalle-local.component.html',
  styleUrl: './detalle-local.component.css'
})
export class DetalleLocalComponent  implements OnInit {
  route!: ActivatedRoute ;
  localId!: string;
  local!: Local;
  constructor(
      private localService: LocalService,
      private activatedRoute: ActivatedRoute
    ) {}
  ngOnInit() {
    // Intentar obtener el ID desde la URL    
    this.localId = this.activatedRoute.snapshot.params['id'];
    this.getLocalById(this.localId);
  }

  getLocalById(localId: string): void {
    this.localService.getLocalById(localId).subscribe({
      next: (local) => {
        if(local !=undefined){
          this.local = local;
        }
      },
      error: (err) => {
        console.error('Error al obtener el local:', err);
      }
    });
  }
}