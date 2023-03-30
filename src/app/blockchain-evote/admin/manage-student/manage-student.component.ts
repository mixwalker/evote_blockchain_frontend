import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {

  allStudent:any;

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientService.getAllStudent().subscribe(res =>  this.allStudent = res);
  }

  addStudent(){
    this.router.navigate(['blockchain-admin','manage_student','adduser']);
  }

  editStudent(id:number){
    this.router.navigate(['blockchain-admin','manage_student','edituser',id]);
  }

  inputSearch(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }


}
