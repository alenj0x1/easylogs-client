import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.css',
})
export class BaseLayoutComponent {}
