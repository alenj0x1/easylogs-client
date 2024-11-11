import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-without-authenticate-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './without-authenticate-layout.component.html',
  styleUrl: './without-authenticate-layout.component.css',
})
export class WithoutAuthenticateLayoutComponent {}
