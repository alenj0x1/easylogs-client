import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroSparkles } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
  providers: [provideIcons({ heroSparkles })],
})
export class BrandComponent {}
