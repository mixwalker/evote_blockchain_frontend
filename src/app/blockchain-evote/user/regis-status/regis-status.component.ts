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
  constructor(private router: Router, private clientService: ClientService, private auth: AuthService) { }

  ngOnInit(): void {
    this.clientService.getCandidatebyStudent(this.auth.user.studentId).subscribe({
      next: (res) => {
        this.candidateList = res
      },
      complete: () => {
        const candiIdList = this.candidateList.map(candidate => candidate.candidate).map((id:any)=> id.candiId);
        candiIdList.forEach(list =>{
          this.clientService.getElecByCandidate(list).subscribe(res=>{
            this.electionList.push(res.map((list:any) => list.election)[0] as Election);
            console.log();
            
          })
        })        
      }
    })
  }

}
