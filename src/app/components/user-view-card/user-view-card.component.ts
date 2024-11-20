import { Component, Input, OnInit } from '@angular/core';
import UserAppDefaultDto from '../../interfaces/dtos/UserAppDefaultDto';
import defaultLib from '../../lib/default.lib';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArchiveBoxXMarkSolid, heroPencilSolid } from '@ng-icons/heroicons/solid';
import { heroClock } from '@ng-icons/heroicons/outline';
import moment from 'moment';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DataService } from '../../services/data.service';
import UserAppMeDto from '../../interfaces/dtos/UserAppMeDto';
import { MessageService } from 'primeng/api';
import { mePerms } from '../../lib/checker.lib';
import { PERMISSIONS } from '../../lib/consts.lib';

@Component({
  selector: 'app-user-view-card',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  templateUrl: './user-view-card.component.html',
  styleUrl: './user-view-card.component.css',
  providers: [provideIcons({ heroPencilSolid, heroArchiveBoxXMarkSolid, heroClock })],
})
export class UserViewCardComponent implements OnInit {
  @Input()
  public user: UserAppDefaultDto = defaultLib.userAppDefault;
  public users: UserAppDefaultDto[] = [];
  public me: UserAppMeDto = defaultLib.userAppMe;
  public libs = {
    PERMISSIONS,
    mePerms,
  };

  constructor(
    private readonly http: HttpService,
    private readonly data: DataService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.data.$me.subscribe((data) => {
      if (data === null) return;
      this.me = data;
    });

    this.data.$users.subscribe((data) => {
      if (data === null) return;
      this.users = data;
    });
  }

  parseCreatedAt() {
    return moment(this.user.createdAt).format('MMMM Do YYYY, h:mm:ss a');
  }

  onUserDelete() {
    this.http.userDelete(this.user.userAppId).subscribe({
      next: ({ data, message }) => {
        if (data === null) return;

        this.messageService.add({
          severity: 'success',
          detail: message,
          life: 1000,
        });

        const usrIndex = this.users.findIndex((usr) => usr.userAppId == this.user.userAppId);
        if (usrIndex === null) return;

        this.users.splice(usrIndex, 1);
        this.data.updateUsers(this.users);
      },
      error: ({ error, message }) => {
        this.messageService.add({
          severity: 'error',
          detail: error.message,
          life: 1000,
        });
      },
    });
  }
}
