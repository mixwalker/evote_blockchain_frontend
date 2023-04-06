import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent implements OnInit {
  maxFileSize: string = "1000000";
  files: any;
  fileName!: string;
  imageSrc: any;
  displayPic: boolean = false;
  studentData: any = {};
  studentAge!: number;
  candidateData!: any;
  candidateId!: number;
  displayModal: boolean = false;
  constructor(private auth: AuthService,
    private router: Router,
    private clientService: ClientService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    const url = this.router.url.split('/').at(-1);
    this.candidateId = parseInt(url!);
    this.clientService.getCandidateById(this.candidateId).subscribe(res => {
      for(let i=res.candiExpList.length;i<3;i++){
        res.candiExpList.push(
          {
            position: "",
            years: ""
          }
        )
      }
      this.candidateData = res
    })
    this.clientService.getStudentDataByCandidateId(this.candidateId).subscribe(res => {
      this.studentData = res;
      let dateSplit = this.studentData.birthday.toString().split('[UTC]');
      const brithDay = new Date(dateSplit[0]);
      const now = new Date();
      let oneYear = 1000 * 60 * 60 * 24;
      this.studentAge = Math.floor(((now.getTime() - brithDay.getTime()) / oneYear) / 365);
      this.studentData.birthday = brithDay;
    });
  }

  edit() {
    this.confirmationService.confirm({
      header: 'ต้องการแก้ไขข้อมูลหรือไม่?',
      message: 'กรุณาตรวจสอบข้อมูลที่กรอก',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'แก้ไข',
      rejectLabel: 'ยกเลิก',
      accept: () => {
        this.candidateData.candiExpList.map((items: any) => {
          if(items.years){
            items.years = new Date(items.years).getFullYear().toString()
          }
        })
        this.clientService.editCandidateById(this.candidateId, this.candidateData).subscribe({
          next: (res) => {
            if (this.files) {
              const formData = new FormData();
              formData.append('files', this.files)
              formData.append('fileName', this.candidateData.candiImage);
              this.clientService.uploadImageCandidate(formData).subscribe();
            }
          },
          complete: () => {
            this.displayModal = true;
            setTimeout(() => {
              this.router.navigateByUrl('/blockchain-admin/candidatelist');
            }, 2000);
          }
        })
      }
    });
  }

  onSelect(event: any) {
    this.files = event.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.files);
    reader.onload = () => {
      this.imageSrc = reader.result;
      this.displayPic = true;
    };
  }

  refresh(event: any) {
    event.clear();
    this.files = null;
    this.imageSrc = null;
    this.displayPic = false;
  }

  defaultImage(event: Event) {
    return (event.target as HTMLImageElement).src = "./assets/img/icon/candidate.png";
  }

  
}
