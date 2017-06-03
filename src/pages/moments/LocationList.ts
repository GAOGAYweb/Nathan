/**
 * Created by Administrator on 2017/6/3.
 */
import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
declare var BMap;
@Component({
  selector: 'page-friends-list',
  templateUrl: 'LocationList.html'
})
export class LocationList {
  streetNames: any[];
  selectedPoint:any;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    var gc = new BMap.Geocoder();
    this.streetNames = [];
    let that = this;
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{enableHighAccuracy:true});

    function onSuccess(position) {

      // 百度地图API功能
      //GPS坐标
      var xx = position.coords.longitude;
      var yy = position.coords.latitude;
      var gpsPoint = new BMap.Point(xx,yy);
      gc.getLocation(gpsPoint, rs=>{
        var addComp = rs.addressComponents;
        that.streetNames.push({
            streetName: addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber,
            streetPoint: gpsPoint
          });
      });
    }
    function onError(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
      switch(error.code)
      {
        case 1:
          alert('您拒绝了使用位置共享服务，请手动输入您的就餐地址。!');
          break;
        default :
          alert('获取位置失败，请手动输入您的就餐地址。!');
          break;
      }
    }
  }
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
  confirmLocationList() {
    this.viewCtrl.dismiss(this.selectedPoint);
  }
}

