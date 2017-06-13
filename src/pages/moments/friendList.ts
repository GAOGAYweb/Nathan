import {Component} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/UserService";
import {AppConfig} from "../../app/app.config";

@Component({
  selector: 'page-friends-list',
  templateUrl: 'friendList.html'
})
export class FriendList {
  selectedContacts: any[];
  contacts;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public userService:UserService) {
    console.log("init contact!");
    this.selectedContacts = [];
    this.contacts = [];

    this.userService.getFriendList(navParams.get("id")).then(data => {
      let friends = data["data"];
      for (let friend in friends) {
        let user = JSON.parse(JSON.parse(friends[friend]).friends[0]);
        let contact = {
          "name": user.account,
          "whatsup": user.description,
          "avatar": AppConfig.getImagePrefix() + user.imageSrc
        };
        this.contacts.push(contact);
      }
    });
    //this.contacts = CONTACTS;
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  clickedAvatar(name: string){
    if(this.isInArray(name)){
      let index = this.selectedContacts.indexOf(name);

      this.selectedContacts.splice(index,1);
    }else{
      this.selectedContacts.push(name);
    }
  }
  isInArray(name: string): boolean{
    let check: boolean = false;
    for(let contactId of this.selectedContacts){
      if(contactId === name){
        check = true;
      }
    }
    return check;
  }
  confirmFriendsList() {
    this.viewCtrl.dismiss(this.selectedContacts);
  }
}


