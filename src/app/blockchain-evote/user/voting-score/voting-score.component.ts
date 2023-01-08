import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voting-score',
  templateUrl: './voting-score.component.html',
  styleUrls: ['./voting-score.component.scss']
})
export class VotingScoreComponent implements OnInit {

  options:any;
  data: any;
  constructor() { }

  ngOnInit(): void {
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
