import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-election-admin',
  templateUrl: './manage-election-admin.component.html',
  styleUrls: ['./manage-election-admin.component.scss']
})
export class ManageElectionAdminComponent implements OnInit {
  checked: boolean = true;
  getAddCandidate: boolean = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  addCandidate(){
    this.getAddCandidate = true;
  }

  unActivate(unActivate: boolean) {
    this.getAddCandidate = unActivate;
  }

  goToVotingScore(){
    this.router.navigateByUrl("/blockchain-admin/score_admin");

  }
}
