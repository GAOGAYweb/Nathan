/**
 * Created by Administrator on 2017/6/3.
 */
import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
declare var Wechat:any;
@Component({
  selector: 'page-friends-list',
  templateUrl: 'shareDetail.html'
})
export class ShareDetail {
  shareUrl: any;
  shareImg: any;
  shareDesc: any;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {

  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
  shareWxSession(){
    let wechat = (<any>window).Wechat;
    wechat.isInstalled(function (installed) {
      if(!installed){
        this.toastService.show('您没有安装微信！');
        return ;
      }
    }, function (reason) {
      this.toastService.show("Failed: " + reason);
    });
    wechat.share({
      message: {
        title: this.shareImg,
        description: this.shareDesc,
        thumb: this.shareImg,
        media: {
          type: wechat.Type.LINK,
          webpageUrl: this.shareUrl
        }
      },
      scene: wechat.Scene.SESSION   // share to SESSION
    }, function () {
      this.toastService.show('分享成功');
    }, function (reason) {
      console.log("Failed: " + reason);
    });
  }
  shareWxTimeLine(){
    let wechat = (<any>window).Wechat;
    wechat.isInstalled(function (installed) {
      if(!installed){
        this.toastService.show('您没有安装微信！');
        return ;
      }
    }, function (reason) {
      this.toastService.show("Failed: " + reason);
    });
    wechat.share({
      message: {
        title: this.shareImg,
        description: this.shareDesc,
        thumb: this.shareImg,
        media: {
          type: wechat.Type.LINK,
          webpageUrl: this.shareUrl
        }
      },
      scene: wechat.Scene.TIMELINE   // share to Timeline
    }, function () {
      this.toastService.show('分享成功','bottom',4000);
    }, function (reason) {
      console.log("Failed: " + reason);
    });

  }
}

