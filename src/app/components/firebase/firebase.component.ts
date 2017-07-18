import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { } from '@angular/animations';
import { UsersFire } from '../../model/user.firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FireService } from '../../services/service.fire';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'firebase-log',
  templateUrl: './firebase.component.html',
  styleUrls: ['firebase.styles.css']
})


// // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// // The Firebase SDK is initialized and available here!
//
// firebase.auth().onAuthStateChanged(user => { });
// firebase.database().ref('/path/to/ref').on('value', snapshot => { });
// firebase.messaging().requestPermission().then(() => { });
// firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
//
// // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

export class FireComponent implements OnInit {

  public subscription: Subscription;
  public user: UsersFire;
  public total_users: UsersFire[];
  public use: FirebaseListObservable<any[]>;
  public bandera: boolean = false;
  title: string;


  constructor(
    private _service: FireService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _auth: AngularFireAuth,
    private _db: AngularFireDatabase
  ) {

    this.title = 'Firebase Component';
    this.user = new UsersFire('', '', '', '', '');
    this.total_users = [];


  }

  submitForma() {
    this.bandera = this._service.loGinUser(this.user);
    this.subscription = this._service.u$.subscribe(result => {

      if (result) {
        console.log(result);
        this._router.navigate(['/home']);
      }

    });






  }

  ngOnInit() {




  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();

  }


}

