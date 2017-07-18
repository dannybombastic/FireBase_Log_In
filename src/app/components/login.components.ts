import { Component, OnInit,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Users } from '../model/users';
import { ServiceUser } from '../services/service.user.component';

import { GLOBAL } from '../services/global';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    providers: [ServiceUser,CookieService]
})

export class Logincomponents implements OnInit {


    public filesToUpload;
    public resultUpload;
    public log: boolean;
    public user: Users;
    public title: string;
    public id: number;
    public bind_pass:string ='';

    constructor(
   
        private _cookies: CookieService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _service: ServiceUser
    ) {
       
        this.filesToUpload = '';
        this.title = 'Log-in()';
    
        this.user = new Users(0, '', '', '', '');
        this.id = 0;
        this.log = false;
    }



    ngOnInit() {

        console.log('componente login cargado');
    }



    submitForm() {

        var filename;

        if (this.filesToUpload) {
            this._service.makeFileRequest(GLOBAL.urlFile, [], this.filesToUpload).then(

                (result: any) => {

                    filename = result; //.filename
                    if (filename.code == 200) { //  si la peticion ajax tiene exito seteamos la foto y subimos el articulo si no subimos articulo sin foto
                        this.user.imagen = filename.filename;
                        console.log(filename);
                        this.createUser();

                    } else {

                        console.log('nada paso');
                    }
                },
                error => {
                    console.log(<any>error);
                });

        }


    }





    fileChangeEvent(fileInset: any) {

        this.filesToUpload = <Array<File>>fileInset.target.files;


    }

 

    createUser() {

        this._service.loginUser(this.user).map(res => res.json()).subscribe(

            response => {
                if (response.status == 'succes') {
                    this.log = true
                    this.id = response.user.user_id;
                    console.log(this.user);

                    this._service.picUser(this.user, this.id).map(res => res.json()).subscribe(

                        response => {
                            if (response.error == false) {

                                this._router.navigate(['/home']);

                                console.log("response :" + response);
                                console.log("user :" + this.user.name);

                                this._cookies.set("logged", "true");
                                this._cookies.set("imagen",this.user.imagen);
                                this._cookies.set("name",this.user.name);
                            } else {
                                this._cookies.set("logged", "false");
                                console.log("else response :" + response.error);
                                console.log("else user :" + this.user);
                            }

                        },
                        error => {
                            console.log(<any>error);


                        });

                }

            },
            error => {
                console.log(<any>error);


            });

    }

}