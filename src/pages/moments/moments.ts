import {ChangeDetectorRef, Component} from '@angular/core';
import {NavController, ModalController, NavParams, AlertController} from 'ionic-angular';
import { ModalNewPostPage } from './newPost';
import { ModalMomentDetailPage } from './momentDetail';
import {MomentsService} from "../../services/MomentsService";


@Component({
  selector: 'page-moments',
  templateUrl: 'moments.html'
})

export class MomentsPage {
  items: any[];

  moments: any;
  accountData: {id:string, account:string};
  page = 0;
  constructor(
    public modalCtrl: ModalController,
    private momentsService: MomentsService,
    public navParams: NavParams,public navCtrl: NavController,
    private alertCtrl: AlertController, public cd: ChangeDetectorRef) {
    if (!this.accountData) {
      this.accountData = navParams.data.accountData;
    }
    if ("owner" === navParams.get("visible")) {
      momentsService.getMyMoments(this.accountData.id).then(data => {
        let moments = data["data"];
        this.moments = [];
        for (let moment in moments) {
          let obj = JSON.parse(moments[moment]);
          let new_moment = {
            "author": obj.account,
            "avatar": obj.avatar,
            "time": obj.time,
            "image": obj.imageSrc,
            "content": "<p>"+ obj.content +"</p>",
            "likes": obj.likes,
            "comments": [],
            "tags":obj.tag
          };
          this.moments.push(new_moment);
        }
        this.cd.detectChanges();
      })
    }
    else {
      this.getMoments(this.page);
    }
    //this.moments = momentsService.getMoments(this.account);
  }
  getMoments(page) {
    this.momentsService.getMoments(page).then(data => {
      let moments = data["data"];
      this.moments = [];
      for (let moment in moments) {
        let obj = JSON.parse(moments[moment]);
        let new_moment = {
          "author": obj.account,
          "avatar": obj.avatar,
          "time": obj.time,
          "image": obj.imageSrc,
          "content": "<p>"+ obj.content +"</p>",
          "likes": obj.likes,
          "comments": [],
          "tags":obj.tag
        };
        this.moments.push(new_moment);
      }
      this.page++;
      this.cd.detectChanges();
    })
  }
  openModalNewPostPage() {
    let modal = this.modalCtrl.create(ModalNewPostPage, this.accountData);
    modal.onDidDismiss(data => {
      if(data.foo !== "bar") {
        let moment = {
          "author": data.author,
          "avatar": data.avatar,
          "time": data.time,
          "image": "advance-card-bttf.png",//TODO
          "content": "<p>"+ data.content +"</p>",
          "likes": [],
          "comments": [],
          "tags":[]
        };
        this.moments.unshift(moment);
      }
    });
    modal.present();
  }

  openModalMomentDetailPage(moment) {
    let modal = this.modalCtrl.create(ModalMomentDetailPage, {moment:moment, accountData: this.accountData});
    modal.present();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getMoments(0);
      this.page = 0;
      refresher.complete();
      }, 2000);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      console.log("page", this.page);
      this.momentsService.getMoments(this.page).then(data => {
        console.log(this.moments);
        console.log(data);
        let moments = data["data"];
        for (let moment in moments) {
          let obj = JSON.parse(moments[moment]);
          let new_moment = {
            "author": obj.account,
            "avatar": obj.avatar,
            "time": obj.time,
            "image": obj.imageSrc,
            "content": "<p>"+ obj.content +"</p>",
            "likes": obj.likes,
            "comments": [],
            "tags":obj.tag
          };
          this.moments.push(new_moment);
        }
        this.page++;
      });
      infiniteScroll.complete();
    }, 500);
  }

  clickThumb(moment) {
    console.log("moment", moment);
    let index = moment.likes.indexOf(this.accountData.account);
    if (index >= 0) {
      // code...
      this.momentsService.addLike(this.accountData.id, moment.id).then(data => {
        console.log("data", data);
        if(data["status"] !== "200") {
          let alert = this.alertCtrl.create({
            title: 'ERROR',
            subTitle: 'NETWORK ERROR',
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          moment["likes"].splice(index,1);
        }
      });
    }
    else {
      this.momentsService.addLike(this.accountData.id, moment.id).then(data => {
        console.log("data", data);
        if(data["status"] !== "200") {
          let alert = this.alertCtrl.create({
            title: 'ERROR',
            subTitle: 'NETWORK ERROR',
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          moment["likes"].push(this.accountData.account);
        }
      });
    }
  }
}
