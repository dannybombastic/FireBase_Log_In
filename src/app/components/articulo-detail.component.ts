import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServiceComponent } from '../services/service.component';
import { Articulo } from '../services/articulo';  // servicio con los metodos para las peticiones

@Component({
    selector: 'articulo-detail',
    templateUrl: './articulo-detail.component.html',
    providers: [ServiceComponent] // objeto ServiceComponent
})

export class ArticuloDetail {

    public articulo: Articulo;


    constructor(
        private _service: ServiceComponent,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }



    ngOnInit() {
        console.log('articulos detail');
          this.getProducto();

    }

    getProducto() {

        this._route.params.forEach((params: Params) => {
            let id = params['id'];
 console.log('id :'+id);
            this._service.getProducto(id).subscribe(
                response => {
                            if(response.code == 200){
                             
                              this.articulo = response.data;
                              console.log('articulo :'+this.articulo);

                            }else{

                                this._router.navigate(['/productos-list']);
                            }
                },
                error => {
                    console.log(<any>error);
                }

            )
        });
    }


}

