import { Routes } from '@angular/router';
import { Main } from './layouts/main/main';

export const routes: Routes = [
    {
        path: '**',
        component:Main,
    }
];
