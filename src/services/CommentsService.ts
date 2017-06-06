/**
 * Created by Administrator on 2017/6/6.
 */
import { Injectable }    from '@angular/core';
import {AppConfig} from "../app/app.config";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Http, RequestOptions, Headers} from "@angular/http";
@Injectable()
export class CommentsService {
  server: string;
  constructor(private http: Http) {
    this.server = AppConfig.getServerUrl() + '/comments';
  }
  getComments(momentId) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = "method=query&id=" + momentId;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    });
  }

  addComment(id, userId, content) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = "method=add&id=" + id + "&userid=" + userId + "&content=" + content;
    return new Promise((resolve, reject) => {
      this.http.post(this.server, body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    });
  }
}
