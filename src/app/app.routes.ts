import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { TarjetaEventoComponent } from './pages/eventos/tarjeta-evento/tarjeta-evento.component';
import { DetalleLocalComponent } from './pages/locales/detalle-local/detalle-local.component';
import { DetallesEventoComponent } from './pages/eventos/detalles-evento/detalles-evento.component';
import { BaresComponent } from './pages/bares/bares.component';
import { CocteleriasComponent } from './pages/coctelerias/coctelerias.component';
import { DiscotecasComponent } from './pages/discotecas/discotecas.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { LocalesComponent } from './pages/locales/locales.component';
import { FiestasComponent } from './pages/fiestas/fiestas.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { EventosComponent } from './pages/eventos/eventos.component';

export const routes: Routes = [
   
    {
        path: '',
        component: LandingpageComponent,
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
        title: 'Home'
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
        path: 'fiestas',
        component: FiestasComponent,
        title: 'Fiestas'
    },
    {
        path: 'locales',
        component: LocalesComponent,
        title: 'Locales'
    },
    {
        path: 'bares',
        component: BaresComponent,
        title: 'Bares'
    },
    {
        path: 'coctelerias',
        component: CocteleriasComponent,
        title: 'Coctelerías'
    },
    {
        path: 'discotecas',
        component: DiscotecasComponent,
        title: 'Discotecas'
    },
    {
        path: 'local/:id', 
        component: DetalleLocalComponent ,
        title: 'Tarjeta Detalles Local2'
    } ,
    {
        path: 'evento/:documentName',
        component: DetallesEventoComponent,
        title: 'Tarjeta Evento'
    }
    ,
    {
        path: 'locales',
        component: LocalesComponent,
        title: 'Locales'
    }

];
