import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-blockchain-evote',
  templateUrl: './blockchain-evote.component.html',
  styleUrls: ['./blockchain-evote.component.scss']
})
export class BlockchainEvoteComponent implements OnInit {
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.countCandidate(0).subscribe();
  }
}
