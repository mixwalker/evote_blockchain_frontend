import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-election-detail-onvote',
  templateUrl: './election-detail-onvote.component.html',
  styleUrls: ['./election-detail-onvote.component.scss']
})
export class ElectionDetailOnvoteComponent implements OnInit {
  checked: boolean = true;
  getAddCandidate: boolean = false;
  electionAndCandiList:any;
  election:any
  constructor(private router:Router,private clientService: ClientService) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    const id = parseInt(url[url.length - 1]);
    
    this.clientService.getElectionById(id).subscribe({
      next: (res)=>{
        this.election = res
      },
      complete: () =>{
          const startDateSplit = this.election.elecStartdate.split('[UTC]');
          const endDateSplit = this.election.elecEnddate.split('[UTC]');
          this.election.elecStartdate = startDateSplit[0];
          this.election.elecEnddate = endDateSplit[0];
      }
    })

    this.clientService.getCandidateByElectionWithApprove(id).subscribe({
      next:(res) =>{
        this.electionAndCandiList = res;
      },
      complete:() =>{

          for (let candidate of this.electionAndCandiList) {
            this.clientService.getStudentbyCandidate(candidate.candidate.candiId).subscribe(res => {
              candidate.candidate['name'] = `${res[0].student.prefix}${res[0].student.firstName} ${res[0].student.lastName}`
            })
          }
      }
    })
  }

  defaultImage(event: Event) {
    return (event.target as HTMLImageElement).src = "./assets/img/icon/candidate.png";
  }

  addCandidate(){
    this.getAddCandidate = true;
  }

  unActivate(unActivate: boolean) {
    this.getAddCandidate = unActivate;
  }

  goToVotingScore(){
    this.router.navigate(['blockchain-admin/score/', this.election.elecId])
  }

}
