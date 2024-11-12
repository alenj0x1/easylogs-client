import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessagesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
})
export class AppComponent {
  title = 'easylogs-client';

  constructor(private messageService: MessageService) {
    this.messageService.messageObserver.subscribe((data) => console.log(data));
  }
}
