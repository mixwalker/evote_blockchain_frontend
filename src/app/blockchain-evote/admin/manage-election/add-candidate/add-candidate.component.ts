import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {
  student:any = []
  blocked: boolean = true;
  @Output() unBlock = new EventEmitter;
  constructor() { }
  
  ngOnInit(): void {
    this.student = [{
      studentId: '116210905001-0',
      name: 'สรวิชญ์ เจียวก๊ก',
      faculty: 'วิทยาศาสตร์'
    }]
  }

  inputSearch(inputEL: any, event: any) {
    inputEL.filterGlobal(event.target.value, 'contains')
  }

  close() {
    this.blocked = false;
    this.unBlock.emit(this.blocked)

  }
}
