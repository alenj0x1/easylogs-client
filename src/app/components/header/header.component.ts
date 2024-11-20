import { Component, OnInit } from '@angular/core';
import { BrandComponent } from '../brand/brand.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid, heroArrowRightOnRectangleSolid } from '@ng-icons/heroicons/solid';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BrandComponent, NgIconComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [provideIcons({ heroStarSolid, heroArrowRightOnRectangleSolid })],
})
export class HeaderComponent implements OnInit {
  public isAuthenticated: boolean = false;

  constructor(private token: TokenService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.token.values.accessToken !== null;
  }
}
