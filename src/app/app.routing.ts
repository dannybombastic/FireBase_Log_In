import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Params } from '@angular/router';
import { FireRegComponent } from './components/registerfire/firereg.component';
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { ListComponent } from './components/list.component';
import { ProductosAdd } from './components/producto-add.component';
import { ArticuloDetail } from './components/articulo-detail.component';
import { ProductEdit } from './components/producto-edit.component';
import { Logincomponents } from './components/login.components';
import { NameComponent } from './components/title.component';
import { LogUserComponent } from './components/login/loginuser.component';
import { FireComponent } from './components/firebase/firebase.component';
import { NavResComponent } from './components/header/navres.Component';
import { HouseComponent } from './components/house/house.component';

export const appRoutes: Routes = [

    {
        path: '', component: HomeComponent // por error
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'productos-list', component: ListComponent
    },
    {
        path: 'productos-add', component: ProductosAdd
    },
    {
        path: 'articulo-detail/:id', component: ArticuloDetail
    },
    {
        path: 'title-name', component: NameComponent
    },
    {
        path: 'producto-edit/:id', component: ProductEdit
    },
    {
        path: 'login-component', component: Logincomponents
    }
    ,
    {
        path: 'log-user', component: LogUserComponent
    },
    {
        path: 'nav-bar', component: NavResComponent
    },
    {
        path: 'house-client', component: HouseComponent
    }
    ,
    {
        path: 'fire-reg', component: FireRegComponent
    },
    {
        path: 'firebase-log', component: FireComponent
    },
    {
        path: '**', component: ErrorComponent //debe estar el ultimo 
    }
];


// importar esto en el module de la app 
export const appRoutinProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);