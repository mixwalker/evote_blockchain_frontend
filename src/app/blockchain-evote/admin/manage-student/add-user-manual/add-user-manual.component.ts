import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-add-user-manual',
  templateUrl: './add-user-manual.component.html',
  styleUrls: ['./add-user-manual.component.scss']
})
export class AddUserManualComponent implements OnInit {

  prefix: any[] = [];
  Major: any[] = [];
  selectPrefix: any[] = [];
  selectMajor: any[] = [];
  displayModal: boolean = false;
  displayModalFail: boolean = false;
  faculty: string = "วิทยาศาสตร์และเทคโนโลยี";

  studentDataForm: FormGroup = new FormGroup({
    birthday: new FormControl(),
    email: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    nationality: new FormControl(),
    password: new FormControl(),
    phoneNo: new FormControl(),
    prefix: new FormControl(),
    religion: new FormControl(),
    role: new FormControl('student'),
    studentClassyear: new FormControl(),
    studentCode: new FormControl(),
    studentFaculty: new FormControl('วิทยาศาสตร์และเทคโนโลยี'),
    studentGpa: new FormControl(),
    studentMajor: new FormControl(),
    studentRegisYear: new FormControl()
  });

  studentAddressForm: FormGroup = new FormGroup({
    addDistrict: new FormControl(),
    addHouse: new FormControl(),
    addOriprovince: new FormControl(),
    addPostCode: new FormControl(),
    addProvince: new FormControl(),
    addStreet: new FormControl(),
    addSubDis: new FormControl(),
    addVillage: new FormControl()
  });

  constructor(
    private router: Router,
    private clientService: ClientService
  ) {
    this.prefix = [
      { prefix: 'นาย' },
      { prefix: 'นางสาว' },
      { prefix: 'นาง' }
    ]

    this.Major = [
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
  }

  ngOnInit(): void {
  }

  addStudent() {
    this.studentDataForm.value.prefix = this.studentDataForm.value.prefix.prefix;
    this.studentDataForm.value.studentMajor = this.studentDataForm.value.studentMajor.major;
    this.studentDataForm.value.studentAddress = this.studentAddressForm.value
    
    this.clientService.addStudent(this.studentDataForm.value).subscribe({
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
