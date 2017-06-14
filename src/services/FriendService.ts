/**
 * Created by Administrator on 2017/6/6.
 */
import { Injectable }    from '@angular/core';
import {AppConfig} from "../app/app.config";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Http, RequestOptions, Headers} from "@angular/http";
@Injectable()
export class FriendService {
  server: string;
  constructor(private http: Http) {
    this.server = AppConfig.getServerUrl() + '/friends';
  }
  addGroup(id,groupName) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = "method=addGroup&id=" + id+"&groupName="+groupName;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    });
  }

  deleteGroup(id,groupName) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = "method=deleteGroup&id=" + id+"&groupName="+groupName;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    });
  }

  move(id,friend,groupName) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = "method=move&id=" + id+"&groupName="+groupName+"&friend="+friend;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    });
  }

}
