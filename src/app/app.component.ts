import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { DataService } from './services/data.service';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessagesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  constructor(private messageService: MessageService, private data: DataService) {}

  ngOnInit(): void {
    this.messageService.messageObserver.subscribe((data) => console.log(data));
  }
}
