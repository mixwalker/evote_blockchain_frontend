import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-reg-candidate',
  templateUrl: './reg-candidate.component.html',
  styleUrls: ['./reg-candidate.component.scss']
})
export class RegCandidateComponent implements OnInit {

  regisForm: FormGroup = new FormGroup({
    candidatePhone: new FormControl(),
    candidateNo: new FormControl(),
    candidateParty: new FormControl()
  })
  regisExpForm: FormGroup = new FormGroup({
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
  electionId!: number;
  displayModal: boolean = false;
  constructor(private auth: AuthService,
    private router: Router,
    private clientService: ClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    const url = this.router.url.split('/').at(-1);
    this.electionId = parseInt(url!);
    this.clientService.getElectionById(this.electionId).subscribe(res => {
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

        let pyear1;
        let pyear2;
        let pyear3;

        if(this.regisExpForm.value.pYear1 !== null){
          pyear1 = new Date(this.regisExpForm.value.pYear1).getFullYear().toString()
        }

        if(this.regisExpForm.value.pYear2 !== null){
          pyear2 = new Date(this.regisExpForm.value.pYear2).getFullYear().toString()
        }

        if(this.regisExpForm.value.pYear3 !== null){
          pyear3 = new Date(this.regisExpForm.value.pYear3).getFullYear().toString()
        }
        

        let candiObj = {
          candiNo: this.regisForm.value.candidateNo,
          candiPhone: this.regisForm.value.candidatePhone,
          candiImage: `${candiImage}.png`,
          regisDate: now,
          candiExpList: [
            {
              position: this.regisExpForm.value.position1,
              years: pyear1
            },
            {
              position: this.regisExpForm.value.position2,
              years: pyear2
            },
            {
              position: this.regisExpForm.value.position3,
              years: pyear3
            },
          ]
        }

        this.clientService.createCandidate(candiObj).subscribe({
          next: (res) => {
            const formData = new FormData();
            formData.append('files', this.files)
            formData.append('fileName', `${candiImage}.png`);
            this.clientService.uploadImageCandidate(formData).subscribe();

            let ElecWCandidate = {
              candidate: {
                candiId: res.candiId
              },
              election: {
                elecId: this.electionId
              }
            }

            this.clientService.createElecWCandidate(ElecWCandidate).subscribe({
              complete: () => {
                let stdBCandi = {
                  student: {
                    studentId: this.auth.user.studentId
                  },
                  candidate: {
                    candiId: res.candiId
                  }
                }
                this.clientService.createStdBeCandidate(stdBCandi).subscribe({
                  complete: () => {
                    this.displayModal = true;
                    setTimeout(() => {
                      this.router.navigateByUrl('/blockchain-evote/homepage');
                    }, 2000);
                  },
                  error: () => {
                    this.messageService.add({ severity: 'error', summary: 'การลงทะเบียนไม่สำเร็จ', detail: 'การลงทะเบียนของคุณไม่สำเร็จ' });
                  }
                });
              },
              error: () => {
                this.messageService.add({ severity: 'error', summary: 'การลงทะเบียนไม่สำเร็จ', detail: 'การลงทะเบียนของคุณไม่สำเร็จ' });
              }
            });

          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'การลงทะเบียนไม่สำเร็จ', detail: 'การลงทะเบียนของคุณไม่สำเร็จ' });
          }
        });
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
