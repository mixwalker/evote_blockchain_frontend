import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  studentCode!: string;
  password!: string;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(res => {
      if (res) {
        const role = this.auth.user?.role;
        this.router.navigateByUrl(role === 'student' ? '/blockchain-evote/homepage' : '/blockchain-admin/homepage');
      }
    })
    // console.log(this.auth.isLoggedIn$);
    
  }

  login() {
    this.auth.login(this.studentCode, this.password).subscribe(res => {
      
      // if (res.role === "admin") {
      //   this.router.navigateByUrl("/blockchain-admin/homepage");
      // } else {
      //   this.router.navigateByUrl("/blockchain-evote/homepage");
      // }
    });
  }
}
