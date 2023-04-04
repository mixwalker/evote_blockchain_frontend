import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {

  allStudent: any;
  displayModal: boolean = false;
  displayModalFail: boolean = false;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.clientService.getAllStudent().subscribe(res => this.allStudent = res);
  }

  addStudent() {
    this.router.navigate(['blockchain-admin', 'manage_student', 'adduser']);
  }

  editStudent(id: number) {
    this.router.navigate(['blockchain-admin', 'manage_student', 'edituser', id]);
  }

  deleteStudent(id: number,index:number) {
    this.clientService.deleteStudentById(id).subscribe({
      complete:()=>{
        this.allStudent.splice(index,1)
        this.displayModal = true;
        setTimeout(() => {
          this.displayModal = false;
        }, 1000);
      },
      error:()=>{
        this.displayModalFail = true;
        setTimeout(() => {
          this.displayModalFail = false;
        }, 1000);
      }
    })
  }

  inputSearch(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }


}
