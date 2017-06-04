import { Component } from '@angular/core';
import { ModalController , NavParams} from 'ionic-angular';
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
    public navParams: NavParams) {
    console.log("data", navParams.data);
    if (!this.accountData) {
      this.accountData = JSON.parse(navParams.data);
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
    let idnex = moment["likes"].indexOf(this.accountData.account); 
    if (idnex >= 0) {
      // code...
      moment["likes"].remove(idnex);
    }
    else {
      moment["likes"].push(this.accountData.account);
    }
  }
}
