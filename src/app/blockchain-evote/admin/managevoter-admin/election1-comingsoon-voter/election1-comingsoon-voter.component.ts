import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-election1-comingsoon-voter',
  templateUrl: './election1-comingsoon-voter.component.html',
  styleUrls: ['./election1-comingsoon-voter.component.scss']
})
export class Election1ComingsoonVoterComponent implements OnInit {

  data: any;
  election: any;
  studentcanVoteList: any;
  studentcantVoteList: any;
  studentList: any;
  studentData: any;
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

    this.clientService.getStudentInElection(id).subscribe(res => this.studentcanVoteList = res);

    this.clientService.getStudentNotInElection(id).subscribe(res => this.studentcantVoteList = res);

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

  add(studentDetail: any, index: number) {
    const ElecWStudent = {
      election: {
        elecId: this.election.elecId
      },
      student: {
        studentId: studentDetail.studentId
      }
    }

    this.clientService.createEs(ElecWStudent).subscribe({
      complete: () => {
        this.studentcanVoteList.push(studentDetail);
        this.studentcantVoteList.splice(index, 1);
      }
    });
  }

  remove(studentDetail: any, index: number) {
    this.clientService.deleteEsByStudent(studentDetail.studentId).subscribe({
      complete: () => {
        this.studentcantVoteList.push(studentDetail);
        this.studentcanVoteList.splice(index, 1);
      }
    });
  }

  removeAll() {
    this.clientService.getStudentInElection(this.election.elecId).subscribe({
      next: (res) => {
        this.studentData = res;
        this.studentData.forEach((items: any, index: number) => {
          this.clientService.deleteEsByStudent(items.studentId).subscribe({
          });
        });
      },
      complete:() =>{
        window.location.reload();
      }
    });
  }

  addAll() {
    this.clientService.getStudentNotInElection(this.election.elecId).subscribe({
      next: (res) => {
        this.studentData = res;
        this.studentData.forEach((items: any, index: number) => {
          const ElecWStudent = {
            election: {
              elecId: this.election.elecId
            },
            student: {
              studentId: items.studentId
            }
          }
          this.clientService.createEs(ElecWStudent).subscribe({
             complete: () => {
              this.studentcanVoteList.push(items);
              this.studentcantVoteList.splice(index, 1);
            }
          });
        });
      },
      complete:() =>{
        window.location.reload();
      }
    });
  }
}
