import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import UserAppDefaultDto from '../../../interfaces/dtos/UserAppDefaultDto';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit {
  public users: UserAppDefaultDto[] = [];

  constructor(private http: HttpService, private data: DataService) {}

  ngOnInit(): void {
    this.http.users({}).subscribe({
      next: ({ data }) => {
        if (data) this.users = data;
      },
      error: ({ error }) => {},
    });
  }
}
