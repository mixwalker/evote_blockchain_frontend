import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-reg-candidate',
  templateUrl: './reg-candidate.component.html',
  styleUrls: ['./reg-candidate.component.scss']
})
export class RegCandidateComponent implements OnInit {

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
  studentAge!: Number;
  constructor(private auth: AuthService, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    const url = this.router.url.split('/').at(-1);
    const id = parseInt(url!);
    this.clientService.getElectionById(id).subscribe(res=>{
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
    const now = new Date();
    const candiImage = this.studentData.studentCode + now.getTime().toString();
    
    
    let candiObj = {
      candiNo: this.regisForm.value.candidateNo,
      candiImage: candiImage,
      regisDate: now,
      candiExpList: [
        {
          position:  this.regisForm.value.position1,
          years: new Date( this.regisForm.value.pYear1).getFullYear() + 543
        },
        {
          position:  this.regisForm.value.position2,
          years: new Date( this.regisForm.value.pYear2).getFullYear() + 543
        },
        {
          position:  this.regisForm.value.position3,
          years: new Date( this.regisForm.value.pYear3).getFullYear() + 543
        },
      ]
    }
    this.clientService.createCandidate(candiObj).subscribe({
      next: (res) => {
        const formData = new FormData();
        formData.append('files', this.files)
        formData.append('fileName', `${candiImage}.png`);
        this.clientService.uploadImageCandidate(formData).subscribe();
      },
      complete:()=>{
        
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

  refresh(event:any) {
    event.clear();
    this.files = null;
    this.imageSrc = null;
    this.displayPic = false;
    this.regisForm.reset();
  }
}
