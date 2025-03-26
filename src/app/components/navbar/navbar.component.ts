import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OnInit, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, AfterViewInit {
  navbarBackground: string = 'none';

  posts: any[] = [];
  token: string | null = null;
  constructor() {}

  ngOnInit(): void {
    this.token = localStorage.getItem('authToken');
  }

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.onWindowScroll);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }
}
