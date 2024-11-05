import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CocheComponent } from './coche/coche.component';
import { MarcaComponent } from './marca/marca.component';
import { TipoComponent } from './tipo/tipo.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'Coche',
        component: CocheComponent,
        title: 'coche'
    },
    {
        path: 'Marca',
        component: MarcaComponent,
        title: 'marca'
    },
    {
        path: 'Tipo',
        component: TipoComponent,
        title: 'tipo'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
    
];
