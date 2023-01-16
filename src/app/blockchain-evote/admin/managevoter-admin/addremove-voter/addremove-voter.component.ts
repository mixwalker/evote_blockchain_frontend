import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-addremove-voter',
  templateUrl: './addremove-voter.component.html',
  styleUrls: ['./addremove-voter.component.scss']
})
export class AddremoveVoterComponent implements OnInit {

  student:any = []
  blocked: boolean = true;
  @Output() unBlock = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

  inputSearch(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }

  close() {
    this.blocked = false;
    this.unBlock.emit(this.blocked)

  }
}
