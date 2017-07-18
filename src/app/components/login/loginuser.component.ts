import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServiceUser } from '../../services/service.user.component';
import { GLOBAL } from '../../services/global';
import { CookieService } from 'ngx-cookie-service';
import { Users } from '../../model/users';
import { NavComponent } from '../../components//header/nav.component';

@Component({
    moduleId: module.id,
    selector: 'log-user',
    templateUrl: './loginuser.component.html',
    styleUrls: ['login.users.styles.css'],


})

export class LogUserComponent implements OnInit {
    public title: string;
    public user: Users;
    public id: number;
    public template: boolean;
    public login: string;



    constructor(
        private _cookies: CookieService,
        private _service: ServiceUser,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.template = true;
        this.user = new Users(0, '', '', '', '');
        this.title = 'Login Component';
        this.login = 'Api-rest';
    }


    ngOnInit() { }

    templateState() {
        if (this.template) {
            this.template = !this.template;
            this.login = 'Firebase';
        } else {
            this.template = !this.template;
            this.login = 'Api-rest';
        }



    }

    submitForm() {
        this.createUser();

    }


    createUser() {

        this._service.loginPassEmail(this.user).map(res => res.json()).subscribe(
                              
            response => {
                if (response.status == 'succes') {
                    
                    this.user = <Users>response.user;
                 
                    console.log(this.user);
                         
                    this._service.eventoLog.next(true);
this._cookies.set("logged", "1234");


                    console.log("response :" + response.user.name);
                    console.log("user :" + response.user.email);
                    console.log("imagen :" + response.user.imagen);
                  
                    this._cookies.set("imagen", this.user.imagen);
                    this._cookies.set("name", this.user.name);
                     this._service.cambiarNombre(this.user);
                      this._router.navigate(['/home']);

                } else {
                    this._cookies.set("logged", "false");
                    console.log("else response :" + response.status);
                    console.log("else user :" + this.user);
                }



            },
            error => {

                console.log(<any>error);


            });

    }


}