import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-reg-memconcil',
  templateUrl: './reg-memconcil.component.html',
  styleUrls: ['./reg-memconcil.component.scss']
})
export class RegMemconcilComponent implements OnInit {

  studentData:any;
  studentAge!:Number;
  constructor(private auth: AuthService, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getStudentById(this.auth.user.studentId).subscribe(res=>{
      this.studentData = res;
      let dateSplit =  this.studentData.birthday.toString().split('[UTC]');
      const brithDay = new Date(dateSplit[0]);
      const now = new Date();
      let oneYear = 1000 * 60 * 60 * 24;
      this.studentAge = Math.floor(((now.getTime() - brithDay.getTime())/oneYear)/365);
      this.studentData.birthday = brithDay;
    });
  }

}
