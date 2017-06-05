import { Component } from '@angular/core';
import { NavController,ModalController , NavParams} from 'ionic-angular';
import { ModalNewPostPage } from './newPost';
import { ModalMomentDetailPage } from './momentDetail';
import {MomentsService} from "../../services/MomentsService";


@Component({
  selector: 'page-moments',
  templateUrl: 'moments.html'
})

export class MomentsPage {

  moments: any;
  account: string;
  accountData: {id:string, account:string};
  constructor(
    public modalCtrl: ModalController, 
    private momentsService: MomentsService, 
    public navParams: NavParams,public navCtrl: NavController) {
    console.log("data", navParams.data);
    if (!this.accountData) {
      this.accountData = navParams.data;
    }
    this.moments = momentsService.getMoments(this.account);
  }

  openModalNewPostPage() {
    let modal = this.modalCtrl.create(ModalNewPostPage);
    modal.onDidDismiss(data => {
      if(data.foo !== "bar") {
        let moment = {
          "author": data.author,
          "avatar": data.avatar,
          "time": data.time,
          "image": "advance-card-bttf.png",
          "content": "<p>"+ data.content +"</p>",
          "likes": [],
          "comments": [],
          "tags":["technique", "geek"]
        };
        console.log(data);
        this.moments.unshift(moment);
      }
    });
    modal.present();
  }

  openModalMomentDetailPage(moment) {
    let modal = this.modalCtrl.create(ModalMomentDetailPage, moment);
    modal.present();
  }

  clickThumb(moment) {
    let index = moment.likes.indexOf(this.accountData.account); 
    if (index >= 0) {
      // code...
      moment["likes"].splice(index,1);
    }
    else {
      moment["likes"].push(this.accountData.account);
    }
  }
}
