import { Component, OnInit,Inject } from '@angular/core';
import {UsersFire} from '../../model/user.firebase';
import { FireService } from '../../services/service.fire';
import * as firebase from 'firebase';

import {FirebaseApp} from 'angularfire2';
@Component({
    selector: 'fire-reg',
    templateUrl: 'firereg.component.html'
})

export class FireRegComponent implements OnInit {

    public user:UsersFire = new UsersFire('','','','','');
    public filesToUpload;
    public resultUpload;
    public log: boolean;
    public title: string;
    public id: number;
    public bind_pass:string ='';
    public strRef:any = '';

    constructor(
       private firebaseApp:FirebaseApp,
        private _service:FireService
    ) { 
        // this.strRef = firebase.storage(this.firebaseApp).ref('images');
           
    }


    ngOnInit() { }


 submitForm(){
   
 this._service.registerFireUser(this.user,document);
 }




upload(){
   console.log(this.user);
console.log([(<HTMLInputElement>document.getElementById('file')).files[0]])
    
}

    

}