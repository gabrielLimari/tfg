import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ServiceDataService } from './service.service';
import { Local } from './interfaces/Local';
import { CommonModule } from '@angular/common';
import { NavComponent } from "./components/nav/nav.component";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavComponent, RouterModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'proyecto';
  user = { id: '', nombre: '' };

  locals: Local[] = [];

  constructor(private router: Router, private serviceDataService: ServiceDataService, private authService: AuthService) {}

  ngOnInit() {
    this.serviceDataService.getServiceData().subscribe((data) => {
      this.locals = data;
    });
  }

  usuarios: any[] = []; 

  /* Para detectar si estoy en la página de login */
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  // Método para verificar si el usuario está autenticado
  esAutenticado(): boolean {
    return this.authService.esAutenticado();
  }
  
}