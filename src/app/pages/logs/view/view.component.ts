import { Component, OnInit } from '@angular/core';
import { LOGS_ROWS_PER_PAGE, PERMISSIONS } from '../../../lib/consts.lib';
import { checkGuid, isNullOrWhiteSpace, userPerms } from '../../../lib/checker.lib';
import UserAppMeDto from '../../../interfaces/dtos/UserAppMeDto';
import defaultLib from '../../../lib/default.lib';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import LogDto from '../../../interfaces/dtos/LogDto';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import moment from 'moment';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { heroArchiveBoxSolid } from '@ng-icons/heroicons/solid';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    NgIconComponent,
    PaginatorModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    CommonModule,
    CalendarModule,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
  providers: [provideIcons({ heroArchiveBoxSolid })],
})
export class ViewComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    logId: new FormControl<string | null>(null),
    trace: new FormControl<string | null>(null),
    type: new FormControl<string | null>(null),
    startDate: new FormControl<string | null>(null),
    endDate: new FormControl<string | null>(null),
  });
  public appInfo = defaultLib.appInfo;
  public me: UserAppMeDto = defaultLib.userAppMe;
  public logs: LogDto[] = [];
  public rowsPerPage: number = LOGS_ROWS_PER_PAGE;
  public logsCount: number = 0;
  public libs = {
    PERMISSIONS,
    userPerms,
  };

  constructor(
    private readonly http: HttpService,
    private readonly data: DataService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.http.userMe.subscribe(({ data }) => {
      if (data === null) return;
      this.me = data;
    });

    this.data.$appInfo.subscribe((data) => {
      if (data === null) return;
      this.appInfo = data;
    });
  }

  parseCreatedAt(date: string) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }

  parseLogType(id: number) {
    return this.appInfo.logTypes.find((lgt) => lgt.logTypeId == id);
  }

  onLogDelete(id: string) {
    const option = confirm(`Está seguro de eliminar el registro ${id}`);
    if (!option) return;

    this.http.logDelete(id).subscribe({
      next: ({ data, message }) => {
        if (data === null) return;

        this.messageService.add({
          severity: 'success',
          detail: message,
          life: 1000,
        });

        const tkaIndex = this.logs.findIndex((log) => log.logId == id);
        if (tkaIndex === null) return;

        this.logs.splice(tkaIndex, 1);
        this.data.updateLogs(this.logs);

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

  onLogSearch() {
    const { logId, trace, type, startDate, endDate } = this.form.value;

    if (!isNullOrWhiteSpace(logId) && !checkGuid(logId)) {
      return this.messageService.add({
        severity: 'error',
        detail: 'La identificación no es un valor valido. Debe ser de tipo UUID',
        life: 1000,
      });
    }

    this.http
      .logGetByFilter({
        logId: logId != null && logId !== '' ? logId : null,
        trace: trace ?? null,
        type: type?.logTypeId ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        limit: this.rowsPerPage,
      })
      .subscribe({
        next: ({ data, count }) => {
          if (data === null) return;

          this.logs = data;
          this.logsCount = count;
        },
        error: ({ error }) => {
          this.logs = [];

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

  onPageChange(data: PaginatorState) {
    const { logId, trace, startDate, type, endDate } = this.form.value;

    this.http
      .logGetByFilter({
        logId: logId ?? null,
        trace: trace ?? null,
        type: type?.logTypeId ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        limit: data.rows,
        offset: data.first,
      })
      .subscribe({
        next: ({ data, count }) => {
          if (data === null) return;

          this.logs = data;
          this.logsCount = count;
        },
        error: ({ error }) => {
          this.logs = [];

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
