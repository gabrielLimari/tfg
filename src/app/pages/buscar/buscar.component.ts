import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocalesTarjetaComponent } from '../locales/locales-tarjeta/locales-tarjeta.component';
import { FormsModule } from '@angular/forms';
import { Local } from '../../interfaces/locals';
import { LocalService } from '../../services/local.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [RouterLink, CommonModule, LocalesTarjetaComponent, FormsModule, 
    MatIconModule, NgxPaginationModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})


export class BuscarComponent implements OnInit { 
  searchQuery: string = '';
  locals: Local[] = [];
  filteredLocals: Local[] = [];
  page: number = 1; // Página actual para la paginación

  constructor(
    private router: Router,
    private localService: LocalService
  ) {}

  ngOnInit(): void {
      this.localService.getLocales().subscribe((data: Local[]) => {
        this.locals = data;
        this.filteredLocals = [...this.locals]; // Inicializar con todos los locales
      });
  }

  buscarLocales(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredLocals = [...this.locals]; 
      this.page = 1; // Resetear a la primera página si no hay consulta
      return;
    }

    this.filteredLocals = this.locals.filter((local) =>
      local.basicData?.name?.toLowerCase().includes(query) ||
      local.geoData?.address?.toLowerCase().includes(query) ||
      local.extraData?.categories?.some((cat) =>
        cat.categoria?.toLowerCase().includes(query)
    )
    );
    this.page = 1; // Resetear a la primera página después de filtrar
  }


  selectLocal(local: Local): void {
    this.localService.setSelectedLocal(local);
    this.router.navigate(['/locales', local.id]);
  }

  goToPreviousPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  goToNextPage(): void {
    const totalPages = Math.ceil(this.filteredLocals.length / 3);
    if (this.page < totalPages) {
      this.page++;
    }
  }
}
/*
  constructor(private router:Router, private usuariosService: UsuariosService,
  ) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuariosService.getUsersBD().subscribe((data) => {
      this.usuariosService.setUsuariosArray(data);
      this.usuarios = data;
      this.filteredUsuarios = data;
      this.loadFotos(); // Carga las fotos después de obtener los alumnos
    });
  }

  loadFotos(): void {
    this.usuarios.forEach((usuario) => {
      this.usuariosService.getFotoUser(usuario.id).subscribe((foto) => {
        this.fotos[usuario.id] = foto; // Asocia la foto base64 con el ID del alumno
      });
    });
  }

  filteredUsuarios = this.usuarios;


  buscarUsuario(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(query) ||
      usuario.apellidos.toLowerCase().includes(query)
    );
  }




  

  borrarUsuario(userId: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        return; // Evita la eliminación si el usuario cancela
    }

    console.log('Intentando eliminar usuario con ID:', userId);
    
    console.log('Intentando eliminar usuario con ID:', userId);
    this.usuariosService.deleteUser(userId).subscribe({
        next: () => {
            console.log('Usuario eliminado correctamente');
            this.loadUsuarios();
        },
        error: (err) => {
            console.error('Error al eliminar usuario:', err);
            alert('No se puede eliminar el usuario porque tiene registros asociados.');
        }
    });
}


navigateToModificar(id: number) {
  this.router.navigate(['/crear-modificar', id]);
}*/
