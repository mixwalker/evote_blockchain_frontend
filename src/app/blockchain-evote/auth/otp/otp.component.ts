import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  private studentCode = this.auth.std.studentCode;
  private password = this.auth.std.password;
  otp!:string;
  blockedUI: boolean = true;
  submited:boolean = false;
  @Output() unBlock = new EventEmitter;
  constructor(private auth:AuthService, private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
  }

  cofirme(){
    this.submited = true;
    if(!this.otp) return;
    this.auth.login(this.studentCode,this.password,this.otp).subscribe({
      complete:()=>{                
        this.messageService.add({severity:'success', summary: 'เข้าสู่ระบบ', detail: 'เข้าสู่ระบบสำเร็จ'});
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error: ()=>{
        this.messageService.add({severity:'error', summary: 'รหัส OTP ไม่ถูกต้อง', detail: 'เข้าสู่ระบบไม่สำเร็จสำเร็จ'});
      }
    })
  }

  requestNewOTP(){
    this.auth.checkLogin(this.studentCode, this.password).subscribe({
      complete:()=>{
        this.messageService.add({severity:'success', summary: 'คำร้องขอรหัส OTP', detail: 'ส่งรหัส OTP ใหม่เรียบร้อยแล้ว'});
      },
      error:()=>{
        this.messageService.add({severity:'error', summary: 'คำร้องขอรหัส OTP', detail: 'ส่งรหัส OTP ใหม่ไม่สำเร็จ'});
      }
    });
  }
}
