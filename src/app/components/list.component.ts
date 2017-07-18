import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServiceComponent } from '../services/service.component';
import { Articulo } from '../services/articulo';
declare var jQuery:any; // jquery
declare var $:any;


@Component({
    selector: 'productos-list',
    templateUrl: './list.component.html',
    providers: [ServiceComponent,CookieService]  // cargamos providers
})

export class ListComponent {

    public articulos: Articulo[];
    public titulo: string;
    public confirmado;
    constructor(
        private _cookie: CookieService,
        private _service: ServiceComponent,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        //constructor
        this.titulo = 'Listado de artículos';
        //devolviendo un array completo
        this.articulos = this._service.articulos;
        this.confirmado = null;
    }

    ngOnInit() {
      console.log(this._cookie.get("puta"))
        console.log('productos-list');
        console.log(this.articulos);
    }

    getProductos() {
        this._service.getArticulosSub().subscribe(

            result => {
                if (result.code == 200) {
                    this.articulos = result.data;
                } else {
                    console.log('resultados borrar' + result);
                }

            },

            error => {
                console.log(<any>error);
            }
        )


    }
    onDeleteproducto(id) {
        this._service.deleteArticulo(id).subscribe(
            result => {

                if (result.code == 200) {
                    this.getProductos();
                } else {
                    console.log(result);
                }
            },
            error => {
            }
       );
    }

    borrarComfirmar(id) {

        this.confirmado = id;
    }

    borrarCancelar(id) {

        this.confirmado = null;
    }

    toggleThings(){
      
      $('.botones').slideToggle("fast");
       console.log('slideToggle');
    }


}