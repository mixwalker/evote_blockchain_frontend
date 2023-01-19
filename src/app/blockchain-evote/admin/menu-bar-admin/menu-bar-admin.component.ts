import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-menu-bar-admin',
  templateUrl: './menu-bar-admin.component.html',
  styleUrls: ['./menu-bar-admin.component.scss']
})
export class MenuBarAdminComponent implements OnInit {

  items: any;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'หน้าแรก',
        icon: 'pi pi-fw pi-home',
        routerLink:['/blockchain-admin/homepage']
      },
      {
        label: 'สรวิชญ์ เจียวก๊ก',
        icon: 'pi pi-fw pi-user',
        items:[
          {
            label: 'ออกจากระบบ',
            icon: 'pi pi-fw pi-sign-out',
            command: (event:any) =>{
              this.logout();
              window.location.reload();
            }
          },
        ]
      }
    ]
  }

  logout(){
    this.auth.logout();
  }

}
