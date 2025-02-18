import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ServiceDataService } from './service.service';
import { Local } from './interfaces/Local';
import { CommonModule } from '@angular/common';
import { NavComponent } from "./components/nav/nav.component";
import { AuthService } from './services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TranslateModule, NavComponent, RouterModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'proyecto';

  locals: Local[] = [];  
  usuarios: any[] = []; 

  constructor(private router: Router, private serviceDataService: ServiceDataService, private authService: AuthService) {}

  ngOnInit() {
    this.serviceDataService.getServiceData().subscribe((data) => {
      this.locals = data;
    });
  }

  /* Para detectar si estoy en la página de login */
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  
}