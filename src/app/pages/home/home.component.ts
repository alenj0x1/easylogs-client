import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import AppInfoDto from '../../interfaces/dtos/AppInfoDto';
import defaultLib from '../../lib/default.lib';
import { CardComponent } from '../../components/card/card.component';
import ICard from '../../interfaces/components/ICard';
import { PERMISSIONS } from '../../lib/consts.lib';
import { mePerms } from '../../lib/checker.lib';
import UserAppMeDto from '../../interfaces/dtos/UserAppMeDto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public cards: ICard[] = [
    {
      title: 'Crear un registro',
      para: 'Cree un registro fácilmente, sin usar directamente la API.',
      icon: 'heroDocumentSolid',
      route: '/logs/create',
      permission: PERMISSIONS.CREATE_LOGS,
    },
    {
      title: 'Crear un usuario',
      para: 'Cree uno o más usuarios, y otorgue sus permisos correspondientes.',
      icon: 'heroDocumentSolid',
      route: '/users/create',
      permission: PERMISSIONS.CREATE_USERS,
    },
    {
      title: 'Crear un token de acceso',
      para: 'Un token de accesso le permite realizar solicitudes directamente a la API.',
      icon: 'heroDocumentSolid',
      route: '/tokenaccess/create',
      permission: PERMISSIONS.CREATE_ACCESS_TOKEN,
    },
    {
      title: 'Ver todos los registros',
      para: 'Todos los registros que pertenecen a esta instancia.',
      icon: 'heroDocumentSolid',
      route: '/logs/view',
      permission: 0,
    },
    {
      title: 'Ver todos los usuarios',
      para: 'Todos los usuarios que pertenecen a esta instancia.',
      icon: 'heroDocumentSolid',
      route: '/users/view',
      permission: 0,
    },
  ];
  public appInfo: AppInfoDto = defaultLib.appInfo;
  public me: UserAppMeDto = defaultLib.userAppMe;

  constructor(private readonly data: DataService) {}

  ngOnInit(): void {
    this.data.$appInfo.subscribe((data) => (this.appInfo = data));
    this.data.$me.subscribe((data) => (this.me = data));
  }
}
