import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-edit-candidatelist',
  templateUrl: './edit-candidatelist.component.html',
  styleUrls: ['./edit-candidatelist.component.scss']
})
export class EditCandidatelistComponent implements OnInit {

  election: any = [];
  test:any;
  candidateApproveList:any;
  candidateNotApproveList:any;
  checked: boolean = true;
  displaySuccessModal = false;
  displayErrorModal = false;
  notDisable:any;
  constructor(
    private router: Router,
    private clientService: ClientService,
    private confirmationService: ConfirmationService) { }

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

    this.clientService.getCandidateApprove(id).subscribe(res =>{
      this.candidateApproveList = res;      
    })

    this.clientService.getCandidateNotApprove(id).subscribe(res=>{
      this.candidateNotApproveList = res;
    })
  }

  goToVotingScore() {
    this.router.navigateByUrl("/blockchain-admin/score");
  }

  defaultImage(event: Event) {
    return (event.target as HTMLImageElement).src = "./assets/img/icon/candidate.png";
  }

  editElection(election: any) {
    this.confirmationService.confirm({
      header: 'ต้องการแก้ไขหรือไม่?',
      message: 'กรุณาตรวจสอบข้อมูลที่แก้ไข',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'แก้ไขข้อมูล',
      rejectLabel: 'ยกเลิก',
      accept: () => {
        this.clientService.editElection(election).subscribe({
          complete:() =>{
            this.displaySuccessModal = true;
            setTimeout(() => {
              this.router.navigateByUrl('/blockchain-admin/homepage');
            }, 2000);
          },error:()=>{
            this.displayErrorModal = true;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
      }
    })
  }

  inputSearch(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }

  inputSearch2(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }

  unApprove(studentDetail:any,index:number){
    this.clientService.unApprove(studentDetail.candidate.candiId).subscribe({
      complete: () =>{
        studentDetail.candidate.candiStatus = 0;
        this.candidateNotApproveList.push(studentDetail);
        this.candidateApproveList.splice(index, 1);
      }
    });
  }

  Approve(studentDetail:any,index:number){
    this.clientService.Approve(studentDetail.candidate.candiId).subscribe({
      complete: () =>{
        studentDetail.candidate.candiStatus = 1;
        this.candidateApproveList.push(studentDetail);
        this.candidateNotApproveList.splice(index, 1);
      }
    });
  }

  notApprove(studentDetail:any,index:number){
    this.clientService.notApprove(studentDetail.candidate.candiId).subscribe({
      complete: () =>{
        studentDetail.candidate.candiStatus = 2;
      }
    });
  }

  checkCandidateDetail(id:number){
    this.router.navigate(['blockchain-admin','candidatelist','candidate_detail',id]);
  }
}
