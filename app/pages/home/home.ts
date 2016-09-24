import { Component } from '@angular/core';
import { NavController,ToastController} from 'ionic-angular';
import {Http} from "@angular/http";

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
	key;
	textContet;
	textItem;
  	constructor(public navCtrl: NavController,private http: Http,
  		private toastCtrl: ToastController) {

  		this.navCtrl = navCtrl;
  		this.key = "";
  		this.textContet = '';
  		this.textItem;
  	}

  	//即将载入页面时发送请求
  	//随时更新的笑话接口
  	onPageWillEnter() {

		this.http.get('http://japi.juhe.cn/joke/content/text.from?key='+
			this.key+'&page=1&pagesize=20').subscribe(data=>{

			if(data.json().error_code == 0){
				// console.log(data.json().result.data);
				this.textItem = data.json().result.data;
			}else{
				let toast = this.toastCtrl.create({
				    message: '抱歉，暂时无法获取段子!',
				    duration: 3000,
				    position: 'middle'
				  });
				toast.present();
				console.log('抱歉，请求失败');
			}

		});
	}

}
