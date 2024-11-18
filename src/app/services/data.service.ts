import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AppInfoDto from '../interfaces/dtos/AppInfoDto';
import defaultLib from '../lib/default.lib';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject = new BehaviorSubject<AppInfoDto>(defaultLib.appInfo);
  public $data = this.dataSubject.asObservable();

  constructor(private http: HttpService) {
    if (localStorage.getItem('token')) {
      // Token validation
      this.http.validateToken().subscribe();

      // Data setting
      this.http.appInfo.subscribe(({ data }) => {
        if (data) this.updateData(data);
      });
    }
  }

  updateData(value: AppInfoDto) {
    this.dataSubject.next(value);
  }
}
