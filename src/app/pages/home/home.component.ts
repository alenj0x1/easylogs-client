import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import AppInfoDto from '../../interfaces/dtos/AppInfoDto';
import defaultLib from '../../lib/default.lib';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public appInfo: AppInfoDto = defaultLib.appInfo;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.$data.subscribe((data) => (this.appInfo = data));
  }
}
