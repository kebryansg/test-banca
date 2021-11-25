import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private url: string = environment.ApiURL

  constructor(private http: HttpClient) {
  }

  get(api: string, params?: any): Observable<any> {
    return this.http.get(this.url + api, {params: params})
  }

  post(api: string, body: any, params?: any): Observable<any> {
    return this.http.post(this.url + api, body || {}, {params: params})
  }

  put(api: string, body: any, params?: any): Observable<any> {
    return this.http.put(this.url + api, body || {}, {params: params})
  }

  delete(api: string, body: any, params?: any): Observable<any> {
    return this.http.delete(this.url + api, {params: params})
  }
}
