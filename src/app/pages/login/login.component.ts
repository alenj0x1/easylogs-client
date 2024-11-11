import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private welcomeList = [
    'Bienvenido', // Español
    'Welcome', // Inglés
    'Bienvenue', // Francés
    'Willkommen', // Alemán
    'Benvenuto', // Italiano
    'Bem-vindo', // Portugués
    'Benvenut', // Catalán
    'Velkommen', // Danés
    'Välkommen', // Sueco
    'Hoş geldiniz', // Turco
    'Ahlan wa sahlan', // Árabe
    '환영합니다 (Hwanyeonghamnida)', // Coreano
    '欢迎 (Huānyíng)', // Chino
    'ようこそ (Yōkoso)', // Japonés
    'Добро пожаловать (Dobro pozhalovat)', // Ruso
    'Sveiki atvykę', // Lituano
    'Bine ați venit', // Rumano
    'ยินดีต้อนรับ (Yindî ton rap)', // Tailandés
    'स्वागत है (Swāgat hai)', // Hindi
    'ยินดีต้อนรับ (Yindî ton rap)', // Tailandés
    'Kalimera', // Griego
    'Chào mừng', // Vietnamita
    'Welkom', // Neerlandés
    'Karibu', // Swahili
    'Sawubona', // Zulu
  ];
  public welcome: string = this.welcomeList[0];

  ngOnInit(): void {
    setInterval(() => {
      this.welcome = this.welcomeList[Math.floor(Math.random() * (this.welcomeList.length - 1 - 0))];
    }, 1000);
  }
}
