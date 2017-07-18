import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Route, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Articulo } from './articulo'; // model
import { GLOBAL } from './global';

import {Ng2SimplePageScrollModule,SimplePageScrollService} from 'ng2-simple-page-scroll/ng2-simple-page-scroll';

@Injectable()

export class ServiceComponent {

    private url: string;
    public articulo: Articulo[];
    public articulos: Array<Articulo>;
    public respuesta: string;

    constructor(private _http: Http) {

        this.url = GLOBAL.url;
        this.articulo = [];
        this.articulos = new Array<Articulo>();
        this.getArticulos();





    }

  // get articulos
    getArticulosSub() {

        return this._http.get(GLOBAL.url).map(res => res.json());
    }
// get articulos by id
    getProducto(id) {

        return this._http.get(GLOBAL.url + '/' + id).map(res => res.json());
    }

// get articulos y pasalos a un array que hay en esta clase
    getArticulos(): Articulo[] {
        // doble funcion de callback result and error
        this._http.get(GLOBAL.url).map(res => res.json()).subscribe(

            result => {
                this.articulo = result.data;

                console.log(this.articulo);
                for (let art of this.articulo) {
                    //  console.log(art.nombre);
                    this.articulos.push(new Articulo(art.id, art.descriptcion, art.nombre, art.precio, art.imagen));
                }

                return this.articulo;
            },
            error => {

                var errorMenssage = <any>error;
                console.log(errorMenssage);
            }
        );
        return this.articulo;
    }
 // agregar un articulo
    addArticulo(articulo: Articulo) {

        let json = JSON.stringify(articulo);
        let params = 'json=' + json;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this._http.post(GLOBAL.url, params, { headers: headers });

    }
// editar un articulo
    editArticulo(id, articulo: Articulo) {
        let json = JSON.stringify(articulo);
        let params = 'json=' + json;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        
        return this._http.post((GLOBAL.urlUpdate+'/'+id),params,{headers:headers}).map(res=>res.json());
    }
// metodo para subir archivo pasamos url parametros y archivo
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

    deleteArticulo(id:number){
       return this._http.get(GLOBAL.urlDelete+id).map(res => res.json());
    }


}