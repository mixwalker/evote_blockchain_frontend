import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Election } from 'src/app/interface/Election';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-manage-election',
  templateUrl: './manage-election.component.html',
  styleUrls: ['./manage-election.component.scss']
})
export class ManageElectionComponent implements OnInit {

  electionComing:any;
  electionOnVoteList: any;
  electionVoteCompleteList: any;
  getAddRemoveVoter: boolean = false;
  displayModal: boolean = false;
  displayModalFail: boolean = false;
  constructor(private router: Router, private clientService: ClientService) { }

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

    this.clientService.getElectionComingSoon().subscribe(res =>{
      res.map((items: any) => {
        if(items.elecStartdate && items.elecEnddate){
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
      this.electionComing = res
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

  editElection(id:number) {
    this.router.navigate(['blockchain-admin', 'edit_election',id])
  }

  goToElectionDetail(id:number){
    this.router.navigate(['blockchain-admin', 'election_detail',id])
  }

  deleteElectionOnVoteList(id: number,index:number) {
    this.clientService.deleteElectionById(id).subscribe({
      complete:()=>{
        this.electionOnVoteList.splice(index,1)
        this.displayModal = true;
        setTimeout(() => {
          this.displayModal = false;
        }, 1000);
      },
      error:()=>{
        this.displayModalFail = true;
        setTimeout(() => {
          this.displayModalFail = false;
        }, 1000);
      }
    })
  }

  deleteElection(id: number,index:number) {
    this.clientService.deleteElectionById(id).subscribe({
      complete:()=>{
        this.electionComing.splice(index,1)
        this.displayModal = true;
        setTimeout(() => {
          this.displayModal = false;
        }, 1000);
      },
      error:()=>{
        this.displayModalFail = true;
        setTimeout(() => {
          this.displayModalFail = false;
        }, 1000);
      }
    })
  }
}
