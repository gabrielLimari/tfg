import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { TarjetaEventoComponent } from './pages/tarjeta-evento/tarjeta-evento.component';
import { DetallesTarjetaComponent } from './locales/detalles-tarjeta/detalles-tarjeta.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Inicio'
    },
    {
        path: 'evento/:documentName',
        component: TarjetaEventoComponent,
        title: 'Tarjeta Evento'
    },
    {path: 'detalles/:id', component: DetallesTarjetaComponent } 

];
