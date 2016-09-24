import { Component } from '@angular/core';
import { NavController,ToastController} from 'ionic-angular';
import {Http} from "@angular/http";

@Component({
  templateUrl: 'build/pages/joke/joke.html'
})
export class JokePage {
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
      this.index = 0;
	}

   getDate(){
      this.http.get('http://v.juhe.cn/joke/randJoke.php?key='+
          this.key).subscribe(data=>{

          if(data.json().error_code == 0){
             this.textItem = data.json().result;
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

   //载入页面时发送请求
   //随时更新的笑话接口
   onPageDidEnter() {
      console.log(this.index);
      this.index +=1;
      if(this.index==1) {
         this.getDate();
      }
   
    }
   doRefresh(refresher) {
      //刷新数据
      this.getDate();

      setTimeout(() => {
         refresher.complete();
      }, 1000);
    }
}
