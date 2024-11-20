import { Component, OnInit } from '@angular/core';
import { WELCOME_WORDS } from '../../lib/consts.lib';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroRocketLaunchSolid } from '@ng-icons/heroicons/solid';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [provideIcons({ heroRocketLaunchSolid })],
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  public welcome: string = WELCOME_WORDS[0];

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private router: Router,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    this.showWelcome();
  }

  showWelcome() {
    let current = 0;

    setInterval(() => {
      if (current == WELCOME_WORDS.length) current = 0;

      this.welcome = WELCOME_WORDS[current];
      current += 1;
    }, 3000);
  }

  login() {
    this.http.login(this.form.value).subscribe({
      next: ({ data, message }) => {
        this.messageService.add({
          severity: 'success',
          detail: message,
          life: 1000,
        });

        if (data) {
          this.token.set(data);
          this.router.navigate(['home']);
          return;
        }

        this.messageService.add({
          severity: 'error',
          detail: 'unexpected error',
          life: 1000,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: err.error.message,
          life: 1000,
        });
      },
    });
  }
}
