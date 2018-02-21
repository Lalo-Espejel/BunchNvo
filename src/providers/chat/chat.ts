import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {
    firebuddychats = firebase.database().ref('/buddychats');
    buddy: any;
    buddymessages = [];
    constructor(public http: Http, public events: Events) {}

    initializebuddy(buddy) {
        console.log('initializebuddy buddy', buddy);
        this.buddy = buddy;
    }

    getbuddymessages() {
        console.log('getbuddymessages');
        console.log('this.buddy', this.buddy);
        let temp;
        let buddyUid = this.buddy.uid || this.buddy[0].uid; //antes era: this.buddy.uid
        if (buddyUid != undefined) {
            this.firebuddychats.child(firebase.auth().currentUser.uid).child(buddyUid).on('value', (snapshot) => {
                this.buddymessages = [];
                temp = snapshot.val();
                for (var tempkey in temp) {
                    this.buddymessages.push(temp[tempkey]);
                }
                this.events.publish('newmessage');
            });
        }        
    }

    addnewmessage(msg) {
        if (this.buddy) {
            var promise = new Promise((resolve, reject) => {
                this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).push({
                    sentby: firebase.auth().currentUser.uid,
                    message: msg,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }).then(() => {
                    this.firebuddychats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).push({
                        sentby: firebase.auth().currentUser.uid,
                        message: msg,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    }).then(() => {
                        resolve(true);
                    })
                })
            })
            return promise;
        }
    }  
}
