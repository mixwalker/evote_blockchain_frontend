import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-election-admin',
  templateUrl: './create-election-admin.component.html',
  styleUrls: ['./create-election-admin.component.scss']
})
export class CreateElectionAdminComponent implements OnInit {

  files:any;
  checked: boolean = true;
  imageSrc:any;
  getAddCandidate: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  selectImage(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    console.log(event);
    
  }

}
