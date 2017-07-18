import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServiceComponent } from '../services/service.component';
import { Articulo } from '../services/articulo';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'producto-edit',
    templateUrl: './productos-add.component.html',
    providers: [ServiceComponent]
})

export class ProductEdit implements OnInit {

    public titulo: string;
    public articulo: Articulo;
    public filesToUpload;
    public resultUpload;
    public is_edit: boolean;
    public respuesta: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _service: ServiceComponent
    ) {
        this.respuesta = '';
        this.titulo = 'Edición';
        this.articulo = new Articulo(0, '', '', 0, '');
        this.is_edit = false;

    }

    ngOnInit() {

        this.getProducto();

    }


    getProducto() {

        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            console.log('id :' + id);
            this._service.getProducto(id).subscribe(
                response => {
                    if (response.code == 200) {

                        this.articulo = response.data;
                        console.log('articulo :' + this.articulo);
                             this.is_edit = true;
                    } else {

                        this._router.navigate(['/productos-list']);
                    }
                },
                error => {
                    console.log(<any>error);
                }

            )
        });
    }


    submitForm() {

        if (this.filesToUpload && this.filesToUpload.length >= 1) {
            this._service.makeFileRequest(GLOBAL.urlFile, [], this.filesToUpload).then((result: any) => {

                var filename;
                filename = result;

                if (filename.code == 200) { //  si la peticion ajax tiene exito seteamos la foto y subimos el articulo si no subimos articulo sin foto
                    this.articulo.imagen = filename.filename;
                    console.log('imagen' + ' ' + this.articulo.imagen);

                    this.saveProducto(); // completo
                } else {

                    this.saveProducto(); // sin foto
                }
            },
                (error) => {

                    console.log(<any>error);
                }
            );

        } else {
            this.saveProducto();
        }



    }

    fileChangeEvent(fileInput: any) {

        this.filesToUpload = <Array<File>>fileInput.target.files;


    }


    saveProducto() {


        this._route.params.forEach((params: Params) => {
            let id = params['id'];


            this._service.editArticulo(id, this.articulo).subscribe(

                response => {
                    if (<number>response.code == 200) {
                        this.respuesta = <string>response.status;
                        this._router.navigate(['/articulo-detail', id]);
                        console.log('respuesta :' + this.respuesta);
                    } else {
                        console.log('respuesta :' + this.respuesta);
                    }

                },
                error => {
                    console.log('respuesta :' + <any>error);
                });





        });






    }


}