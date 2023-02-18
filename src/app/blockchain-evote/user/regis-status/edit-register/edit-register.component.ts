import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Candidate } from 'src/app/interface/Candidate';
import { AuthService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-edit-register',
  templateUrl: './edit-register.component.html',
  styleUrls: ['./edit-register.component.scss']
})
export class EditRegisterComponent implements OnInit {

  regisForm: FormGroup = new FormGroup({
    candidateNo: new FormControl(),
    position1: new FormControl(),
    position2: new FormControl(),
    position3: new FormControl(),
    pYear1: new FormControl(),
    pYear2: new FormControl(),
    pYear3: new FormControl()
  })
  maxFileSize: string = "1000000";
  files: any;
  fileName!: string;
  imageSrc: any;
  displayPic: boolean = false;
  studentData: any;
  studentAge!: number;
  candidateData!: Candidate;
  candidateId!: number;
  displayModal: boolean = false;
  constructor(private auth: AuthService,
    private router: Router,
    private clientService: ClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    const url = this.router.url.split('/').at(-1);
    this.candidateId = parseInt(url!);
    this.clientService.getCandidateById(this.candidateId).subscribe(res=>{
      this.candidateData = res      
    })
    this.clientService.getStudentById(this.auth.user.studentId).subscribe(res => {
      this.studentData = res;
      let dateSplit = this.studentData.birthday.toString().split('[UTC]');
      const brithDay = new Date(dateSplit[0]);
      const now = new Date();
      let oneYear = 1000 * 60 * 60 * 24;
      this.studentAge = Math.floor(((now.getTime() - brithDay.getTime()) / oneYear) / 365);
      this.studentData.birthday = brithDay;
    });
  }

  register() {
    this.confirmationService.confirm({
      header: 'ต้องการลงทะเบียนหรือไม่?',
      message: 'กรุณาตรวจสอบข้อมูลที่กรอก',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'ลงทะเบียน',
      rejectLabel: 'ยกเลิก',
      accept: () => {
        const now = new Date();
        const candiImage = this.studentData.studentCode + now.getTime().toString();

        let candiObj = {
          candiNo: this.regisForm.value.candidateNo,
          candiImage: `${candiImage}.png`,
          regisDate: now,
          candiExpList: [
            {
              position: this.regisForm.value.position1,
              years: new Date(this.regisForm.value.pYear1).getFullYear() + 543
            },
            {
              position: this.regisForm.value.position2,
              years: new Date(this.regisForm.value.pYear2).getFullYear() + 543
            },
            {
              position: this.regisForm.value.position3,
              years: new Date(this.regisForm.value.pYear3).getFullYear() + 543
            },
          ]
        }
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
    this.regisForm.reset();
  }

}
