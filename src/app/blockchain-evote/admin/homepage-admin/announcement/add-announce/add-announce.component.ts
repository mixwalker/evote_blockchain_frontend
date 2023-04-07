import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-add-announce',
  templateUrl: './add-announce.component.html',
  styleUrls: ['./add-announce.component.scss']
})
export class AddAnnounceComponent implements OnInit {

  @Output() unBlock = new EventEmitter;
  blockedImport: boolean = true;
  announceForm: FormGroup = new FormGroup({
    announcementTitle: new FormControl(),
    announcementDetail: new FormControl(),
    announcementImage: new FormControl()
  })
  imageSrc: any;
  displayPic: boolean = false;
  files: any;
  fileName!: string;
  constructor(
    private clientServie: ClientService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  closeAdd() {
    this.blockedImport = false;
    this.unBlock.emit(this.blockedImport)
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

  addAnnounce() {
    this.announceForm.value.announcementImage = new Date().getTime().toString() + `.png`
    this.clientServie.createAnnounce(this.announceForm.value).subscribe({
      complete: () => {
        const formData = new FormData();
        formData.append('files', this.files)
        formData.append('fileName', this.announceForm.value.announcementImage);
        this.clientServie.uploadImageAnnounce(formData).subscribe({
          complete: () => {
            this.messageService.add({ severity: 'success', summary: 'สร้างข่าวสารสำเร็จ', detail: 'สร้างข่าวสารสำเร็จเรียบร้อยแล้ว' });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'สร้างข่าวสารไม่สำเร็จ', detail: 'ไม่สามารถสร้างข่าวสารได้' });
          }
        })
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'สร้างข่าวสารไม่สำเร็จ', detail: 'ไม่สามารถสร้างข่าวสารได้' });
      }
    })
  }
}
