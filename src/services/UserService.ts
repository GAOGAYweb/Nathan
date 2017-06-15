/**
 * Created by Administrator on 2017/6/2.
 */
import { Injectable }    from '@angular/core';
import { RequestOptions,Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {AppConfig} from "../app/app.config";
@Injectable()
export class UserService {

  server: string;
  accountData: string;
  user:string;
  constructor(private http: Http) {
    this.server = AppConfig.getServerUrl() + '/user';
  }
  getSessionAccountData() {
    return this.accountData;
  }
  getSessionUserInformation() {
    return this.user;
  }
  login(account,password) {
    if (account && password) {
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      let options = new RequestOptions({
        headers: headers
      });
      let body= "method=login&account="+account+"&password="+password;
      return new Promise((resolve, reject) => {
        this.http.post(this.server, body, options )
          .map(res => res.json())
          .subscribe(data => {
            this.accountData = data["data"];
            this.getUserInformation(JSON.parse(this.accountData).id);
            resolve(data)
            }, err => reject(err)
          )
      })
    }
    else {
      return new Promise((resolve, reject) => {
        let data = {status: "400"};
          resolve(data)
      });
    }
  }

  register(account,password,name) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body= "method=register&account="+account+"&password="+password+"&name="+name;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => reject(err))
    })
  }

  getUserInformation(id) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body= "method=info&id=" + id;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => {
          this.user = data["data"];
          resolve(data)
        }, err => reject(err))
    })
  }

  changeInformation(inforMap, id) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let paras = [];
    for(let key in inforMap) {
      let para = key + "=" + inforMap[key];
      paras.push(para);
    }

    let body = "method=update&id=" + id +"&" + paras.join("&");
    console.log(body);
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })
  }

  getFriendList(id) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body= "method=friendList&id=" + id;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    });
  }

  getGroup(id) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body= "method=friendGroup&id=" + id;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    });
  }

}
