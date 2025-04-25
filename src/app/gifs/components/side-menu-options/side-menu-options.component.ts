import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from '../../services/gifs.service';

interface MenuOption {
  icon: string;
  label: string;
  router: string;
  subLabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent { 
  gifService = inject(GifsService);
  
  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'trending',
      router: '/dashboard/trending',
      subLabel: 'Popular Gifs'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'search',
      router: '/dashboard/search',
      subLabel: 'Search Gifs'
    }
  ]
}
