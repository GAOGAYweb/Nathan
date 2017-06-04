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
  constructor(public viewCtrl: ViewController, private notiSer: NoticeService, private imgSer: ImgService, private momentsService: MomentsService, public modalCtrl: ModalController) {
    this.data = {
      content: "",
      author: "",
      avatar:"",
      time: "",
      image:[],
      likes:[],
      comments:[],
      mentionedFriends:[],
      locationPoint:null
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
    let profileModal = this.modalCtrl.create(FriendList, { userId: 8675309 });
    profileModal.onDidDismiss(data => {
      if(data.foo !== "bar") {
        this.data.mentionedFriends = data;
        console.log(this.data.mentionedFriends);
      }
    });
    profileModal.present();
  }
  presentLocationModal() {
    let locationModal = this.modalCtrl.create(LocationList);
    locationModal.onDidDismiss(data => {
      if(data.foo !== "bar") {
        this.data.locationPoint = data;
      }
    });
    locationModal.present();
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
