import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private _http: HttpClient) { }

  getBanners(): Observable<any> {
    return this._http.get(`${environment.baseApiDomain}/api/banner`);
  }

  updatePage(banner: BannerQuery): Observable<any> {
    return this._http.post(`${environment.baseApiDomain}/api/banner`, banner);
  }
}

export interface BannerQuery {
  id: number,
  bannerUrl: string,
  published: boolean
}