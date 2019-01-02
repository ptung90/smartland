import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private _http: HttpClient) { }

  getPages(): Observable<any> {
    return this._http.get(`${environment.baseApiDomain}/api/Page`);
    // return this._http.get(`http://smartland.ddns.net:8899/api/Page`);
  }

  updatePage(page: PageQuery): Observable<any> {
    return this._http.post(`${environment.baseApiDomain}/api/Page`, page);
  }
}

export interface PageQuery {
  id: number,
  title: string,
  type: string,
  published: boolean,
  parentPageId: number
}
