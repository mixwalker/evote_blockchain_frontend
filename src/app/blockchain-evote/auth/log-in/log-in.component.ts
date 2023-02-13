import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  studentCode!: string;
  password!: string;
  constructor(private auth: AuthService, private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(res => {
      if (res) {
        const role = this.auth.user?.role;
        this.router.navigateByUrl(role === 'student' ? '/blockchain-evote/homepage' : '/blockchain-admin/homepage');
      }
    })
    
  }

  login() {
    this.auth.login(this.studentCode, this.password).subscribe({
      complete:()=>{
        this.messageService.add({severity:'success', summary: 'เข้าสู่ระบบ', detail: 'เข้าสู่ระบบสำเร็จ'});
        setTimeout(() => {
          this.ngOnInit();
        }, 1000);
      },
      error:()=>{
        this.messageService.add({severity:'error', summary: 'ไม่สามารถเข้าสู่ระบบได้', detail: 'รหัสนักศึกษาหรือรหัสผ่านไม่ถูกต้อง'});
      }
    });
  }
}
