/**
 * Created by Administrator on 2017/5/1.
 */
import {ActionSheetController, LoadingController} from "ionic-angular";
import { NoticeService} from "./notice-service";
import { Transfer} from "@ionic-native/transfer";
import {Injectable} from "@angular/core";
import { Camera, CameraOptions  } from '@ionic-native/camera';
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
@Injectable()
export class ImgService {
  config: any;
  imageURL: any;
  uploadObj: any = {
    url: 'http://xxx/',           //接收图片的url
    fileKey: 'image',  //接收图片时的key
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' //不加入 发生错误！！
    },
    params: {},        //需要额外上传的参数
    success: (data) => {}, //图片上传成功后的回调
    error: (err) => {},   //图片上传失败后的回调
    listen: () => {}   //监听上传过程
  };
  //imgPath: string = ''; //图片路径

  fileTransfer: Transfer;

  options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
};
  private phone: string;
  private photoUrl: string;
  constructor(private actionSheetCtrl: ActionSheetController,
              private noticeSer: NoticeService, private camera: Camera, private fileChooser: FileChooser, private filePath: FilePath, public loadingCtrl: LoadingController) {


  }
  startCamera() {
    this.camera.getPicture().then((imageData) => {
      this.imageURL = imageData;
      this.photoUrl = imageData;
      this.upload(this.imageURL)
    }, (err) => {
      console.log(err);
    });
  }
  openImgPicker() {
    this.fileChooser.open().then(uri =>{
        this.filePath.resolveNativePath(uri)
          .then(filePath => {
            this.imageURL = filePath;
            this.photoUrl = filePath;
            this.upload(this.imageURL)
          });
      }
    ).catch(e => console.log(e));
  }
  upload(imgUrl){
    let loader = this.loadingCtrl.create({
      content: "正在上传头像...",
    });
    loader.present();
    const ft = new Transfer();
    const options = {
      fileKey: 'file',
      fileName: this.phone + '_head.jpg',
      params: {operatiune: 'uploadpoza'}
    };
    ft.create().upload(imgUrl,encodeURI(this.config.server +"/uploadFile/upload"),options)
      .then((data) => {
        if(data.response){
          const response = JSON.parse(data.response);
          if(response.rtn){
            loader.dismiss();
            alert("头像设置完成");
          }else{
            loader.dismiss();
            alert("头像设置失败，请重新登录");
          }
        }else{
          loader.dismiss();
          alert("头像设置失败，请重新登录");
        }
        //const rtnString = JSON.stringify(data);
      }, (err) => {
        loader.dismiss();
        alert("头像设置失败，请重新登录");
      })
  }

  showPicActionSheet() {
    this.useASComponent();
  }

  // 使用ionic中的ActionSheet组件
  private useASComponent() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choice',
      buttons: [
        {
          text: 'Take Photos',
          handler: () => {
            this.startCamera();
          }
        },
        {
          text: 'Choose from the Album',
          handler: () => {
            this.openImgPicker();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }
}