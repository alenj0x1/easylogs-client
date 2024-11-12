import { Component, OnInit } from '@angular/core';
import { welcomeList } from '../../lib/consts.lib';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroRocketLaunchSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [provideIcons({ heroRocketLaunchSolid })],
})
export class LoginComponent implements OnInit {
  public welcome: string = welcomeList[0];

  ngOnInit(): void {
    this.showWelcome();
  }

  showWelcome() {
    let current = 0;

    setInterval(() => {
      if (current == welcomeList.length) current = 0;

      this.welcome = welcomeList[current];
      current += 1;
    }, 3000);
  }
}
