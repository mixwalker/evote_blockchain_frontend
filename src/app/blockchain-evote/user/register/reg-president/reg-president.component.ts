import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-reg-president',
  templateUrl: './reg-president.component.html',
  styleUrls: ['./reg-president.component.scss']
})
export class RegPresidentComponent implements OnInit {

  candidateNo!: string;
  position1!: string;
  position2!: string;
  position3!: string;
  pYear1!: string;
  pYear2!: string;
  pYear3!: string;

  maxFileSize: string = "1000000";
  fileName!: string;
  studentData: any;
  studentAge!: Number;
  constructor(private auth: AuthService, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getStudentById(this.auth.user.studentId).subscribe(res => {
      this.studentData = res;
      let dateSplit = this.studentData.birthday.toString().split('[UTC]');
      const brithDay = new Date(dateSplit[0]);
      const now = new Date();
      let oneYear = 1000 * 60 * 60 * 24;
      this.studentAge = Math.floor(((now.getTime() - brithDay.getTime()) / oneYear) / 365);
      this.studentData.birthday = brithDay;
    });
  }

  register() {
    const now = new Date();
    let candiObj = {
      candiNo: this.candidateNo,
      regisDate: now,
      candiExpList: [
        {
          position: this.position1,
          years: new Date(this.pYear1).getFullYear() + 543
        },
        {
          position: this.position2,
          years: new Date(this.pYear2).getFullYear() + 543
        },
        {
          position: this.position2,
          years: new Date(this.pYear3).getFullYear() + 543
        },
      ]
    }
    this.upload(event);
    // this.clientService.createCandidate(candiObj).subscribe({
    //   next:(res)=>{

    //   }
    // });
  }

  upload(event: any) {
    const formData = new FormData();
    formData.append('files', event.files[0])
    formData.append('fileName', 'helloWorld.png');
    this.clientService.uploadImageCandidate(formData).subscribe();
  }
}
