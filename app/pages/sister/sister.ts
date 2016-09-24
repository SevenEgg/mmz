import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'build/pages/sister/sister.html'
})
export class sisterPage {
  ts;
	tt;
  index;
  constructor(public navCtrl: NavController,private http: Http) {
  	this.ts = [];
  	this.tt = {};
    this.index = 0;
  }

  getDate(){
    this.http.get('http://gank.io/api/random/data/%E7%A6%8F%E5%88%A9/25')
    .subscribe(data =>{
      //判断返回值
      if(data.json().error == false){
        this.ts = data.json().results;
      }else{
        console.log('请求失败'+data.json().error);
      }

    },erro=>{
      console.log('请求失败');
    });
  }

  //载入完页面时触发请求
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
