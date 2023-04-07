import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-edit-election',
  templateUrl: './edit-election.component.html',
  styleUrls: ['./edit-election.component.scss']
})
export class EditElectionComponent implements OnInit {
  election: any;
  electionAndCandiList: any;
  checked: boolean = true;
  displaySuccessModal = false;
  displayErrorModal = false;
  imageSrc: any;
  files: any;
  displayPic: boolean = false;
  noElecName: boolean = false;
  noElecDetail: boolean = false;
  wrongDate: boolean = false;
  wrongRegisDate: boolean = false;
  wrongRegisDatelessStart: boolean = false;
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

    this.clientService.getCandidateByElectionWithApprove(id).subscribe({
      next: (res) => {
        this.electionAndCandiList = res;
      },
      complete: () => {
        for (let candidate of this.electionAndCandiList) {
          this.clientService.getStudentbyCandidate(candidate.candidate.candiId).subscribe(res => {
            candidate.candidate['name'] = `${res[0].student.prefix}${res[0].student.firstName} ${res[0].student.lastName}`
          })
        }
      }
    })
  }

  goToVotingScore() {
    this.router.navigateByUrl("/blockchain-admin/score");
  }

  defaultImage(event: Event) {
    return (event.target as HTMLImageElement).src = "./assets/img/icon/candidate.png";
  }

  checkCandidate(id: number) {
    this.router.navigate(['blockchain-admin', 'election_detail', 'candidate_detail', id])
  }

  selectImage(event: any) {
    this.files = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.files);
    reader.onload = () => {
      this.imageSrc = reader.result;
      this.displayPic = true;
    };
  }

  editElection(election: any) {
    if (this.election.elecEnddate < this.election.elecStartdate) {
      this.wrongDate = true;
      return;
    }
    if (this.election.elecRegisEnddate < this.election.elecRegisStartdate) {
      this.wrongRegisDate = true;
      return;
    }
    if (this.election.elecRegisEnddate > this.election.elecStartdate) {
      this.wrongRegisDatelessStart = true;
      return;
    }

    if(!this.election.elecName){
      this.noElecName = true;
      return;
    }

    if(!this.election.elecDetail){
      this.noElecDetail = true;
      return;
    }

    this.confirmationService.confirm({
      header: 'ต้องการแก้ไขหรือไม่?',
      message: 'กรุณาตรวจสอบข้อมูลที่แก้ไข',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'แก้ไขข้อมูล',
      rejectLabel: 'ยกเลิก',
      accept: () => {
        this.clientService.editElection(election).subscribe({
          complete: () => {
            if (this.imageSrc) {
              const formData = new FormData();
              formData.append('files', this.files)
              formData.append('fileName', election.elecImages);
              this.clientService.uploadImageElection(formData).subscribe();
            }
            this.clientService.checkElectionTime().subscribe();
            this.displaySuccessModal = true;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }, error: () => {
            this.displayErrorModal = true;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
      }
    })
  }

}
