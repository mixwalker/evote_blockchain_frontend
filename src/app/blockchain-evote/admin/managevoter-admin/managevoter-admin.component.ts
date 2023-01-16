import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managevoter-admin',
  templateUrl: './managevoter-admin.component.html',
  styleUrls: ['./managevoter-admin.component.scss']
})
export class ManagevoterAdminComponent implements OnInit {
  student:any = []
  getAddRemoveVoter:boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.student = [{
      studentId: '116210905001-0',
      name: 'สรวิชญ์ เจียวก๊ก',
      faculty: 'วิทยาศาสตร์'
    }]
  }

  inputSearch(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }

  addRemoveVoter(){
    this.getAddRemoveVoter = true
  }

  unActivate(unActivate: boolean) {
    this.getAddRemoveVoter = unActivate;
  }
}
