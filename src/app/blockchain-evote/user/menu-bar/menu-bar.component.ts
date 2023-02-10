import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  items: any;
  students: any;
  constructor(private auth: AuthService, private router: Router, private clientService: ClientService) { }

  async ngOnInit() {
    this.students = await lastValueFrom(this.clientService.getStudentById(this.auth.user.studentId));

    this.items = [
      {
        label: 'หน้าแรก',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/blockchain-evote/homepage']
      },
      {
        label: 'ลงสมัครเลือกตั้ง',
        icon: 'pi pi-fw pi-pencil',
        routerLink: ['/blockchain-evote/register']
      },
      {
        label: `${this.students!.firstName} ${this.students!.lastName}`,
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'สถานะการลงสมัคร',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['/blockchain-evote/reg_status']
          },
          {
            label: 'ออกจากระบบ',
            icon: 'pi pi-fw pi-sign-out',
            command: (event: any) => {
              this.logout();
            }
          },
        ]
      }
    ]
  }

  logout() {
    this.auth.logout();
    window.location.reload();
  }

}
