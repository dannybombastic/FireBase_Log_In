import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { CookieService } from 'ngx-cookie-service';
import { Users } from '../model/users';
import { AppComponent } from '../app.component';
import { ServiceUser } from '../services/service.user.component';
import {  FireService } from '../services/service.fire';




@Component({

  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CookieService]


})
export class HomeComponent {
  public logged;
  public titulo: string;
  public imagen: string;


  constructor(

    private _cookie: CookieService,
    private _router: Router,
    private _service:ServiceUser,
    private _fireService:FireService
  ) {
           
    this.logged = this._cookie.get("logged");
  

    this.imagen = '';
    this.titulo = '';
    this._cookie.set("puta", "putona")
    this.logged = this._cookie.get("logged");



  }


  ngOnInit() {
        // this._fireService.ControlSesion();
   
    console.log(this._cookie.get("puta"));


  }

 

}