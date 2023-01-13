import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-election-admin',
  templateUrl: './create-election-admin.component.html',
  styleUrls: ['./create-election-admin.component.scss']
})
export class CreateElectionAdminComponent implements OnInit {

  checked: boolean = true;
  getAddCandidate: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  addCandidate(){
    this.getAddCandidate = true;
  }

  unActivate(unActivate: boolean) {
    this.getAddCandidate = unActivate;
  }

}
