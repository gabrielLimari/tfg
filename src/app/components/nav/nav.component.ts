import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterModule, TranslateModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(
    private searchService: SearchService,
  ) {}

  dropdownVisible: boolean = false;
  mitranslate: TranslateService = inject(TranslateService);
  searchQuery!:string;
  @Output() searchEvent: EventEmitter<string> = new EventEmitter();


  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  translateText(lang: string) {
    this.mitranslate.use(lang);
  }
   onSearch() {
    this.searchService.updateSearchQuery(this.searchQuery);
  }


}
