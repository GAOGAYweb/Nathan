import {Component, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {ModalController, NavController, Platform, NavParams} from 'ionic-angular';
import { MOMENTS} from './mock.moments';
import {ModalMomentDetailPage} from "../moments/momentDetail";
import {MomentsService} from "../../services/MomentsService";
import {AppConfig} from "../../app/app.config";
declare var BMap;
@Component({
  selector: 'map-presentation',
  templateUrl: `map.html`,
  styles: [`
    #map{
      width: 100%;
      height: 100%;
      display: block;
      overflow: hidden;
      margin:0;
      font-family:"微软雅黑";

    }
    .scroll{
      height: 100%;
    }
  `]
})
export class MapPage{
  map:any;
  moments:any;
  accountData:{};
  @ViewChild('map') mapElement: ElementRef;
  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public momentsService: MomentsService,
    public cd: ChangeDetectorRef
  ){
    if (!this.accountData) {
      this.accountData = navParams.data;
    }

    this.moments = MOMENTS;
    this.momentsService.getMoments(0).then(data => {
      let moments = data["data"];
      this.moments = [];
      for (let moment in moments) {
        let obj = JSON.parse(moments[moment]);
        let new_moment = {
          y: obj.latitude,
          x: obj.longitude,
          content: obj.content,
          author: obj.account,
          time: obj.time,
          image: AppConfig.getImagePrefix() + obj.imageSrc,
          avatar:AppConfig.getImagePrefix() + obj.avatar,
          likes: obj.likes,
          comments:[],
          tag: obj.tag,
          id: obj.id
        };
        this.moments.push(new_moment);
      }
      this.drawMap();
    });

    //setTimeout(this.drawMap,1000)
  }
  drawMap() {
    console.log(this.moments);
    var mkr,ptr;
    var myIcon = new BMap.Icon("assets/img/markers.png", new BMap.Size(23, 25));
    for(var i=0;i<this.moments.length;i++){
      let moment = this.moments[i];
      ptr=new BMap.Point(this.moments[i].x, this.moments[i].y);
      mkr=new BMap.Marker(ptr,{icon:myIcon});
      mkr.addEventListener('click', ()=>{
        let modal = this.modalCtrl.create(ModalMomentDetailPage, {moment:moment, accountData: this.accountData});
        modal.present();
      });
      mkr.setLabel(new BMap.Label(this.moments[i].content,{offset:new BMap.Size(20,-10)}));
      this.map.addOverlay(mkr);
      this.cd.detectChanges();
    }
  }
  ionViewWillEnter() {
    let map = this.map = new BMap.Map(this.mapElement.nativeElement, {enableMapClick: true});//创建地图实例
    map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom();//连续缩放效果，默认禁用
    let point = new BMap.Point(121.604,31.196);//坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 18);//设置中心和地图显示级别
  }
}

