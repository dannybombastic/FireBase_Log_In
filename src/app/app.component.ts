import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { GLOBAL } from './services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Users } from './model/users';

import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FireService } from './services/service.fire'
import { Observable } from 'rxjs/Observable';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CookieService]
})



export class AppComponent {


  public title: string = 'hola';

  public imagen: string = '';
  public name: string = '';
  public subcription: Subscription;
  public userF: Observable<firebase.User>;
  constructor(
    private aut: AngularFireAuth,
    private _servicefire: FireService,
    private _cookie: CookieService,
    private _router: Router,
    private _route: ActivatedRoute,

  ) {

/*
    this.userF = this.aut.authState;
   
         this.userF.subscribe(user => {

       if (user) {
           console.log('use', user);
           this.imagen = user.photoURL;
        
           this.name = user.displayName;
            
       }
   });
       */  


  }




  ngOnInit() {






  }






}
