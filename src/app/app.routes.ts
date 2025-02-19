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
import { LocalesComponent } from './pages/locales/locales/locales.component';

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
