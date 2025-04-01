import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioLogeado: Usuario | null = null;
  private apiUrl = 'http://localhost:3000'; //Url de la ejecución del index.js
  //json-server .\usuarios.json

  constructor(private router: Router, private http: HttpClient) {
    // En el constructor, se intenta recuperar el usuario almacenado en el localStorage
    const usuarioStored = localStorage.getItem('usuarioLogueado');
    if (usuarioStored) {
      // Si existe, se parsea y se asigna a la variable usuarioLogeado
      this.usuarioLogeado = JSON.parse(usuarioStored);
    }
  }

  // Método que verifica si hay un usuario logueado (si no es null)
  esAutenticado(): boolean {
    return this.usuarioLogeado != null;
  }

  // Método para obtener la información del usuario logueado
  getUsuarioLogeado(): Usuario | null {
    return this.usuarioLogeado;
  }

  // Método para establecer el usuario logueado y guardarlo en localStorage
  setUsuarioLogueado(usuario: Usuario): void {
    this.usuarioLogeado = usuario;
    // Guardamos el usuario logueado en localStorage
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
  }

  // Método que simula el login de un usuario
  login(usuario: Usuario): void {
    this.usuarioLogeado = usuario; // Asigna el usuario pasado como parámetro a la variable
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario)); // Guarda el usuario en el localStorage
  }

  // Método para cerrar sesión (logout)
  logout(): void {
    this.usuarioLogeado = null; // Resetea el usuario logueado
    localStorage.removeItem('usuarioLogueado'); // Elimina el usuario del localStorage
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }


  // Obtener todos los usuarios desde la base de datos
  getUsersBD(): Observable<Usuario[]> {
    
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);

  }


}
