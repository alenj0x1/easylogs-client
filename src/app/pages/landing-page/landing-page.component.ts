import { Component, OnInit } from '@angular/core';
import { BrandComponent } from '../../components/brand/brand.component';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent, BrandComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) this.router.navigate(['home']);
  }
}
