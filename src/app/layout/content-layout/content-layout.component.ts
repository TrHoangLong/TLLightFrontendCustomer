import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent implements OnInit {

  selectedMenu = '';

  constructor(private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  onClick(key: string): void {
    this.selectedMenu = key;
    if (this.selectedMenu === key) {
      this.router.navigate(['/dashboard/' + key]);
    } else {
    }
  }

  routerMenu(key: string) {
    this.router.navigate(['/dashboard/' + key]);
  }
}
