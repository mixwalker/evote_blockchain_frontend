import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  items: any;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'หน้าแรก',
        icon: 'pi pi-fw pi-home',
        routerLink:['/blockchain-evote/homepage']
      },
      {
        label: 'ลงสมัครเลือกตั้ง',
        icon: 'pi pi-fw pi-pencil',
        items: [{
          label: 'ลงทะเบียนนายกสโมสร',
          routerLink:['/blockchain-evote/reg_president']
        },
        {
          label: 'ลงทะเบียนสมาชิกสโมสร',
          routerLink:['/blockchain-evote/reg_memclub']
        },
        {
          label: 'ลงทะเบียนสมาชิกสภานักศึกษา',
          routerLink:['/blockchain-evote/reg_memconcil']
        },
        ]
      },
      {
        label: 'สรวิชญ์ เจียวก๊ก',
        icon: 'pi pi-fw pi-user',
        items:[
          {
            label: 'สถานะการลงสมัคร',
            icon: 'pi pi-fw pi-check-square',
            routerLink:['/blockchain-evote/reg_status']
          },
          {
            label: 'ออกจากระบบ',
            icon: 'pi pi-fw pi-sign-out'
          },
        ]
      }
    ]
  }

  hello(){
    console.log("hello")
  }

}
