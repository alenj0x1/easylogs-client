import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { PERMISSIONS } from '../../../lib/consts.lib';
import { userPerms } from '../../../lib/checker.lib';
import UserAppMeDto from '../../../interfaces/dtos/UserAppMeDto';
import defaultLib from '../../../lib/default.lib';
import { ActivatedRoute, Router } from '@angular/router';
import UserAppDefaultDto from '../../../interfaces/dtos/UserAppDefaultDto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import PermissionDto from '../../../interfaces/dtos/PermissionDto';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';
import AppInfoDto from '../../../interfaces/dtos/AppInfoDto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [MultiSelectModule, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    passwordNew: new FormControl(''),
    passwordCurrent: new FormControl(''),
    permissions: new FormControl<PermissionDto[]>([], [Validators.required]),
  });
  public userAppId: string | null = null;
  public user: UserAppDefaultDto | UserAppMeDto = defaultLib.userAppDefault;
  public me: UserAppMeDto = defaultLib.userAppMe;
  public appInfo: AppInfoDto = defaultLib.appInfo;
  public userUpdated: boolean = false;
  public passwordNewActive: boolean = false;
  public readonly libs = {
    PERMISSIONS,
    userPerms,
  };

  constructor(
    private readonly data: DataService,
    private readonly http: HttpService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.data.$me.subscribe((data) => {
      if (data === null) return;
      this.me = data;
    });

    this.userAppId = this.route.snapshot.paramMap.get('id');
    this.loadUser();

    if (this.me.userAppId !== this.user.userAppId && !userPerms(this.me, PERMISSIONS.UPDATE_USERS)) {
      this.router.navigate(['/']);
    }

    this.data.$appInfo.subscribe((data) => {
      if (data === null) return;
      this.appInfo = data;
    });
  }

  private loadUser() {
    if (this.userAppId == null) return;

    this.http.userGetById(this.userAppId).subscribe({
      next: ({ data }) => {
        if (data === null) {
          this.router.navigate(['/']);
          return;
        }

        if (data.userAppId == this.me.userAppId) {
          this.user = this.me;
          this.setForm();

          return;
        }

        this.user = data;

        this.setForm();
      },
      error: () => {
        this.router.navigate(['/']);
      },
    });
  }

  private setForm() {
    this.form = new FormGroup({
      username: new FormControl(this.user.username),
      email: new FormControl(this.user.email, [Validators.email]),
      passwordNew: new FormControl(''),
      passwordCurrent: new FormControl(''),
      permissions: new FormControl<PermissionDto[]>(this.user.permissions),
    });
  }

  updateUser() {
    this.http
      .userUpdate(
        {
          username: this.form.value.username ?? '',
          email: this.form.value.email ?? '',
          passwordNew: this.form.value.passwordNew ?? '',
          passwordConfirm: this.form.value.passwordConfirm ?? '',
          permissions: this.form.value.permissions
            ? this.form.value.permissions.map((data: PermissionDto) => data.permissionId)
            : [],
        },
        this.user.userAppId
      )
      .subscribe({
        next: ({ data, message }) => {
          if (data === null) return;

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

  formChangeSelect(event: MultiSelectChangeEvent) {
    this.userUpdated = event.value.length > 0;
  }

  formChange(event: Event) {
    let target = event.target as HTMLInputElement;

    if (target.name === 'username' && this.user.username !== target.value) {
      this.userUpdated = true;
      return;
    }

    if (target.name === 'email' && this.user.email !== target.value) {
      this.userUpdated = true;
      return;
    }

    if (target.name === 'passwordCurrent' && target.value.length > 0) {
      this.userUpdated = true;
      return;
    }

    if (target.name === 'passwordNew' && target.value.length > 0) {
      this.userUpdated = true;
      return;
    }

    this.userUpdated = false;
  }

  passwordCurrentChange(event: Event) {
    let target = event.target as HTMLInputElement;
    this.passwordNewActive = target.value.length > 0;
  }
}
