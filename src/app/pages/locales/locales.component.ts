import { Component, OnInit } from '@angular/core';
import { Local } from '../../interfaces/locals';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { TarjetaEventoComponent } from '../eventos/tarjeta-evento/tarjeta-evento.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-locales',
  standalone: true,
  imports: [
    CommonModule, RouterModule, 
    NgxPaginationModule, MatIconModule, TarjetaEventoComponent, TranslateModule, FormsModule
  ],
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {
  locals: Local[] = [];
  filteredLocals: Local[] = [];  // Locales después del filtro
  page: number = 1;
  categories: string[] = [];  // Lista de categorías únicas
  selectedCategory: string = '';  // Categoría seleccionada por el usuario
  imageIndexes: number[] = [];   // Este array almacenará el índice actual de la imagen activa para cada local
  previousLabel: string = '';
  nextLabel: string = '';

  constructor(private localService: LocalService, private router: Router,   private route: ActivatedRoute, private translate: TranslateService) {}

  ngOnInit() {
    this.localService.getLocales().subscribe((data) => {
      this.locals = data;
      // Inicializa los índices de las imágenes en 0 para cada local
      this.imageIndexes = new Array(data.length).fill(0);
      
      // Obtener las categorías únicas
      this.extractCategories();
      
      // Inicializar el listado filtrado
      this.filteredLocals = this.locals;

        // Leer la categoría desde los parámetros de URL
      this.route.queryParams.subscribe(params => {
      const categoriaParam = params['categoria'];
      if (categoriaParam) {
        this.selectedCategory = categoriaParam;
        this.filterByCategory(); // Aplicar filtro directamente
      }
    });
    });

    this.setPaginationLabels();
    this.translate.onLangChange.subscribe(() => {
      this.setPaginationLabels();
    });
  }

  setPaginationLabels() {
    this.translate.get(['PAGINATION.PREVIOUS', 'PAGINATION.NEXT']).subscribe(translations => {
      this.previousLabel = translations['PAGINATION.PREVIOUS'];
      this.nextLabel = translations['PAGINATION.NEXT'];
    });
  }

  extractCategories() {
    const categorySet = new Set<string>(); // Usamos un Set para eliminar duplicados
    this.locals.forEach(local => {
      local.extraData.categories.forEach(c => categorySet.add(c.categoria));
    });
    this.categories = Array.from(categorySet);
  }

  // Función para aplicar el filtro de categoría
  filterByCategory() {
    if (this.selectedCategory) {
      this.filteredLocals = this.locals.filter(local => 
        local.extraData.categories.some(c => c.categoria === this.selectedCategory)
      );
    } else {
      this.filteredLocals = this.locals;  // Si no hay categoría seleccionada, mostrar todos
    }
    this.page= 1; //Situamos la paginacion al comienzo si no puede dar problemas en el caso de que se encuentre en un indice que no existe al cambiar de una categoria a otra .

  }

  selectLocal(local: Local) {
    this.localService.setSelectedLocal(local);
    this.router.navigate(['/local']);
  }

  limitarPalabrasInfoLocal(text: string, limit: number): string {
    if (!text) return '';
    let words = text.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
  }

  prevImage(index: number) {
    if (this.imageIndexes[index] > 0) {
      this.imageIndexes[index]--;
    }
  }

  nextImage(index: number) {
    if (this.imageIndexes[index] < this.locals[index].multimedia.images.length - 1) {
      this.imageIndexes[index]++;
    }
  }
  
  agregarFav(local: Local) {
    const userData = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}'); // Obtener datos del usuario
    
    if (userData && userData.id) {
      if (!userData.favoritos) {
        userData.favoritos = [];  // Crear la lista de favoritos si no existe
      }
  
      // Comprobar si el lugar ya está en los favoritos
      if (userData.favoritos.includes(local.id)) {
        // Si el local ya está en los favoritos, eliminarlo
        userData.favoritos = userData.favoritos.filter((id: string) => id !== local.id);
        console.log(`Local ${local.id} eliminado de favoritos`);
      } else {
        // Si el local no está en los favoritos, agregarlo
        userData.favoritos.push(local.id);
        console.log(`Local ${local.id} añadido a favoritos`);
      }
      
      localStorage.setItem('usuarioLogueado', JSON.stringify(userData)); // Guardar el usuario actualizado
    } else {
      console.log('No se encontró usuario en el almacenamiento local');
    }
  }

  isFavorite(local: Local): boolean {
    const userData = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
    return userData && userData.favoritos ? userData.favoritos.includes(local.id) : false;
  }



}
