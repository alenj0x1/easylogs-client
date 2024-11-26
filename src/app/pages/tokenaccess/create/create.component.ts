import { Component, OnInit } from '@angular/core';
import TokenAccessDto from '../../../interfaces/dtos/TokenAccessDto';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import UserAppDefaultDto from '../../../interfaces/dtos/UserAppDefaultDto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import defaultLib from '../../../lib/default.lib';
import { MessageService } from 'primeng/api';
import dayjs from 'dayjs';
import { PERMISSIONS, TOKENACCESSES_ROWS_PER_PAGE } from '../../../lib/consts.lib';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArchiveBoxXMarkSolid, heroClipboardSolid } from '@ng-icons/heroicons/solid';
import UserAppMeDto from '../../../interfaces/dtos/UserAppMeDto';
import { userPerms } from '../../../lib/checker.lib';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    PaginatorModule,
    TableModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CommonModule,
    CalendarModule,
    NgIconComponent,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [provideIcons({ heroArchiveBoxXMarkSolid, heroClipboardSolid })],
})
export class CreateComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    expiration: new FormControl(''),
  });
  public me: UserAppMeDto = defaultLib.userAppMe;
  public rowsPerPage: number = TOKENACCESSES_ROWS_PER_PAGE;
  public tokenAccessesCount: number = 0;
  public tokenAccesses: TokenAccessDto[] = [];
  public users: UserAppDefaultDto[] = [];
  public selectedUser: UserAppDefaultDto = defaultLib.userAppDefault;
  public selectedExpiration: string = '';
  public tokenAccess: string = '';
  public libs = {
    PERMISSIONS,
    userPerms,
  };

  constructor(
    private readonly data: DataService,
    private readonly http: HttpService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.http.authTokenAccesses({ limit: TOKENACCESSES_ROWS_PER_PAGE }).subscribe(({ data, count }) => {
      if (data === null) return;

      this.tokenAccesses = data;
      this.tokenAccessesCount = count;
    });

    this.http.userMe.subscribe(({ data }) => {
      if (data === null) return;

      this.me = data;
    });
  }

  parseCreatedAt(date: string) {
    return dayjs(date).format('MMMM Do YYYY, h:mm:ss a');
  }

  onPageChange(data: PaginatorState) {
    this.http.authTokenAccesses({ limit: data.rows, offset: data.first }).subscribe(({ data, count }) => {
      if (data === null) return;

      this.tokenAccesses = data;
      this.tokenAccessesCount = count;
    });
  }

  onTokenAccessDelete(id: number) {
    const option = confirm(`Está seguro de eliminar el token de acceso ${id}`);
    if (!option) return;

    this.http.authRemoveAccessToken(id).subscribe({
      next: ({ data, message }) => {
        if (data === null) return;

        this.messageService.add({
          severity: 'success',
          detail: message,
          life: 1000,
        });

        const tkaIndex = this.tokenAccesses.findIndex((tka) => tka.tokenAccessId == id);
        if (tkaIndex === null) return;

        this.tokenAccesses.splice(tkaIndex, 1);
        this.data.updateTokenAccesses(this.tokenAccesses);

        window.location.reload();
      },
      error: ({ error }) => {
        if (error.errors) {
          let errors = Object.keys(error.errors);

          this.messageService.add({
            severity: 'error',
            detail: error.errors[errors[0]],
            life: 1000,
          });
          return;
        }

        this.messageService.add({
          severity: 'error',
          detail: error.message,
          life: 1000,
        });
      },
    });
  }

  copyToken() {
    navigator.clipboard.writeText(this.tokenAccess);
    this.tokenAccess = '';

    window.location.reload();
  }

  onTokenAccessCreate() {
    if (this.selectedUser.userAppId == '') {
      this.messageService.add({
        severity: 'error',
        detail: 'Debe seleccionar un usuario',
        life: 1000,
      });
    }

    this.http
      .authCreateAccessToken({ expiration: this.selectedExpiration, userAppId: this.selectedUser.userAppId })
      .subscribe({
        next: ({ data, message }) => {
          if (data === null) return;

          this.messageService.add({
            severity: 'success',
            detail: message,
            life: 1000,
          });

          this.tokenAccess = data.accessToken;
        },
        error: ({ error }) => {
          if (error.errors) {
            let errors = Object.keys(error.errors);

            this.messageService.add({
              severity: 'error',
              detail: error.errors[errors[0]],
              life: 1000,
            });
            return;
          }

          this.messageService.add({
            severity: 'error',
            detail: error.message,
            life: 1000,
          });
        },
      });
  }

  onSearchUsers(data: AutoCompleteCompleteEvent) {
    this.http.userGetByFilter({ username: data.query }).subscribe({
      next: ({ data }) => {
        if (data === null) return;
        this.users = data;
      },
    });
  }
}
