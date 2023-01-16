import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  studentId!:string;
  password!:string;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(res =>{
      if(res){
        this.router.navigateByUrl("/blockchain-evote/homepage");
      }
    })
  }

  login(){
    this.auth.login(this.studentId,this.password).subscribe(res=>{
      this.router.navigateByUrl("/blockchain-evote/homepage");
    });
  }
}
