import { Component, OnInit ,Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'title-name',
    templateUrl: './title.component.html',
    providers:[CookieService]
})

 
export class NameComponent implements OnInit{

   
@Input()

set title(title:string){
    this.titulo = (title && title.trim() || '<Dannybombastic>')
}
get title():string{

    return this.titulo;
}
    
    
    public titulo:string;
    

    
    constructor(private _coockie: CookieService) {
            
          if(this._coockie.get("logged") == 'true'){
        this.titulo = this._coockie.get("name");
          }else{
              this.title = 'componente title';
          }
     }

    ngOnInit() { 


    }
 
 
 
    
}