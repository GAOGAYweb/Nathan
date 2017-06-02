import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {ImgService} from "../account/profile/profile-detail/image-service";
import {NoticeService} from "../account/profile/profile-detail/notice-service";
import {MomentsService} from "../../services/MomentsService";

@Component({
  selector: 'page-newPost',
  templateUrl: 'newPost.html',
  providers:[ImgService, NoticeService],
})

export class ModalNewPostPage {
  character;
  data: any;
  constructor(public viewCtrl: ViewController, private notiSer: NoticeService, private imgSer: ImgService, private momentsService: MomentsService) {
    this.data = {
      content: "",
      author: "",
      time: "",
      image:[],
      likes:[],
      comments:[],
    }
  }

  dismiss() {
    let content = this.data.content;
    this.momentsService.sendMoments(this.data);
    this.viewCtrl.dismiss();
  }

  initImgSer() {
    this.imgSer.uploadObj.url = ''; // 上传图片的url，如果同默认配置的url一致，那无须再设置
    this.imgSer.uploadObj.success = (data) => {
      //上传成功后的回调处理
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
