import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-create-election-admin',
  templateUrl: './create-election-admin.component.html',
  styleUrls: ['./create-election-admin.component.scss']
})
export class CreateElectionAdminComponent implements OnInit {

  createForm: FormGroup = new FormGroup({
    elecName: new FormControl(null, [Validators.required,Validators.maxLength(50)]),
    elecDetail: new FormControl(null,[Validators.required,Validators.maxLength(100)]),
    elecStartdate: new FormControl(null),
    elecEnddate: new FormControl(null),
    elecRegisStartdate: new FormControl(null),
    elecRegisEnddate: new FormControl(null),
    elecImages: new FormControl(),
    elecRegister: new FormControl(false),
    elecOnVote: new FormControl(false),
  })
  startDate: any;
  endDate: Date = new Date();
  regisStartdate: any;
  regisEnddate: Date = new Date();
  files: any;
  imageSrc: any;
  getAddCandidate: boolean = false;
  displayModal: boolean = false;
  submited:boolean = false;
  wrongDate: boolean = false;
  wrongRegisDate: boolean = false;
  wrongRegisDatelessStart: boolean = false;
  constructor(private clientServie: ClientService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.startDate = new Date();
    this.regisStartdate = new Date();
  }

  selectImage(event: any) {
    this.files = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.files);
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
  }

  create() {
    this.submited = true;
    
    if(this.createForm.invalid) return;

    if (this.endDate < this.startDate) {
      this.wrongDate = true;
      return;
    }
    if (this.regisEnddate < this.regisStartdate) {
      this.wrongRegisDate = true;
      return;
    }
    if (this.regisEnddate > this.startDate) {
      this.wrongRegisDatelessStart = true;
      return;
    }

   

    this.createForm.value.elecStartdate = new Date(this.startDate);
    this.createForm.value.elecEnddate = new Date(this.endDate);
    this.createForm.value.elecRegisStartdate = new Date(this.regisStartdate);
    this.createForm.value.elecRegisEnddate = new Date(this.regisEnddate);
    this.createForm.value.elecImages = new Date().getTime().toString() + `.png`
    this.clientServie.createElection(this.createForm.value).subscribe({
      complete: () => {
        this.clientServie.checkElectionTime().subscribe();
        const formData = new FormData();
        formData.append('files', this.files)
        formData.append('fileName', this.createForm.value.elecImages);

        this.clientServie.uploadImageElection(formData).subscribe({
          complete:()=>{
            this.displayModal = true;
            setTimeout(() => {
              this.router.navigateByUrl('/blockchain-admin/homepage');
            }, 2000);
          },
          error:()=>{
            this.messageService.add({severity:'error', summary: 'สร้างการเลือกตั้งไม่สำเร็จ', detail: 'สร้างการเลือกตั้งไม่สำเร็จ'});
          }
        })
      },
      error: () => {
        this.messageService.add({severity:'error', summary: 'สร้างการเลือกตั้งไม่สำเร็จ', detail: 'สร้างการเลือกตั้งไม่สำเร็จ'});
      }
    })

  }
}
