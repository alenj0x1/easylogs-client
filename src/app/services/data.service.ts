import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AppInfoDto from '../interfaces/dtos/AppInfoDto';
import defaultLib from '../lib/default.lib';
import { HttpService } from './http.service';
import UserAppMeDto from '../interfaces/dtos/UserAppMeDto';
import UserAppDefaultDto from '../interfaces/dtos/UserAppDefaultDto';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // App controller
  private appInfoSubject = new BehaviorSubject<AppInfoDto>(defaultLib.appInfo);
  public $appInfo = this.appInfoSubject.asObservable();

  // Users controller
  private meSubject = new BehaviorSubject<UserAppMeDto>(defaultLib.userAppMe);
  public $me = this.meSubject.asObservable();

  private usersSubject = new BehaviorSubject<UserAppDefaultDto[]>([]);
  public $users = this.usersSubject.asObservable();

  constructor(private http: HttpService) {
    if (localStorage.getItem('token')) {
      // Data setting
      this.http.appInfo.subscribe(({ data }) => {
        if (data) this.updateAppInfo(data);
      });

      this.http.me.subscribe({
        next: ({ data }) => {
          if (data) this.updateMe(data);
        },
      });
    }
  }

  // App controller
  updateAppInfo(value: AppInfoDto) {
    this.appInfoSubject.next(value);
  }

  // Users controller
  updateMe(value: UserAppMeDto) {
    this.meSubject.next(value);
  }

  updateUsers(value: UserAppDefaultDto[]) {
    this.usersSubject.next(value);
  }
}
