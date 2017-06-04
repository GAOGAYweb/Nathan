/**
 * Created by Administrator on 2017/6/3.
 */
import { Injectable }    from '@angular/core';
import { RequestOptions,Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Injectable()
export class ChatService {
    url='http://120.76.144.133:9080/adweb/chat';
    constructor(private http: Http) {

    }
    init() {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let body="";
        return new Promise((resolve, reject) => {
        this.http.post(this.url, body, options )
            .map(res => res.json())
            .subscribe(data => resolve(data), err => reject(err))
        })
    }


}
