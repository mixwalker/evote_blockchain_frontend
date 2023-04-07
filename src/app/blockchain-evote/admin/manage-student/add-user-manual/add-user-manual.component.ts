import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  submited:boolean = false;

  studentDataForm: FormGroup = new FormGroup({
    birthday: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    nationality: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required,Validators.minLength(6)]),
    phoneNo: new FormControl(null, [Validators.required]),
    prefix: new FormControl(null, [Validators.required]),
    religion: new FormControl(null, [Validators.required]),
    role: new FormControl('student'),
    studentClassyear: new FormControl(null, [Validators.required]),
    studentCode: new FormControl(null, [Validators.required]),
    studentFaculty: new FormControl('วิทยาศาสตร์และเทคโนโลยี'),
    studentGpa: new FormControl(null, [Validators.required]),
    studentMajor: new FormControl(null, [Validators.required]),
    studentRegisYear: new FormControl(null, [Validators.required]),
  });

  studentAddressForm: FormGroup = new FormGroup({
    addDistrict: new FormControl(null, [Validators.required]),
    addHouse: new FormControl(),
    addOriprovince: new FormControl(null, [Validators.required]),
    addPostCode: new FormControl(null, [Validators.required]),
    addProvince: new FormControl(null, [Validators.required]),
    addStreet: new FormControl(),
    addSubDis: new FormControl(null, [Validators.required]),
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
    this.submited = true;

    if(this.studentDataForm.invalid) return;
    
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
