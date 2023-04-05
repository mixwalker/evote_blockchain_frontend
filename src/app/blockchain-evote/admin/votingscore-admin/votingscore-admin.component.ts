import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockChain } from 'src/app/interface/Blockchain';
import { BlockchainApiService } from 'src/app/service/blockchain-api.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-votingscore-admin',
  templateUrl: './votingscore-admin.component.html',
  styleUrls: ['./votingscore-admin.component.scss']
})
export class VotingscoreAdminComponent implements OnInit {

  options: any;
  chartData: any;
  blockchain!: any;
  election: any;
  candidateList: any;
  blockchainSort!: any;
  constructor(private router: Router,
    private clientService: ClientService,
    private blockchainService: BlockchainApiService) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    const id = parseInt(url[url.length - 1]);
    const elecId = { elecId: id }

    this.clientService.getElectionById(id).subscribe(res => {
      this.election = res
    });

    const candidateNameArr: any[] = [];
    const candidateIdArr: any[] = [];
    this.clientService.getCandidateApprove(id).subscribe({
      next: (res) => {
        res.map((res: any) => {
          const name = `${res.student.prefix}${res.student.firstName} ${res.student.lastName}`
          candidateNameArr.push(name);
          candidateIdArr.push(res.candidate.candiId)
        })

      },
      complete: () => {
        this.blockchainService.getChainSort(elecId).subscribe({
          next: (res) => {
            this.blockchainSort = res
          },
          complete: () => {
            const dataArr: any[] = []
            this.blockchainSort.chain.map((items: any) => {
              if (items.data) {
                dataArr.push(items.data.candidate.candiId);
              }
            });

            let scoreList = dataArr.reduce((count, item) => (count[item] = count[item] + 1 || 1, count), {});

            console.log(scoreList);
            console.log(candidateIdArr);

            


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
            
            let dataInDataset = [];

            for (let name of candidateNameArr) {
              this.chartData.labels.push(name)
              dataInDataset.push(0);
            }

            Object.keys(scoreList).map(id => {
              const index = candidateIdArr.findIndex(i => i == id);
              dataInDataset[index] = scoreList[id];
            });
            this.chartData.datasets[0].data = dataInDataset;
            console.log(this.chartData);

          }
        })
      }
    });

    this.blockchainService.getChain(elecId).subscribe(res => {
      this.blockchain = res
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
