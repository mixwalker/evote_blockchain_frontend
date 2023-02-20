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
    elecName: new FormControl(null, Validators.required),
    elecDetail: new FormControl(null, Validators.required),
    elecStartdate: new FormControl(null, Validators.required),
    elecEnddate: new FormControl(null, Validators.required),
    elecImages: new FormControl(),
    elecRegister: new FormControl(false),
  })
  startDate!: Date
  endDate!: Date
  files: any;
  imageSrc: any;
  getAddCandidate: boolean = false;
  displayModal:boolean = false;
  constructor(private clientServie: ClientService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
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
    console.log('hello');
    
    this.createForm.value.elecStartdate = new Date(this.startDate);
    this.createForm.value.elecEnddate = new Date(this.endDate);
    this.createForm.value.elecImages = new Date().getTime().toString() + `.png`
    this.clientServie.createElection(this.createForm.value).subscribe({
      complete: () => {
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
