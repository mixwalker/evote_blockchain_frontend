import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Election } from 'src/app/interface/Election';
import { StudentAndCandidate } from 'src/app/interface/StudentAndCandidate';
import { AuthService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-regis-status',
  templateUrl: './regis-status.component.html',
  styleUrls: ['./regis-status.component.scss']
})
export class RegisStatusComponent implements OnInit {

  candidateList: StudentAndCandidate[] = [];
  electionList: Election[] = [];
  regisDetail: any;
  regisDetailBoolean: any = true;
  studentName!:string 
  constructor(private router: Router, private clientService: ClientService, private auth: AuthService) { }

  ngOnInit(): void {
    this.clientService.getCandidatebyStudent(this.auth.user.studentId).subscribe({
      next: (res) => {
        this.candidateList = res
        this.studentName = `${res[0].student.prefix}${res[0].student.firstName} ${res[0].student.lastName}`
      },
      complete: () => {
        const candiIdList = this.candidateList.map(candidate => candidate.candidate).map((id: any) => id.candiId);
        candiIdList.forEach(list => {
          this.clientService.getElecByCandidate(list).subscribe(res => {
            this.electionList.push(res.map((list: any) => list.election)[0] as Election);
          })
        })
      }
    })
  }

  checkstatus(candidateId: number) {
    this.clientService.getElecByCandidate(candidateId).subscribe(res => {
      res.map((items: any) => {
        if (items.candidate.regisDate) {
          const regisDateSplit = items.candidate.regisDate.split('[UTC]');
          items.candidate.regisDate = regisDateSplit[0];
        }
      })
      this.regisDetail = res
      this.regisDetailBoolean = false
    })
  }

  goToEdit(candidateId: number) {
    this.router.navigate(['blockchain-evote/edit_register/', candidateId])
  }

}
