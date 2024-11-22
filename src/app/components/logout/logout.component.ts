import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import defaultLib from '../../lib/default.lib';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  constructor(private readonly router: Router, private readonly data: DataService) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');

    // Reset data
    this.data.updateMe(defaultLib.userAppMe);
    this.data.updateUsers([]);

    this.router.navigate(['/']);
  }
}
