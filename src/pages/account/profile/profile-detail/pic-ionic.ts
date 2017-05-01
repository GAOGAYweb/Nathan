/**
 * Created by Administrator on 2017/5/1.
 */
import {Component} from "@angular/core";
import {ImgService} from "./image-service";
import {NoticeService} from "./notice-service";
import {NavController, NavParams} from "ionic-angular";
//import {IonicImageViewerModule} from "ionic-img-viewer";


@Component({
  selector: 'page-profile-ionic',
  templateUrl: 'pic-ionic.html',
  providers:[ImgService, NoticeService],
})
// @NgModule({
//   imports: [
//     IonicImageViewerModule
//   ]
// })
export class PicIonicPage {
  imgSrc: string;
  constructor(private notiSer: NoticeService, private imgSer: ImgService, public navCtrl: NavController, public navParams: NavParams) {
    this.imgSrc = navParams.get("imageSrc");
  }
  initImgSer() {
    this.imgSer.upload.url = ''; // 上传图片的url，如果同默认配置的url一致，那无须再设置
    this.imgSer.upload.success = (data) => {
      //上传成功后的回调处理
    };
    this.imgSer.upload.error = (err) => {
      this.notiSer.showToast('错误：头像上传失败！');
    };
  }
  choosePics() {
    this.initImgSer();
    this.imgSer.showPicActionSheet();
  }
}
