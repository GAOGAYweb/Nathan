import { Component } from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";
import {BrowserPopoverPage} from "./browser-popover";
import {MapPage} from "../pages/map/map";
@Component({
  selector: 'minecraft-page',
  templateUrl: `minecraft.html`,
})
export class MinecraftPage{
  browser: any = {
    isLoaded: false, // 网页是否被加载
    proObj: null, // 进度条对象
    progress: 0, // 网页访问的进度条
    secUrl: '', // 安全链接

    title: '加载中',
    url: '',
    share: null // 是否具有分享功能（传递一个分享对象ShareModel过来）
  };
  shareConfig: any = {
    isShow: false
  };
  constructor(public navCtrl: NavController,
              private params: NavParams,
              private sanitizer: DomSanitizer,
              private popoverCtrl: PopoverController) {

    let browser = {
      isLoaded: false, // 网页是否被加载
      proObj: null, // 进度条对象
      progress: 0, // 网页访问的进度条
      secUrl: 'http://10.131.251.231:9966', // 安全链接

      title: '加载中',
      url: 'http://10.131.251.231:9966',
      //url: 'http://www.baidu.com',
      share: null // 是否具有分享功能（传递一个分享对象ShareModel过来）
    };
    if(browser) {
      this.browser.title = browser.title;
      this.browser.url = browser.url;
      this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(browser.url);

      if(browser.share) {
        this.browser.share = browser.share;
      }

    } else {
      this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.browser.url);
    }
    console.log(this.browser);
    this.reload();
  }

  ionViewDidLoad() {
    if(!this.browser.proObj) {
      this.browser.proObj = document.getElementById('progress');
    }
    this.onprogress();
  }

  // 生成随机数
  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // 网页访问进度
  private onprogress() {
    // 随机时间
    let timeout = this.random(10, 30);

    let timer = setTimeout(() => {
      if(this.browser.isLoaded) {
        this.browser.proObj.style.width = '100%';
        clearTimeout(timer);
        return;
      }

      // 随机进度
      this.browser.progress += this.random(1, 5);

      // 随机进度不能超过 90%，以免页面还没加载完毕，进度已经 100% 了
      if(this.browser.progress > 90){
        this.browser.progress = 90;
      }

      this.browser.proObj.style.width = this.browser.progress + '%';
      this.onprogress();
    }, timeout);
  }

  // 如果iframe页面加载成功后
  loaded() {
    this.browser.isLoaded = true;
  }

  // 显示Popver选项
  presentPopover(myEvent) {
    let cb = {
      refresh: () => {
        this.reload();
      },
      close: () => {
        this.navCtrl.setRoot(MapPage);
      },
      share: null
    };

    if(this.browser.share) {
      cb.share = () => {
        this.share();
      }
    }

    let popover = this.popoverCtrl.create(BrowserPopoverPage, {
      callback: cb
    });
    popover.present({
      ev: myEvent
    });
  }

  // 重新加载页面
  reload() {
    let title = this.browser.title;
    let url = this.browser.secUrl;
    this.browser.title = 'loading';
    this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

    setTimeout(() => {
      this.browser.isLoaded = false;
      this.browser.progress = 0;
      if(!this.browser.proObj) {
        this.browser.proObj = document.getElementById('progress');
      }
      this.onprogress();
      this.browser.title = title;
      this.browser.secUrl = url;
    }, 10);
  }

  // 分享页面（作为popover的回调）
  share() {
    this.shareConfig.isShow = true;

  }
}

