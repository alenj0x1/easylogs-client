import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AppInfoDto from '../interfaces/dtos/AppInfoDto';
import defaultLib from '../lib/default.lib';
import { HttpService } from './http.service';
import UserAppMeDto from '../interfaces/dtos/UserAppMeDto';
import UserAppDefaultDto from '../interfaces/dtos/UserAppDefaultDto';
import TokenAccessDto from '../interfaces/dtos/TokenAccessDto';
import LogDto from '../interfaces/dtos/LogDto';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // App controller
  private readonly appInfoSubject = new BehaviorSubject<AppInfoDto>(defaultLib.appInfo);
  public $appInfo = this.appInfoSubject.asObservable();

  // Auth controller
  private readonly tokenAccessesSubject = new BehaviorSubject<TokenAccessDto[]>([]);
  public $tokenAccesses = this.tokenAccessesSubject.asObservable();

  // User controller
  private readonly meSubject = new BehaviorSubject<UserAppMeDto>(defaultLib.userAppMe);
  public $me = this.meSubject.asObservable();

  private readonly usersSubject = new BehaviorSubject<UserAppDefaultDto[]>([]);
  public $users = this.usersSubject.asObservable();

  // Log controller
  private readonly logsSubject = new BehaviorSubject<LogDto[]>([]);
  public $logs = this.logsSubject.asObservable();

  constructor(private readonly http: HttpService) {
    if (localStorage.getItem('token')) {
      // Data setting
      this.http.appInfo.subscribe({
        next: ({ data }) => {
          if (data) this.updateAppInfo(data);
        },
      });

      this.http.userMe.subscribe({
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

  // Auth controller
  updateTokenAccesses(value: TokenAccessDto[]) {
    this.tokenAccessesSubject.next(value);
  }

  // User controller
  updateMe(value: UserAppMeDto) {
    this.meSubject.next(value);
  }

  updateUsers(value: UserAppDefaultDto[]) {
    this.usersSubject.next(value);
  }

  // Log controller
  updateLogs(value: LogDto[]) {
    this.logsSubject.next(value);
  }
}
