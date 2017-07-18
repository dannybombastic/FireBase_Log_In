import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServiceComponent } from '../services/service.component';
import { Articulo } from '../services/articulo';
import { GLOBAL } from '../services/global';



@Component({
    selector: 'productos-add',
    templateUrl: './productos-add.component.html',
    providers: [ServiceComponent]

})

export class ProductosAdd {

    public respuesta: string;
    public titulo: string;
    public articulo: Articulo;
    public filesToUpload;
    public resultUpload;
    public is_edit:boolean = false;
    constructor(
        private _service: ServiceComponent,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.filesToUpload = '';

        this.respuesta = '';
        this.titulo = 'Agregar producto';
        this.articulo = new Articulo(0, '', '', 0, '');
    }

    ngOnInit() {

    }

    submitForm() {
        var filename;
        if (this.filesToUpload && this.filesToUpload.length >= 1) {
            this._service.makeFileRequest(GLOBAL.urlFile, [], this.filesToUpload).then((result: any) => {

                filename = result;

                if (filename.code == 200) { //  si la peticion ajax tiene exito seteamos la foto y subimos el articulo si no subimos articulo sin foto
                    this.articulo.imagen = filename.filename;
                    console.log(filename.filename + ' ' + this.articulo.imagen);
                           this.is_edit = true;
                    this.saveProducto(); // completo
                } else {

                    this.saveProducto(); // sin foto
                }
            },
                (error) => {

                    console.log(<any>error);
                }
            );

        }else{
            this.saveProducto();
        }
    }

    fileChangeEvent(fileInput: any) {

        this.filesToUpload = <Array<File>>fileInput.target.files;


    }


    saveProducto() {
        this._service.addArticulo(this.articulo).map(res => res.json()).subscribe(

            response=> {
                if (<number>response.code == 200) {
                    this.respuesta = <string>response.status;
                  this._router.navigate(['/productos-list']);
                  console.log(this.respuesta);
                } else {
                    console.log(this.respuesta);
                }

            },
            error => {
                console.log(<any>error);
            });

    }

}