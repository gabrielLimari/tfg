import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MatSnackBarModule, CommonModule, FormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuarios: Usuario[] = [];
  username: string = ''; 
  password: string = ''; 
  loginError: string = ''; 

  constructor(private router: Router,
  private snackbar: MatSnackBar,
private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsersBD().subscribe((data) => {
      this.usuarios = data;
    });
  }

  comprobarLogin(): void {
    // Buscamos si hay un usuario con el mismo username y password
    const user = this.usuarios.find(u => u.username === this.username && u.password === this.password);

    if (user) {
      this.authService.login(user);
      this.snackbar.open('Login correcto', 'Cerrar', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 2000,
      });
      
        this.router.navigate(['/home']);

    } else {
      this.snackbar.open('Las credenciales son incorrectas.', 'Cerrar', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 3000,
      });
    }
  }
}
