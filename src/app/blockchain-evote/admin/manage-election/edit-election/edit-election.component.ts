import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-edit-election',
  templateUrl: './edit-election.component.html',
  styleUrls: ['./edit-election.component.scss']
})
export class EditElectionComponent implements OnInit {
  election: any;
  checked: boolean = true;
  getAddCandidate: boolean = false;
  constructor(private router: Router, private clientSerivce: ClientService) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    const id = parseInt(url[url.length - 1]);

    this.clientSerivce.getElectionById(id).subscribe({
      next: (res) => {
        this.election = res;
      },
      complete: () => {
        const startDateSplit = this.election.elecStartdate.split('[UTC]');
        const endDateSplit = this.election.elecEnddate.split('[UTC]');
        this.election.elecStartdate = new Date(startDateSplit[0]);
        this.election.elecEnddate = new Date(endDateSplit[0]);
      }
    });
  }

  addCandidate() {
    this.getAddCandidate = true;
  }

  unActivate(unActivate: boolean) {
    this.getAddCandidate = unActivate;
  }

  goToVotingScore() {
    this.router.navigateByUrl("/blockchain-admin/score");
  }

}
