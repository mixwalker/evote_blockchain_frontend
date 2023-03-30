import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  studentData: any;
  displayModal: boolean = false;
  displayModalFail: boolean = false;
  selectPrefix: any[] = [];
  selectMajor: any[] = [];

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/').at(-1);
    const Id = parseInt(url!);

    this.selectPrefix = [
      { prefix: 'นาย' },
      { prefix: 'นางสาว' },
      { prefix: 'นาง' }
    ]

    this.selectMajor = [
      { major: 'คณิตศาสตร์' },
      { major: 'สถิติประยุกต์' },
      { major: 'วิทยาการคอมพิวเตอร์' },
      { major: 'เทคโนโลยีคอมพิวเตอร์' },
      { major: 'การวิเคราะห์และจัดการข้อมูลขนาดใหญ่' },
      { major: 'ภาควิชาเคมี' },
      { major: 'ชีววิทยา' },
      { major: 'ฟิสิกส์' },
      { major: 'วิทยาศาสตร์และการจัดการเทคโนโลยีอาหาร' },
    ]

    this.clientService.getStudentById(Id).subscribe(res => {
      this.studentData = res;
      this.studentData.prefix = { prefix: this.studentData.prefix };
      this.studentData.studentMajor = { major: this.studentData.studentMajor };
      let bDay = this.studentData.birthday.toString().split('[UTC]').at(0);
      this.studentData.birthday = new Date(bDay);
    })
  }

  edit() {
    this.studentData.prefix = this.studentData.prefix.prefix;
    this.studentData.studentMajor = this.studentData.studentMajor.major;

    this.clientService.editStudent(this.studentData).subscribe({
      complete: () => {
        this.displayModal = true;
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      },
      error: () => {
        this.displayModalFail = true;
        setTimeout(() => {
          this.displayModalFail = false;
        }, 1000)
      }
    })
  }

}
