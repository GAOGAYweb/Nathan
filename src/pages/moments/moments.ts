import {ChangeDetectorRef, Component} from '@angular/core';
import {NavController, ModalController, NavParams, AlertController} from 'ionic-angular';
import { ModalNewPostPage } from './newPost';
import { ModalMomentDetailPage } from './momentDetail';
import {MomentsService} from "../../services/MomentsService";
import {AppConfig} from "../../app/app.config";


@Component({
  selector: 'page-moments',
  templateUrl: 'moments.html'
})

export class MomentsPage {

  moments: any;
  accountData: {id:string, account:string};
  page = 0;
  delete:boolean;
  constructor(
    public modalCtrl: ModalController,
    private momentsService: MomentsService,
    public navParams: NavParams,public navCtrl: NavController,
    private alertCtrl: AlertController, public cd: ChangeDetectorRef) {
    if (!this.accountData) {
      this.accountData = navParams.data.accountData;
    }
    if ("owner" === navParams.get("visible")) {
      this.delete = true;
      momentsService.getMyMoments(this.accountData.id).then(data => {
        this.moments = [];
        this.addMoments(data);
        this.cd.detectChanges();
      })
    }
    else {
      this.getMoments(this.page);
    }
    //this.moments = momentsService.getMoments(this.account);
  }
  getMoments(page) {
    this.momentsService.getMoments(page,this.accountData.id).then(data => {
      this.moments = [];
      this.addMoments(data);
      this.page++;
      this.cd.detectChanges();
    })
  }
  openModalNewPostPage() {
    let modal = this.modalCtrl.create(ModalNewPostPage, this.accountData);
    modal.onDidDismiss(data => {
      if(data.foo !== "bar") {
        let moment = {
          "id": data.id,
          "author": data.author,
          "avatar": AppConfig.getImagePrefix() + data.avatar,
          "time": data.time,
          "image": data.image.length > 0 ? AppConfig.getImagePrefix() + data.image[0] : null,
          "content": "<p>"+ data.content +"</p>",
          "streetName": data.streetName,
          "likes": [],
          "comments": [],
          "commentsSize": data.commentsSize,
          "tags":[]
        };
        this.moments.unshift(moment);
        this.cd.detectChanges();
      }
    });
    modal.present();
  }

  openModalMomentDetailPage(moment) {
    let modal = this.modalCtrl.create(ModalMomentDetailPage, {moment:moment, accountData: this.accountData});
    modal.present();
  }
  doDelete(moment) {
    let alert = this.alertCtrl.create({
      title: 'Delete Confirm',
      message: 'Do you want to delete this moment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.momentsService.deleteMoment(moment.id).then(data => {
              if (data["status"] === "200") {
                this.moments.splice(this.moments.indexOf(moment), 1);
                this.cd.detectChanges();
              }
            })
          }
        }
      ]
    });
    alert.present();
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
      this.momentsService.getMoments(this.page,this.accountData.id).then(data => {
        this.addMoments(data);
        this.page++;
      });
      infiniteScroll.complete();
    }, 500);
  }
  addMoments(data) {
    let moments = data["data"];
    for (let moment in moments) {
      let obj = JSON.parse(moments[moment]);
      let new_moment = {
        "id": obj.id,
        "author": obj.account,
        "avatar": AppConfig.getImagePrefix() + obj.avatar,
        "time": obj.time,
        "image": AppConfig.getImagePrefix() +  obj.imageSrc,
        "content": "<p>"+ obj.content +"</p>",
        "likes": obj.likes,
        "comments": [],
        "streetName": obj.streetName === "空" ? "" : obj.streetName,
        "commentsSize": obj.commentSize,
        "tags":obj.tag
      };
      this.moments.push(new_moment);
    }
  }
  clickThumb(moment) {
    let index = moment.likes.indexOf(this.accountData.account);
    if (index >= 0) {
      // code...
      this.momentsService.addLike(this.accountData.id, moment.id).then(data => {
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
