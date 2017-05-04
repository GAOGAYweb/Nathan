import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
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
  @ViewChild('map') mapElement: ElementRef;
  constructor(
    private navCtrl: NavController,
    private platform: Platform,
  ){}
  ionViewWillEnter() {
    let map = this.map = new BMap.Map(this.mapElement.nativeElement, {enableMapClick: true});//创建地图实例
    map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom();//连续缩放效果，默认禁用
    let point = new BMap.Point(121.604,31.196);//坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 18);//设置中心和地图显示级别
   
    let icon = new BMap.Icon('http://pic002.cnblogs.com/images/2011/308287/2011091516161618.png', new BMap.Size(20, 32), {
      anchor: new BMap.Size(10, 30),
    })//设置标注图片和位置
    var mkr1 = new BMap.Marker(new BMap.Point(121.604, 31.196), {
      icon: icon,
      enableDragging: false,
      raiseOnDrag: false
    });//设置起始坐标点
    map.addOverlay(mkr1);//添加标注在地图中并实现拖拽
    var mkr2 = new BMap.Marker(new BMap.Point(121.603, 31.197), {
      icon: icon,
      enableDragging: false,
      raiseOnDrag: false
    });//设置起始坐标点
    map.addOverlay(mkr2);//添加标注在地图中并实现拖拽
    var mkr3 = new BMap.Marker(new BMap.Point(121.600, 31.196), {
      icon: icon,
      enableDragging: false,
      raiseOnDrag: false
    });//设置起始坐标点
    map.addOverlay(mkr3);//添加标注在地图中并实现拖拽
    var mkr4 = new BMap.Marker(new BMap.Point(121.605, 31.195), {
      icon: icon,
      enableDragging: false,
    });//设置起始坐标点
    map.addOverlay(mkr4);//添加标注在地图中并实现拖拽
  }
}
