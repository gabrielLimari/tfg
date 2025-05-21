import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {
  
  searchQuery: string = '';
  
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
}
