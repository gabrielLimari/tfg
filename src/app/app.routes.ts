import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { TarjetaEventoComponent } from './pages/eventos/tarjeta-evento/tarjeta-evento.component';
import { DetalleLocalComponent } from './pages/locales/detalle-local/detalle-local.component';

export const routes: Routes = [
   
    {
        path: '',
        component: HomeComponent,
        title: 'Inicio'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Inicio'
    }
    ,
    {
        path: 'local/:id', 
        component: DetalleLocalComponent ,
        title: 'Tarjeta Detalles Local2'
    } 
    ,
    {
        path: 'evento/:documentName',
        component: TarjetaEventoComponent,
        title: 'Tarjeta Evento'
    }

];
