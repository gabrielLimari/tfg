import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchService } from '../../services/search.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
  import {MatListModule} from '@angular/material/list';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterModule, TranslateModule, FormsModule,MatSidenavModule,MatToolbarModule,
    MatButtonModule,MatIconModule,MatListModule,RouterLink, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(
    private searchService: SearchService,
    private cdr: ChangeDetectorRef
  ) {}

  idiomasVisible: boolean = false;
  mitranslate: TranslateService = inject(TranslateService);
  searchQuery!:string;
  isLocalesOpen = false;
  @Output() searchEvent: EventEmitter<string> = new EventEmitter();


  toggleIdiomas() {
    this.idiomasVisible = !this.idiomasVisible;
  }

  toggleLocales() {
    console.log('Toggle Locales clicked');
    this.isLocalesOpen = !this.isLocalesOpen;
    this.cdr.detectChanges(); // Forzar la actualización de Angular
}

  translateText(lang: string) {
    this.mitranslate.use(lang);
  }
   onSearch() {
    this.searchService.updateSearchQuery(this.searchQuery);
  }


}
