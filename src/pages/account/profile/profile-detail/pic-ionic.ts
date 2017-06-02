/**
 * Created by Administrator on 2017/5/1.
 */
import {Component} from "@angular/core";
import {ImgService} from "./image-service";
import {NoticeService} from "./notice-service";
import {NavController, NavParams} from "ionic-angular";


@Component({
  selector: 'page-profile-ionic',
  templateUrl: 'pic-ionic.html',
  providers:[ImgService, NoticeService],
})
export class PicIonicPage {
  imgSrc: string;
  constructor(private notiSer: NoticeService, private imgSer: ImgService, public navCtrl: NavController, public navParams: NavParams) {
    this.imgSrc = navParams.get("imageSrc");
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
