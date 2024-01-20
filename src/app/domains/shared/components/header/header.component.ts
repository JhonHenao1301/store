import { Component, signal, inject } from '@angular/core';

import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { HeaderItem } from '@shared/models/headerItem.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  hideSideMenu = signal(true)
  hideResponsiveMenu = signal(true)
  private cartService = inject(CartService)
  cart = this.cartService.cart
  total = this.cartService.total

  showSideMenu() {
    this.hideSideMenu.update(prevState => !prevState)
  }

  showResponsiveMenu() {
    this.hideResponsiveMenu.update(prevState => !prevState)
    console.log(this.hideResponsiveMenu)
  }

  headerArray: HeaderItem[] = [
    {
      name: 'Home',
      route: '/',
      activeClass: 'underline',
      class: 'block hover:underline'
    },
    {
      name: 'About',
      route: '/about',
      activeClass: 'underline',
      class: 'block hover:underline'
    },
    {
      name: 'Services',
      route: '/services',
      activeClass: 'underline',
      class: 'block hover:underline'
    }
  ]
}
