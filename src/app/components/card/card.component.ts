import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  providers: [],
})
export class CardComponent {
  @Input()
  public title: string = '';
  @Input()
  public para: string = '';
  @Input()
  public icon: string = '';
  @Input()
  public route: string = '';
}
