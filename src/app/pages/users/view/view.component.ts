import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import UserAppDefaultDto from '../../../interfaces/dtos/UserAppDefaultDto';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { UserViewCardComponent } from '../../../components/user-view-card/user-view-card.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBeakerSolid } from '@ng-icons/heroicons/solid';
import { RouterLink } from '@angular/router';
import { PERMISSIONS, USERS_ROWS_PER_PAGE } from '../../../lib/consts.lib';
import { userPerms } from '../../../lib/checker.lib';
import UserAppMeDto from '../../../interfaces/dtos/UserAppMeDto';
import defaultLib from '../../../lib/default.lib';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [PaginatorModule, UserViewCardComponent, NgIconComponent, RouterLink],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
  providers: [provideIcons({ heroBeakerSolid })],
})
export class ViewComponent implements OnInit {
  public users: UserAppDefaultDto[] = [];
  public me: UserAppMeDto = defaultLib.userAppMe;
  public usersCount: number = 0;
  public rowsPerPage: number = USERS_ROWS_PER_PAGE;
  public libs = {
    PERMISSIONS,
    userPerms,
  };

  constructor(private readonly http: HttpService, private readonly data: DataService) {}

  ngOnInit(): void {
    let initial = this.http
      .userGetByFilter({
        limit: this.rowsPerPage,
      })
      .subscribe({
        next: ({ data, count }) => {
          if (!data) return;

          this.users = data;
          this.usersCount = count;

          this.data.updateUsers(data);

          initial.unsubscribe();
        },
        error: ({ error }) => {},
      });

    this.data.$me.subscribe((data) => {
      if (data === null) return;
      this.me = data;
    });
  }

  onPageChange(data: PaginatorState) {
    let post = this.http
      .userGetByFilter({
        offset: data.first,
        limit: data.rows,
      })
      .subscribe({
        next: ({ data }) => {
          if (!data) return;

          this.users = data;

          this.data.updateUsers(data);

          post.unsubscribe();
        },
        error: ({ error }) => {},
      });
  }
}
