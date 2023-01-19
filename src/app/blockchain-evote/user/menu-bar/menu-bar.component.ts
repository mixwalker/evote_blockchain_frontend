import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
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

  ngOnInit(): void {
    this.clientService.getStudentById(this.auth.user.studentId).subscribe(res => {
      this.students = res;

      this.items = [
        {
          label: 'หน้าแรก',
          icon: 'pi pi-fw pi-home',
          routerLink: ['/blockchain-evote/homepage']
        },
        {
          label: 'ลงสมัครเลือกตั้ง',
          icon: 'pi pi-fw pi-pencil',
          items: [{
            label: 'ลงทะเบียนนายกสโมสร',
            routerLink: ['/blockchain-evote/reg_president']
          },
          {
            label: 'ลงทะเบียนสมาชิกสโมสร',
            routerLink: ['/blockchain-evote/reg_memclub']
          },
          {
            label: 'ลงทะเบียนสมาชิกสภานักศึกษา',
            routerLink: ['/blockchain-evote/reg_memconcil']
          },
          ]
        },
        {
          label: `${this.students.firstName} ${this.students.lastName}`,
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
