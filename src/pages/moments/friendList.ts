import {Component} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/UserService";

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
        let user = JSON.parse(friends[friend]);
        let contact = {
          "name": user.account,
          "whatsup": user.description,
          "avatar": user.imageSrc
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

let CONTACTS = [
  {"name": "Barbie", "whatsup": "So, who's ready for Ken's dream tour?", "avatar": "avatar-ts-barbie.png", "id": 0},

  {
    "name": "Bo Peep",
    "whatsup": "What would you say if I get someone else to watch the sheep for me tonight?",
    "avatar": "avatar-ts-bopeep.png", "id": 1
  },

  {"name": "Bullseye", "whatsup": "Neigh!", "avatar": "avatar-ts-bullseye.png", "id": 2},

  {
    "name": "Buzz Lightyear",
    "whatsup": "My eyeballs could have been sucked from their sockets!",
    "avatar": "avatar-ts-buzz.png", "id": 3
  },

  {"name": "Hamm", "whatsup": "You heard of Kung Fu? Well get ready for pork chop.", "avatar": "avatar-ts-hamm.png", "id": 4},

  {
    "name": "Jessie",
    "whatsup": "Well aren't you just the sweetest space toy I ever did meet!",
    "avatar": "avatar-ts-jessie.png", "id": 5
  },

  {
    "name": "Mr. Potato Head",
    "whatsup": "You're not turning me into a Mashed Potato.",
    "avatar": "avatar-ts-potatohead.png", "id": 6
  },

  {"name": "Rex", "whatsup": "Were you scared? Tell me honestly.", "avatar": "avatar-ts-rex.png", "id": 7},


  {"name": "吴老", "whatsup": "我会说中文", "avatar": "avatar-ts-woody.png", "id": 8},
];
