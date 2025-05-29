import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../../interfaces/usuario';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, MatSnackBarModule, CommonModule, FormsModule, TranslateModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  newUsername: string = '';
  newPassword: string = '';
  newEmail: string = '';
  usuarios: Usuario[] = [];

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  
  loadUsers(): void {

    this.authService.getUsersBD().subscribe((usuarios: Usuario[]) => {
      console.log(usuarios); 
      this.usuarios = usuarios;

    });
  }
  // Método para registrar un nuevo usuario
  registerUser(): void {
   
  const usuarioExistente = this.usuarios.find(
    (u) => u.username === this.newUsername
  );

  if (usuarioExistente) {
    this.snackbar.open('El nombre de usuario ya esta registrado.', 'Cerrar', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 3000,
    });
    return; // Salir del método si el usuario ya existe
  }

  const newUser: Usuario = {
    id: this.usuarios.length + 1,
    username: this.newUsername,
    password: this.newPassword,
    email: this.newEmail,
    favoritos: []
  };

  this.authService.registrarse(newUser).subscribe(
    (user) => {
      this.snackbar.open('Usuario registrado exitosamente', 'Cerrar', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 3000,
      });
      this.router.navigate(['/login']);
    },
    (error) => {
      this.snackbar.open('Error al registrar el usuario.', 'Cerrar', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 3000,
      });
    }
  );
}


  // Método para navegar al inicio de sesión
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
