import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-election',
  templateUrl: './edit-election.component.html',
  styleUrls: ['./edit-election.component.scss']
})
export class EditElectionComponent implements OnInit {
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
    this.router.navigateByUrl("/blockchain-admin/score");
  }

}
