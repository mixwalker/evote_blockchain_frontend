import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-election-complete',
  templateUrl: './election-complete.component.html',
  styleUrls: ['./election-complete.component.scss']
})
export class ElectionCompleteComponent implements OnInit {

  data:any;
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

    this.clientService.getStudentByElection(id).subscribe(res => this.studentList = res);
  }

  inputSearch(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }

  defaultImage(event: Event) {
    return (event.target as HTMLImageElement).src = "./assets/img/icon/candidate.png";
  }

}
