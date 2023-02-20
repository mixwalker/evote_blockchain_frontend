import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-menu-bar-admin',
  templateUrl: './menu-bar-admin.component.html',
  styleUrls: ['./menu-bar-admin.component.scss']
})
export class MenuBarAdminComponent implements OnInit {

  items: any;
  admin: any;
  constructor(private auth: AuthService, private router: Router, private adminService: AdminService) {

  }

  ngOnInit(): void {
    this.adminService.getAdminById(this.auth.user.studentId).subscribe(res => {
      this.admin = res;
      this.items = [
        {
          label: 'หน้าแรก',
          icon: 'pi pi-fw pi-home',
          routerLink: ['/blockchain-admin/homepage']
        },
        {
          label: 'สร้างการเลือกตั้ง',
          icon: 'pi pi-fw pi-plus-circle',
          routerLink: ['/blockchain-admin/create_election']
        },
        {
          label: `${this.admin.firstName} ${this.admin.lastName}`,
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'ออกจากระบบ',
              icon: 'pi pi-fw pi-sign-out',
              command: (event: any) => {
                this.logout();
                window.location.reload();
              }
            },
          ]
        }
      ]
    });
  }

  logout() {
    this.auth.logout();
  }

}
