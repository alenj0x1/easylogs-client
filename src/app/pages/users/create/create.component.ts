import { Component, OnInit } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import defaultLib from '../../../lib/default.lib';
import { DataService } from '../../../services/data.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import PermissionDto from '../../../interfaces/dtos/PermissionDto';
import { HttpService } from '../../../services/http.service';
import { MessageService } from 'primeng/api';
import UserAppDefaultDto from '../../../interfaces/dtos/UserAppDefaultDto';
import { Router } from '@angular/router';
import { PERMISSIONS } from '../../../lib/consts.lib';
import { userPerms } from '../../../lib/checker.lib';
import UserAppMeDto from '../../../interfaces/dtos/UserAppMeDto';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MultiSelectModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  public form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    permissions: new FormControl<PermissionDto[]>([], [Validators.required]),
  });
  public me: UserAppMeDto = defaultLib.userAppMe;
  public selectedPermissions: string[] = [];
  public users: UserAppDefaultDto[] = [];
  public appInfo = defaultLib.appInfo;
  public libs = {
    PERMISSIONS,
    userPerms,
  };

  constructor(
    private readonly data: DataService,
    private readonly http: HttpService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.data.$appInfo.subscribe((data) => {
      if (data === null) return;
      this.appInfo = data;
    });

    this.data.$users.subscribe((data) => {
      if (data === null) return;
      this.users = data;
    });

    this.data.$me.subscribe((data) => {
      if (data === null) return;
      this.me = data;
    });
  }

  parsePermissions() {
    const findIndex = this.appInfo.permissions.findIndex((perm) => perm.permissionId == PERMISSIONS.ADMINISTRATOR);

    console.log(userPerms(this.me, PERMISSIONS.ADMINISTRATOR), findIndex);

    return userPerms(this.me, PERMISSIONS.ADMINISTRATOR)
      ? this.appInfo.permissions
      : this.appInfo.permissions.splice(findIndex, 1);
  }

  onUserCreate() {
    this.http
      .userCreate({
        username: this.form.value.username ?? '',
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
        permissions: this.form.value.permissions
          ? this.form.value.permissions.map((data: PermissionDto) => data.permissionId)
          : [],
      })
      .subscribe({
        next: ({ data, message }) => {
          if (data === null) return;

          this.users.push(data);
          this.data.updateUsers(this.users);

          this.router.navigate(['/users/view']);

          this.messageService.add({
            severity: 'success',
            detail: message,
            life: 1000,
          });
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
}
