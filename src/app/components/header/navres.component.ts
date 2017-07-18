import { Component, OnInit, Input, Inject } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Users } from '../../model/users';
import { NameComponent } from '../../components/title.component';
import { Subscription } from 'rxjs/Subscription';
import { ServiceUser } from '../../services/service.user.component';
import { FireService } from '../../services/service.fire'
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
declare var jQuery: any; // jquery
declare var $: any;

@Component({
    selector: 'nav-bar',
    templateUrl: './navres.component.html'
})

export class NavResComponent implements OnInit {


    @Input()

    set name(name: string) {
        this.user.name = (name && name.trim() || '<Dannybombastic>')
    }
    get name(): string {

        return this.user.name;
    }
    @Input()
    set image(image: string) {
        this.imagen = (image && image.trim() || 'profile.svg');
        // document.querySelector('img').src = this.imagen;
    }
    get image(): string {

        return this.imagen;
    }


    public userF: Observable<firebase.User>;
    public imagen: string = "profile.svg";
    public user: Users = new Users(0, '', '', '', '');
    public subscription: Subscription;
    public pic: boolean = false;
    public title: string = 'nav bar :-D';


    constructor(
        private aut: AngularFireAuth,
        private _fireSrevice: FireService,
        private _service: ServiceUser,
        private _cookie: CookieService,
        private _router: Router,
        private _route: ActivatedRoute,

    ) {
        this.imagen = "profile.svg";

    }

    ngOnInit() {

this.subscription = this._service.loged$.subscribe(loged => {

            if (loged == true) {
                this.pic = false;
                console.log('pasando');
                this.subscription = this._service.a$.subscribe(user => {
                    this.user = <Users>user;
                    this.imagen = user.imagen;
                    this.name = user.name;

                    // document.querySelector('img').src = user.imagen;

                });
            } 
        });


  this.subscription = this._fireSrevice.sesion$.subscribe(value => {

            this.pic = true;
            if (value == true) {
                this._fireSrevice.f$.subscribe(user => {
                    this.imagen = user.imagen;
                    this.name = user.name;

                });
            } else {

                this.pic = false;
            }

        });




    }




    logOut() {
        this.imagen = "profile.svg";
        this.pic = false;
        this._fireSrevice.logOut();
        this._cookie.set('logged', 'false');
        this._cookie.set('fire', '12345');
        this.user.name = ' ';
        this._service.logOut();
        this._router.navigate(['/home']);
    }



    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();

    }



}
