import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-candidatelist-admin',
  templateUrl: './candidatelist-admin.component.html',
  styleUrls: ['./candidatelist-admin.component.scss']
})
export class CandidatelistAdminComponent implements OnInit {
  allElection: any;
  electionOnVoteList: any;
  electionVoteCompleteList: any;
  getAddRemoveVoter: boolean = false;
  constructor(
    private router: Router,
    private clientService: ClientService
    ) { }

  ngOnInit(): void {

    this.clientService.getElectionOnVote().subscribe(res => {
      res.map((items: any) => {
        const startDateSplit = items.elecStartdate.split('[UTC]');
        const endDateSplit = items.elecEnddate.split('[UTC]');
        items.elecStartdate = startDateSplit[0];
        items.elecEnddate = endDateSplit[0];
      })
      this.electionOnVoteList = res
    })

    this.clientService.getElectionVoteComplete().subscribe(res => {
      res.map((items: any) => {
        const startDateSplit = items.elecStartdate.split('[UTC]');
        const endDateSplit = items.elecEnddate.split('[UTC]');
        items.elecStartdate = startDateSplit[0];
        items.elecEnddate = endDateSplit[0];
      })
      this.electionVoteCompleteList = res
    })

    this.clientService.getElectionComingSoon().subscribe(res => {
      res.map((items: any) => {
        if (items.elecStartdate && items.elecEnddate) {
          const startDateSplit = items.elecStartdate.split('[UTC]');
          const endDateSplit = items.elecEnddate.split('[UTC]');
          const regisStartDateSplit = items.elecRegisStartdate.split('[UTC]');
          const regisEndDateSplit = items.elecRegisEnddate.split('[UTC]');
          items.elecStartdate = startDateSplit[0];
          items.elecEnddate = endDateSplit[0];
          items.elecRegisStartdate = regisStartDateSplit[0];
          items.elecRegisEnddate = regisEndDateSplit[0];
        }
      })
      this.allElection = res
    })
  }

  inputSearch(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }

  inputSearchI(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }

  inputSearchII(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }

  addRemoveVoter() {
    this.getAddRemoveVoter = true
  }

  unActivate(unActivate: boolean) {
    this.getAddRemoveVoter = unActivate;
  }

  editElection(id: number) {
    this.router.navigate(['blockchain-admin', 'edit_election', id])
  }

  goToElectionDetail(id: number) {
    this.router.navigate(['blockchain-admin', 'election_detail', id])
  }

  goToCompleteElection(id: number) {
    this.router.navigate(['blockchain-admin', 'managevoter', 'complete_vote', id])
  }

}
