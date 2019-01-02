import { Component, OnInit } from '@angular/core';
import { BannerService, BannerQuery } from 'src/app/services/banner/banner.service';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bannerman',
  templateUrl: './bannerman.component.html',
  styleUrls: ['./bannerman.component.css']
})
export class BannermanComponent implements OnInit {
  public progress: number;
  public message: string;
  banners: any[] = [];
  constructor(private _bannerService: BannerService,
              private http: HttpClient) { }

  ngOnInit() {
    this._bannerService.getBanners().subscribe(x => this.banners = x);
  }

  toggleBannerStatus(banner: any, e: any){
    
    banner.published = !banner.published;
    this._bannerService.updatePage(banner).subscribe(x => console.log(x));
  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', `${environment.baseApiDomain}/api/upload`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        let bannerUrl = event.body.toString();
        let newBanner: BannerQuery = {
          id: 0,
          bannerUrl: bannerUrl,
          published: true
        };
        this._bannerService.updatePage(newBanner).subscribe(x => this.banners.push(x));
      }
        
    });
  }
  
}
