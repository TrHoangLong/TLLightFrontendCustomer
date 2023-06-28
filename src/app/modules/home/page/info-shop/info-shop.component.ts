import { Component, OnInit } from '@angular/core';
import { LINK_IMAGE } from 'src/app/core/constants/api';

@Component({
  selector: 'app-info-shop',
  templateUrl: './info-shop.component.html',
  styleUrls: ['./info-shop.component.css']
})
export class InfoShopComponent implements OnInit {

  linkImage: string = LINK_IMAGE;

  constructor() { }

  ngOnInit(): void {
  }

}
