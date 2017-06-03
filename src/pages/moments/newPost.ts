import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {ImgService} from "../account/profile/profile-detail/image-service";
import {NoticeService} from "../account/profile/profile-detail/notice-service";
import {MomentsService} from "../../services/MomentsService";
import { ModalController, NavParams } from 'ionic-angular';
import {FriendList} from "./friendList";
import {LocationList} from "./LocationList";
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
      time: "",
      image:[],
      likes:[],
      comments:[],
      mentionedFriends:[]
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  sendMoment() {
    console.log(this.data);
    this.momentsService.sendMoments(this.data);
    this.viewCtrl.dismiss();
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(FriendList, { userId: 8675309 });
    profileModal.onDidDismiss(data => {
      this.data.mentionedFriends = data;
      console.log(this.data.mentionedFriends);
    });
    profileModal.present();
  }
  presentLocationModal() {
    let profileModal = this.modalCtrl.create(LocationList);
    profileModal.present();
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
