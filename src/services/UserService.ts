/**
 * Created by Administrator on 2017/6/2.
 */
import { Injectable }    from '@angular/core';
import { RequestOptions,Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Injectable()
export class UserService {

  server: string;
  constructor(private http: Http) {
    this.server = ""
  }
  changeInformation(inforMap) {
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

    let body = paras.join("&");
    console.log(body);
    return new Promise((resolve, reject) => {
      this.http.post(this.server + '/user', body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })
  }

}
