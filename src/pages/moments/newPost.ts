import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {ImgService} from "../account/profile/profile-detail/image-service";
import {NoticeService} from "../account/profile/profile-detail/notice-service";
import {MomentsService} from "../../services/MomentsService";
import { ModalController, NavParams } from 'ionic-angular';
import {FriendList} from "./friendList";
import {LocationList} from "./LocationList";
import {ShareDetail} from "./shareDetail";
@Component({
  selector: 'page-newPost',
  templateUrl: 'newPost.html',
  providers:[ImgService, NoticeService],
})

export class ModalNewPostPage {
  character;
  data: any;
  accountData:{id:string, account:string};
  locationName = "";
  locationModal:any;
  constructor(public viewCtrl: ViewController, private notiSer: NoticeService, private imgSer: ImgService,
              private momentsService: MomentsService, public modalCtrl: ModalController,
              public navParams: NavParams) {
    this.accountData = navParams.data;
    this.data = {
      content: "",
      author: this.accountData.account,
      avatar:"",
      time: "",
      image:[],
      likes:[],
      comments:[],
      mentionedFriends:[],
      longitude:0,
      latitude:0
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({"foo":"bar"});
  }
  sendMoment() {
    console.log(this.data);
    //this.momentsService.sendMoments(this.data);
    this.viewCtrl.dismiss(this.data);
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(FriendList, { id: this.accountData.id });
    profileModal.onDidDismiss(data => {
      if(data.foo !== "bar") {
        this.data.mentionedFriends = data;
      }
    });
    profileModal.present();
  }
  presentLocationModal() {
    if (this.locationModal == null) {
      this.locationModal = this.modalCtrl.create(LocationList);
      this.locationModal.onDidDismiss(data => {
        if(data.foo !== "bar") {
          this.data.latitude = data.latitude;
          this.data.longitude = data.longitude;
          this.locationName = data.streetName;
        }
      });
    }
    // let locationModal = this.modalCtrl.create(LocationList, {pointer: this.data.locationPoint == null ? null : this.data.locationPoint});
    this.locationModal.present();
  }
  clearLocation() {
    if (this.data.latitude != 0 && this.data.longitude != 0) {
      this.locationName = "";
      this.data.latitude = this.data.longitude = 0;
    }
  }
  presentShareModal() {
    let presentModal = this.modalCtrl.create(ShareDetail);
    presentModal.onDidDismiss(data => {
      if(data.foo !== "bar") {
        this.data.locationPoint = data;
      }
    });
    presentModal.present();
  }
  getMentionedFriends(){
    if (this.data.mentionedFriends.length > 0) {
      return "Mention: " + this.data.mentionedFriends.join(", ");
    }
    return "";
  }
  clearMention() {
    this.data.mentionedFriends = [];
  }
  initImgSer() {
    this.imgSer.uploadObj.url = '';
    this.imgSer.uploadObj.success = (data) => {

    };
    this.imgSer.uploadObj.error = (err) => {
      this.notiSer.showToast('Error: uploading failure...');
    };
  }
  choosePics() {
    this.initImgSer();
    this.imgSer.showPicActionSheet();
  }
}
