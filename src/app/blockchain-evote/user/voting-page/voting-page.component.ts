import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { BlockchainApiService } from 'src/app/service/blockchain-api.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss']
})
export class VotingPageComponent implements OnInit {

  election: any = {};
  candidateList: any;
  imageSrc: any;
  displayModal: boolean = false;
  elecWStdId!: number;
  voted: boolean = false;
  pnl:any;
  constructor(private router: Router,
    private clientService: ClientService,
    private confirmationService: ConfirmationService,
    private blockchainService: BlockchainApiService,
    private auth: AuthService) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    const id = parseInt(url[url.length - 1]);

    this.clientService.getElectionById(id).subscribe({
      next: (res) => {
        this.election = res;
      },
      complete: () => {
        const startDateSplit = this.election.elecStartdate.split('[UTC]');
        const endDateSplit = this.election.elecEnddate.split('[UTC]');
        this.election.elecStartdate = startDateSplit[0];
        this.election.elecEnddate = endDateSplit[0];
      }
    });

    this.clientService.getCandidateByElectionWithApprove(id).subscribe({
      next: (res) => {
        this.candidateList = res;
      },
      complete: () => {
        for (let candidate of this.candidateList) {
          this.clientService.getStudentbyCandidate(candidate.candidate.candiId).subscribe(res => {
            candidate.candidate['name'] = `${res[0].student.prefix}${res[0].student.firstName} ${res[0].student.lastName}`
          })
        }
      }
    })
    this.clientService.getEWSByStdIdAndElecId(this.auth.user.studentId, id).subscribe({
      next: (res) => {
        this.elecWStdId = res[0].esId;
      },
      complete: () => {        
        this.clientService.checkVote(this.elecWStdId).subscribe(res => {
          if (res <= 0) {
            this.voted = true;
          }
        });
      }
    })
  }

  goToVotingScore() {
    this.router.navigate(['blockchain-evote/score/', this.election.elecId])
  }

  defaultImage(event: Event) {
    return (event.target as HTMLImageElement).src = "./assets/img/icon/candidate.png";
  }

  vote(candidate: any) {
    this.confirmationService.confirm({
      header: `ประสงค์ลงคะแนนให้${candidate.name}?`,
      message: `ท่านประสงค์ที่จะลงคะแนนให้${candidate.name}`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'ลงคะแนน',
      rejectLabel: 'ยกเลิก',
      accept: () => {
        let data = {}
        this.clientService.getStudentById(this.auth.user.studentId).subscribe({
          next: (res) => {
            data = {
              elecId: this.election.elecId,
              candidate: {
                candiId: candidate.candiId,
                candiName: candidate.name
              },
              student: {
                studentId: res.studentId,
                studentCode: res.studentCode,
                studentName: `${res.prefix}${res.firstName} ${res.lastName}`
              }
            }
          },
          complete: () => {
            this.blockchainService.mining(data).subscribe({
              complete: () => {
                const vote = { voted: true }
                this.clientService.vote(this.elecWStdId, vote).subscribe({
                  complete: () => {
                    this.displayModal = true;
                    setTimeout(() => {
                      this.router.navigateByUrl("/blockchain-evote/homepage");
                    }, 1500)
                  }
                })
              }
            })
          }
        })
      }
    })
  }
}
