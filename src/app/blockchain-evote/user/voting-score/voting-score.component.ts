import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockChain } from 'src/app/interface/blockchain';
import { Election } from 'src/app/interface/Election';
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
  chartData: any;
  blockchain!: BlockChain;
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

    const elecId = { elecId: id }
    this.blockchainService.getChain(elecId).subscribe({
      next: (res) => {
        this.blockchain = res
      },
      complete: () => {
        this.chartData = {
          labels: [],
          datasets: [
            {
              data: [],
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

        let candidateNameArr: any[] = [];
        for (let chain of this.blockchain.chain) {
          if (chain.data) {
            candidateNameArr.push(chain.data.candidate.candiName)
          }
        }

        const candidateNameList = candidateNameArr.filter((name, index) => {
          return index === candidateNameArr.findIndex(indexname => name === indexname);
        });

        const tempCandidateScoreList = candidateNameArr.map(name => {
          const IsDuplicate = candidateNameArr.findIndex(indexname => name === indexname)
          return IsDuplicate;
        });

        let candidateScoreList: any[] = [];
        tempCandidateScoreList.forEach(item => {
          candidateScoreList[item] = (candidateScoreList[item] || 0) + 1;
        })

        candidateNameList.forEach(name => {
          this.chartData.labels.push(name);
        })

        candidateScoreList.forEach(score => {
          this.chartData.datasets[0].data.push(score)
        })

      }
    })
    this.applyOption();
    this.applyDarkTheme();
  }

  applyOption() {
    this.options = {
      plugins: {
        legend: {
          display: false,
          position: 'bottom'
        }
      },
      scales: {
        y: [{
          ticks: {
            stepSize: 1,
            beginAtZero: true
          }
        }]
      }
    };
  }

  applyDarkTheme() {
    this.options = {
      plugins: {
        legend: {
           display: false,
          labels: {
            color: '#ebedef'
          }
        }
      },
      scales: {
        y: {
          ticks: {
            stepSize: 1,
          },
        }
      }
    };
  }

}
