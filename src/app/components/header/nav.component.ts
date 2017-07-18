import { Component, OnInit, Input } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Users } from '../../model/users';
import { NameComponent } from '../../components/title.component';


@Component({
  selector: 'nav-rest',
  templateUrl: './nav.component.html'
})



export class NavComponent implements OnInit {


  @Input()
  set name(name: string) {
    this._name = (name && name.trim()) || '<Angular 4 @Input()>';

  }
  get name(): string {
    return this._name;
  }


  public _name: string = 'barrio';
  public imagen: string = "profile.svg";
  public header_color: string;



  constructor(
    private _cookie: CookieService,
    private _router: Router,
    private _route: ActivatedRoute,

  ) {

    if (this._cookie.get('logged') == "true") {

      this.imagen = this._cookie.get('imagen');
    }

    this.header_color = GLOBAL.header_color;
  }




  ngOnInit() {




  }

  logOut() {

    this._cookie.set('logged', 'false');
    this._router.navigate(['/home']);
  }






}