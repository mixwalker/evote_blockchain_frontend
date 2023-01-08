import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss']
})
export class VotingPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToVotingScore(){
    this.router.navigateByUrl("/blockchain-evote/score");
  }
}
