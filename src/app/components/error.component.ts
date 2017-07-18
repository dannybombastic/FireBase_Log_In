import { Component } from '@angular/core';

@Component({
     selector:'error',
     templateUrl:'./error.component.html',

    

})
export class ErrorComponent{

    public titulo:string;

    constructor(){

        this.titulo = 'pagina no encontrada';
    }

    ngOinIt(){

        console.log('componente Error cargado ')
    }
}