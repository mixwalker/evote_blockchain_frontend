import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-election-onvote',
  templateUrl: './election-onvote.component.html',
  styleUrls: ['./election-onvote.component.scss']
})
export class ElectionOnvoteComponent implements OnInit {


  data: any;
  election: any;
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

    this.clientService.getStudentByElection(id).subscribe({
      next:(res)=>{
        this.studentList = res
      },
      complete:()=>{
        this.clientService.studentVotedInElection(id).subscribe(res =>{
          this.data = {
            labels: ['ลงคะแนน', 'ไม่ลงคะแนน'],
            datasets: [
              {
                data: [],
                backgroundColor: [
                  "#66BB6A",
                  "#d2222d",
                ],
                hoverBackgroundColor: [
                  "#81C784",
                  "#d63842",
                ]
              }
            ]
          };
          const notVote = this.studentList.length - res.length;
          this.data.datasets[0].data.push(res.length);
          this.data.datasets[0].data.push(notVote);
        })
      }
    });
  }

  inputSearch(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }

  defaultImage(event: Event) {
    return (event.target as HTMLImageElement).src = "./assets/img/icon/candidate.png";
  }

}
