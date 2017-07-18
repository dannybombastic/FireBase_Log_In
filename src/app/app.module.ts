import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { ListComponent } from './components/list.component';
import { ProductosAdd } from './components/producto-add.component';
import { ArticuloDetail } from './components/articulo-detail.component';
import { ProductEdit } from './components/producto-edit.component';
import { Logincomponents } from './components/login.components';
import { NameComponent } from './components/title.component';
import { NavComponent } from './components/header/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogUserComponent } from './components/login/loginuser.component';
import { FireComponent } from './components/firebase/firebase.component';
import { Redondea } from './directives/redondea.directive';
import { NavResComponent } from './components/header/navres.Component';
import { HouseComponent } from './components/house/house.component';
import { FireRegComponent } from './components/registerfire/firereg.component';
import { ServiceUser } from './services/service.user.component';
import { FireService } from './services/service.fire';
import {Ng2SimplePageScrollModule} from 'ng2-simple-page-scroll';


import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// importado desde el archivo routing.ts
import { routing, appRoutinProviders } from './app.routing';

export const firebaseConfig = {
  apiKey: "AIzaSyDusXLiP6LA-ydz65WoUeM0MMNnf1tU9QM",
  authDomain: "porfoliodanny.firebaseapp.com",
  databaseURL: "https://porfoliodanny.firebaseio.com",
  storageBucket: "porfoliodanny.appspot.com",
  messagingSenderId: "643880665874"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    ListComponent,
    ProductosAdd,
    ArticuloDetail,
    ProductEdit,
    Logincomponents,
    NameComponent,
    FooterComponent,
    LogUserComponent,
    FireComponent,
    Redondea,   //dirctive
    NavResComponent,
    NavComponent,
    HouseComponent,
    FireRegComponent
    




  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ng2SimplePageScrollModule.forRoot()





  ],
  providers: [
    FireService,
    ServiceUser,
    appRoutinProviders,
    CookieService,
    AngularFireAuthModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
