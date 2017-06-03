import { Component, ViewChild, ElementRef } from '@angular/core';
import {ModalController, NavController, Platform} from 'ionic-angular';
import { MOMENTS} from './mock.moments';
import {Moment} from './moment';
import {ModalMomentDetailPage} from "../moments/momentDetail";
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
  moments:Moment[]=MOMENTS;
  @ViewChild('map') mapElement: ElementRef;
  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    public modalCtrl: ModalController
  ){}
  ionViewWillEnter() {
    let map = this.map = new BMap.Map(this.mapElement.nativeElement, {enableMapClick: true});//创建地图实例
    map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom();//连续缩放效果，默认禁用
    let point = new BMap.Point(121.604,31.196);//坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 18);//设置中心和地图显示级别

    var mkr,ptr;
    var myIcon = new BMap.Icon("assets/img/markers.png", new BMap.Size(23, 25));
    for(let i = 0;i < this.moments.length; i++){
      let moment = this.moments[i];
      ptr = new BMap.Point(moment.x, moment.y);
      mkr = new BMap.Marker(ptr,{icon:myIcon});
      mkr.addEventListener('click', ()=>{
        console.log(moment);
        let modal = this.modalCtrl.create(ModalMomentDetailPage, {moment:moment});
        modal.present();
        // mkr.openInfoWindow(new BMap.InfoWindow(moment.content, {
        //   width : 250,
        //   height: 100,
        //   title : moment.author
        // }    ));
      });
      mkr.setLabel(new BMap.Label(this.moments[i].content,{offset:new BMap.Size(20,-10)}));
      map.addOverlay(mkr);

    }
  }
}

