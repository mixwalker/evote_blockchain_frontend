import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  @Output() unBlock = new EventEmitter;
  @Output() refreshAndMessage = new EventEmitter;
  blockedImport: boolean = true;
  annoucementListAll: any = []
  activate: boolean = false;
  constructor(
    private clientService: ClientService,
    private router: Router,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.clientService.getAllAnnoucementList().subscribe(res => this.annoucementListAll = res);
  }

  closeImport() {
    this.blockedImport = false;
    this.unBlock.emit(this.blockedImport)
  }

  onOff(event:any,id:number){
    console.log(event.checked);
    
    this.clientService.setStatusAnnoucement(id,event.checked).subscribe({
      complete:()=>{
        this.messageService.add({severity:'success', summary:'ปรับสถานะสำเร็จ', detail:'ปรับสถานะเรียบร้อย'});
      },
      error:()=>{
        this.messageService.add({severity:'error', summary:'ปรับสถานะไม่สำเร็จ', detail:'ไม่สามารถปรับสถานะได้'});
      }
    })
  }

  deleteAnnoucement(id:number,index:number){
    this.clientService.deleteAnnoucement(id).subscribe({
      complete:()=>{
        this.annoucementListAll.splice(index,1);
        this.messageService.add({severity:'success', summary:'ลบประกาศสำเร็จ', detail:'ลบประกาศข่าวสารสำเร็จ'});
      },
      error:()=>{
        this.messageService.add({severity:'error', summary:'ลบประกาศสำเร็จ', detail:'ลบประกาศข่าวสารสำเร็จ'});
      }
    })
  }

  onActivate() {
    this.activate = true;
  }

  unActivate(unActivate: boolean) {
    this.activate = unActivate;
  }

}
