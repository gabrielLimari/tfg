import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        title: 'Inicio'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },

    {
        path: '**',
        component: HomeComponent,
        title: 'Inicio'
    },
];
