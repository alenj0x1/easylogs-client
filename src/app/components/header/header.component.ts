import { Component, Input } from '@angular/core';
import { BrandComponent } from '../brand/brand.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BrandComponent, NgIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [provideIcons({ heroStarSolid })],
})
export class HeaderComponent {
  @Input()
  public from: string = '';
}
