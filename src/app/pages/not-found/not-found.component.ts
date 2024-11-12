import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BrandComponent } from '../../components/brand/brand.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [BrandComponent, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent implements OnInit {
  public token: string | null = null;

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }
}
