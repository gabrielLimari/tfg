import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { DetalleLocalComponent } from './pages/locales/detalle-local/detalle-local.component';
import { DetallesEventoComponent } from './pages/eventos/detalles-evento/detalles-evento.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { LocalesComponent } from './pages/locales/locales.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { RegistroComponent } from './auth/login/registro/registro.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        component: LandingpageComponent,
        title: 'Bienvenida'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'registro',
        component: RegistroComponent,
        title: 'Registro'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Inicio'
    },
    {
        path: 'buscar',
        component: BuscarComponent,
        title: 'Buscar'
    },
    {
        path: 'eventos',
        component: EventosComponent,
        title: 'Eventos'
    },
    {
        path: 'locales',
        component: LocalesComponent,
        title: 'Locales'
    },
    {
        path: 'local',
        component: DetalleLocalComponent,
        title: 'Detalles del Local'
    },
    {
        path: 'evento/:documentName',
        component: DetallesEventoComponent,
        title: 'Detalles del Evento'
    }


];
