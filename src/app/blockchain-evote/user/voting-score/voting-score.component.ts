import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Election } from 'src/app/interface/electionAndStudent';
import { BlockchainApiService } from 'src/app/service/blockchain-api.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-voting-score',
  templateUrl: './voting-score.component.html',
  styleUrls: ['./voting-score.component.scss']
})
export class VotingScoreComponent implements OnInit {

  election!: Election;
  options: any;
  data: any;
  constructor(private router: Router,
    private clientService: ClientService,
    private blockchainService: BlockchainApiService,
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    const id = parseInt(url[url.length - 1]);
    this.clientService.getElectionById(id).subscribe(res => {
      this.election = res
    });

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D"
          ]
        }
      ]
    }

    this.options = {
      plugins: {
        title: {
          display: true,
          // text: 'My Title',
          // fontSize: 
        },
        legend: {
          position: 'bottom'
        }
      }
    };
  }

}
