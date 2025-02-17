import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServiceDataService } from '../../service.service';
import { Local } from '../../interfaces/Local';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'proyecto';

  locals: Local[] = [];

  constructor(private serviceDataService: ServiceDataService) {}

  ngOnInit() {
    this.serviceDataService.getServiceData().subscribe((data) => {
      this.locals = data;
    });
  }
}
