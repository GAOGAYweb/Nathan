/**
 * Created by Administrator on 2017/6/2.
 */
import { Injectable }    from '@angular/core';
import { RequestOptions,Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {AppConfig} from "../app/app.config";
@Injectable()
export class MomentsService {

  server: string;
  constructor(private http: Http) {
    this.server = AppConfig.getServerUrl() + '/moments';
  }
  getMyMoments(id) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = "method=listOwner&id=" + id;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    });
  }
  getMoments(count) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = "method=listNew&count=" + count;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    });
  }
  getFriendsCycle(id, count) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = "method=listFriends&userid="+ id + "&count=" + count;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    });
  }
  sendMoments(data) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let keyValue = [];
    for(let key in data) {
      keyValue.push(key + "=" + data[key]);
    }
    let paras = keyValue.join("&");
    let body = "method=add&"+ paras;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })
  }

  addLike(accountId, momentId) {

    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });

    let body = "method=like&userid=" + accountId + "&momentid=" + momentId;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })
  }

}
