import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterModule, TranslateModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  dropdownVisible: boolean = false;
  mitranslate: TranslateService = inject(TranslateService);

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  translateText(lang: string) {
    this.mitranslate.use(lang);
  }


}
