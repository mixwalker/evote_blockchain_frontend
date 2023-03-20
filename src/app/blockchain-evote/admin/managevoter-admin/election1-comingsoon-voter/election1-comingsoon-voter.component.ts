import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-election1-comingsoon-voter',
  templateUrl: './election1-comingsoon-voter.component.html',
  styleUrls: ['./election1-comingsoon-voter.component.scss']
})
export class Election1ComingsoonVoterComponent implements OnInit {

  data:any;
  election: any;
  studentcanVoteList:any;
  studentcantVoteList:any;
  studentList: any;
  checked: boolean = true;
  displaySuccessModal = false;
  displayErrorModal = false;
  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    const id = parseInt(url[url.length - 1]);

    this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  "#FFA726"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784",
                  "#FFB74D"
              ]
          }
      ]
  };

    this.clientService.getElectionById(id).subscribe({
      next: (res) => {
        this.election = res;
      },
      complete: () => {
        const startDateSplit = this.election.elecStartdate.split('[UTC]');
        const endDateSplit = this.election.elecEnddate.split('[UTC]');
        const regisStartDateSplit = this.election.elecRegisStartdate.split('[UTC]');
        const regisEndDateSplit = this.election.elecRegisEnddate.split('[UTC]');
        this.election.elecStartdate = new Date(startDateSplit[0]);
        this.election.elecEnddate = new Date(endDateSplit[0]);
        this.election.elecRegisStartdate = new Date(regisStartDateSplit[0]);
        this.election.elecRegisEnddate = new Date(regisEndDateSplit[0]);
      }
    });

    this.clientService.getStudentNotInElection(id).subscribe(res=>{
      this.studentcantVoteList = res;
    })

    this.clientService.getStudentInElection(id).subscribe(res => this.studentcanVoteList = res);
  }

  inputSearch(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }

  inputSearch2(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }

  defaultImage(event: Event) {
    return (event.target as HTMLImageElement).src = "./assets/img/icon/candidate.png";
  }

  add(studentId:number){
    const ElecWStudent = {
      election: {
        elecId: this.election.elecId
      },
      student: {
        studentId: studentId
      }
    }

    this.clientService.createEs(ElecWStudent).subscribe(res=> console.log(res));
  }

  remove(id:number){
    this.clientService.deleteEsByStudent(id).subscribe();
  }
}
