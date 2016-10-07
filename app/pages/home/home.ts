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
	index;
  	constructor(public navCtrl: NavController,private http: Http,
  		private toastCtrl: ToastController) {

  		this.navCtrl = navCtrl;
  		this.key = "df9dd54f46be6ad558f4bba85879df46";
  		this.textContet = '';
  		this.textItem;
  		this.index = true;
  	}

  	// 请求
  	getData(){
  		this.http.get('http://japi.juhe.cn/joke/content/text.from?key='+
  			this.key+'&page=1&pagesize=20').subscribe(data=>{

  			if(data.json().error_code == 0){
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

  	//即将载入页面时发送请求
  	//随时更新的笑话接口
  	onPageWillEnter() {
  		if(this.index == true){
  			this.getData();
  			this.index = false;
  		}
		
	}

	 //  刷新
	 doRefresh(refresher) {
	   //刷新数据
	   this.getData();
	   setTimeout(() => {
	     refresher.complete();
	   }, 2000);
	 }



}
