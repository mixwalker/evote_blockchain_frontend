import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss']
})
export class VotingPageComponent implements OnInit {

  election:any;
  candidateList:any;
  constructor(private router:Router,private clientService:ClientService) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    const id = parseInt(url[url.length - 1]);

    this.clientService.getElectionById(id).subscribe(res =>{
      this.election = res;
    });

    this.clientService.getCandidateByElection(id).subscribe(res =>{
      this.candidateList = res;
      console.log(res);
      
    })
  }

  goToVotingScore(){
    this.router.navigateByUrl("/blockchain-evote/score");
  }
}
