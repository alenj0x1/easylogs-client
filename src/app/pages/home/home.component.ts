import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import AppInfoDto from '../../interfaces/dtos/AppInfoDto';
import defaultLib from '../../lib/default.lib';
import { CardComponent } from '../../components/card/card.component';
import ICard from '../../interfaces/components/ICard';

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
    },
    {
      title: 'Crear un usuario',
      para: 'Cree uno o más usuarios, y otorgue sus permisos correspondientes.',
      icon: 'heroDocumentSolid',
      route: '/users/create',
    },
    {
      title: 'Crear un token de acceso',
      para: 'Un token de accesso le permite realizar solicitudes directamente a la API.',
      icon: 'heroDocumentSolid',
      route: '/tokenaccess/create',
    },
    {
      title: 'Ver todos los registros',
      para: 'Todos los registros que pertenecen a esta instancia.',
      icon: 'heroDocumentSolid',
      route: '/logs/view',
    },
    {
      title: 'Ver todos los usuarios',
      para: 'Todos los usuarios que pertenecen a esta instancia.',
      icon: 'heroDocumentSolid',
      route: '/users/view',
    },
  ];
  public appInfo: AppInfoDto = defaultLib.appInfo;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.$data.subscribe((data) => (this.appInfo = data));
  }
}
