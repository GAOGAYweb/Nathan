import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {ImgService} from "../account/profile/profile-detail/image-service";
import {NoticeService} from "../account/profile/profile-detail/notice-service";
import {MomentsService} from "../../services/MomentsService";
import { ModalController, NavParams } from 'ionic-angular';
import {FriendList} from "./friendList";
import {LocationList} from "./LocationList";
import {ShareDetail} from "./shareDetail";
import {UserService} from "../../services/UserService";
@Component({
  selector: 'page-newPost',
  templateUrl: 'newPost.html',
  providers:[ImgService, NoticeService],
})

export class ModalNewPostPage {
  character;
  data: any;
  accountData:{id:string, account:string};
  locationModal:any;
  accountInformation: { name: string, description: string, gender: string, friendsNum: number, imageSrc:string};
  constructor(public viewCtrl: ViewController, private notiSer: NoticeService, private imgSer: ImgService,
              private momentsService: MomentsService, public userService: UserService,public modalCtrl: ModalController,
              public navParams: NavParams) {
    this.accountData = navParams.data;
    this.accountInformation = JSON.parse(this.userService.getSessionUserInformation());
    this.data = {
      content: "",
      author: this.accountData.account,
      avatar: this.accountInformation.imageSrc,
      time: "",
      image:[],
      likes:[],
      comments:[],
      commentsSize : 0,
      mentionedFriends:[],
      streetName: "",
      longitude:0,
      latitude:0
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({"foo":"bar"});
  }
  sendMoment() {
    if(this.data.content != "") {
      let obj = {
        "id": this.accountData.id,
        "content": this.data.content
      };
      if (this.data.longitude != 0 && this.data.latitude != 0) {
        obj["longitude"] = this.data.longitude;
        obj["latitude"] = this.data.latitude;
        obj["streetName"] = this.data.streetName;
      }
      if(this.data.image.length > 0) {
        obj["image"] = this.data.image[0];
      }
      this.momentsService.sendMoments(obj).then(data => {
        console.log("return data",data["status"]);
        if (data["status"] === 200) {
          this.data.time = new Date().toLocaleString();
          this.viewCtrl.dismiss(this.data);
        }
        else {
          this.viewCtrl.dismiss({"foo":"bar"});
        }
      });
    }
    else {
      this.viewCtrl.dismiss({"foo":"bar"});
    }
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
          this.data.streetName = data.streetName;
        }
      });
    }
    this.locationModal.present();
  }
  clearLocation() {
    if (this.data.latitude != 0 && this.data.longitude != 0) {
      this.data.streetName = "";
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
