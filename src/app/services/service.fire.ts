import { Injectable } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable, } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersFire } from '../model/user.firebase';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import { CookieService } from 'ngx-cookie-service';
import { FirebaseApp } from 'angularfire2';


@Injectable()
export class FireService {

    public evento = new Subject<UsersFire>();
    public f$ = this.evento.asObservable();
    public userF: Observable<firebase.User>;
    public key: string;
    public user: UsersFire;
    public sesion_callBack = new Subject<boolean>();
    public sesion$ = this.sesion_callBack.asObservable();

    public total_users: UsersFire[];
    public userPic: UsersFire;
    public use: FirebaseListObservable<any[]>;
    public bandera: boolean;
    public bande = false;
    public call_back = new Subject<boolean>();
    u$ = this.call_back.asObservable();
    public strRef: any = '';


    constructor(
        private cookie: CookieService,
        private _app: FirebaseApp,
        private _auth: AngularFireAuth,
        private _db: AngularFireDatabase,
        private _route:ActivatedRoute,
        private _router:Router
    ) {
        this.userPic = new UsersFire('', '', '', '', '');
        this.strRef = firebase.storage(this._app).ref('images');
        this.user = new UsersFire('', '', '', '', '');
        this.total_users = [];
        this.use = this._db.list('/users');
        this.use.subscribe(result => {
            this.total_users = (<UsersFire[]>result);
            console.log('user', this.total_users);

           
        });

         this.userF = this._auth.authState;
            this.userF.subscribe((user)=>{
            console.log('control', user);
                    
                    if( user == null ){
                       
                         this._router.navigate(['/log-user']);
                            
                    }
  
            });

    }

    ControlSesion(){


            this.userF = this._auth.authState;
            this.userF.subscribe((user)=>{
            console.log('control', user);
                    
                    if( user == null ){
                       
                         this._router.navigate(['/log-user']);
                            
                    }
  
            });

    }

    subirFoto(element: HTMLDocument) {

        this.userF = this._auth.authState;

        
        this.userF.subscribe(state => {

            if (state) {
                for (let selectedFile of [(<HTMLInputElement>element.getElementById('file')).files[0]]) {
                    console.log(selectedFile);
                    // Make local copies of services because "this" will be clobbered

                    let date = new Date().toLocaleDateString();
                    let folder = 'imagenes'
                    let path = `/${folder}/${selectedFile.name + date}`;
                    var iRef = this.strRef.child(path);
                    iRef.put(selectedFile).then((snapshot) => {

                        state.sendEmailVerification();

                        state.updateProfile({

                            displayName: this.user.name,
                            photoURL: snapshot.downloadURL,
                        }).then(() => {
                            console.log(state.photoURL);

                        });


                        this.user.imagen = snapshot.downloadURL;
                        this.cookie.set('fire', '1234');
                        this.evento.next(this.user);

                        this._db.list('users').update(this.key,this.user);
                                                console.log('Uploaded a blob or file! Now storing the reference at', `/${folder}/images/`);

                    },
                        error => {

                            console.log(<any>error);

                        });
                }
                console.log(state.email);
            }


        });










    }

    logOut() {
        this._auth.auth.signOut();
        this.user.imagen = "profile.svg";
        this.user.name = '';
        this.evento.next(this.user);
        this.sesion_callBack.next(false);
    }

    comprobarUser(user: UsersFire): boolean {


        return false;
    }

    loGinUser(user: UsersFire): boolean {
        this.user = user;
        this.sesion_callBack.next(true);
        this.cookie.set('fire', '1234');
        this._auth.auth.signInWithEmailAndPassword(user.email, user.pass).then((result) => {
            /* this._db.database.ref('porfoliodanny').child('users').orderByChild('email').equalTo(this.user.email).on('value', result => {
               console.log('repe', result);
             });*/


            console.log(result);




            if (result.emailVerified != null) {


                this.userPic.imagen = result.photoURL;
                this.userPic.name = result.displayName;
                this.userPic.email = result.email;
                this.userPic.pass = user.pass;
                this.bande = true;
                this.call_back.next(true);

                this.evento.next(this.userPic);

            } else {
                alert('verifique su email');
            }




        }
            ,
            error => {
                user.email = <string>error.message;
                let a = setTimeout(() => {
                    user.email = '';
                    user.pass = '';
                }, 2000);
            });




        return this.bande;

    }


    registerFireUser(user: UsersFire, doc: HTMLDocument) {


        this._auth.auth.createUserWithEmailAndPassword(user.email, user.pass).then((result) => {
            /* this._db.database.ref('porfoliodanny').child('users').orderByChild('email').equalTo(this.user.email).on('value', result => {
               console.log('repe', result);
             });*/




            this.key = this._db.list('users').push(this.user).key;
            // this._auth.auth.currentUser.displayName = this.user.name;



            this.user.user_id = this.key;
            this.user.name = user.name;
            this.user.pass = user.pass;
            this.user.email = user.email;
            this.subirFoto(doc);
            this._db.list('users').update(this.key,this.user);
            this.cookie.set('fire', '1234');

            console.log('key', this.key);
            this.bande = true;
            this.call_back.next(true);

        },
            error => {

                user.email = <string>error.message;
                let a = setTimeout(() => {
                    user.email = '';
                }, 2000);

                console.log(<any>error.message);
                this.bande = false;
                this.call_back.next(false);
            });


    }





}