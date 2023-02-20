import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-election',
  templateUrl: './manage-election.component.html',
  styleUrls: ['./manage-election.component.scss']
})
export class ManageElectionComponent implements OnInit {

  student:any = []
  getAddRemoveVoter:boolean = false;
  constructor(private router:Router) { }

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

  editElection(){
    this.router.navigate(['blockchain-admin','edit_election'])
  }
}
