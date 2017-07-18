import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Route, ActivatedRoute, Params } from '@angular/router';

import { Subject }    from 'rxjs/Subject';


import { GLOBAL } from './global';
import { Users } from '../model/users'; //

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServiceUser {

    public user: Users;
    public bandera: boolean;
    public respuesta: any;
        public evento = new Subject<any>();
         public eventoLog = new Subject<boolean>();
    // public observable = this.evento.asObservable();
     a$ = this.evento.asObservable();
     loged$ = this.eventoLog.asObservable();


    constructor(private _http: Http) {
        this.user = new Users(0, '', '', '','');
        this.bandera = false;
        this.respuesta = [];

    }


    cambiarNombre(user){
                this.user =<Users> user;
       return this.evento.next(user);


    }
    getNombre(){

        return this.evento.asObservable();
    }

    logOut(){
        this.user.imagen = "profile.svg"
        this.evento.next(this.user);
    }

loginPassEmail(user:Users){
  let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
       return this._http.post(GLOBAL.urlLogEmail,params,{headers: headers});
}

    loginUser(user: Users) {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
       return this._http.post(GLOBAL.urlLog,params,{headers: headers});
    }

    picUser(img,id:number) {
        let json = JSON.stringify(img);
        let params = 'json=' + json;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
       return this._http.post(GLOBAL.urlImg+id,params,{headers: headers});
    }



makeFileRequest(url: string, params: Array<string>, files: Array<File>) {

        return new Promise((resolve, reject) => {

            var formData: FormData = new FormData();
            var xhr = new XMLHttpRequest();

            for (var i = 0; i < files.length; i++) {
                formData.append('uploads[]', files[i], files[i].name)
            }
            xhr.onreadystatechange = function () {

                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.response))

                    } else {

                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData)
        });
    }

}