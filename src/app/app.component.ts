import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceDataService } from './service.service';
import { Local } from './interfaces/Local';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'proyecto';

  locals: Local[] = [];

  constructor(private serviceDataService: ServiceDataService) {}

  ngOnInit() {
    this.serviceDataService.getServiceData().subscribe((data) => {
      this.locals = data;
    });
  }
}