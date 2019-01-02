import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner/banner.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  slides = [];
  constructor(private _bannerService: BannerService) {
  	this._loadBannerSlider();
  }

  ngOnInit() {
  }

  _loadBannerSlider() {
    // this._bannerService.getBanners().subscribe(x => {
    //   this.slides = x.filter(y => y.published == true);
    //   console.log(x, this.slides);
    // });
    this.slides = [
  		{bannerUrl: 'assets/images/banner-1.jpg'},
  		{bannerUrl: 'assets/images/banner-2.jpg'},
  		{bannerUrl: 'assets/images/banner-3.jpg'},
  		{bannerUrl: 'assets/images/banner-4.jpg'},
  		{bannerUrl: 'assets/images/banner-5.jpg'},
  		{bannerUrl: 'assets/images/banner-6.jpg'}
  	]
  }

}
