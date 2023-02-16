import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  student: any;
  items: any;
  election: any;
  candidateList:any[] = [];
  images: any[] = [
    {
      "previewImageSrc": "assets\\img\\homepage_img.png",
      "thumbnailImageSrc": "assets\\img\\homepage_img.png",
      "alt": "Description for Image 1",
      "title": "Title 1"
    },
    {
      "previewImageSrc": "assets\\img\\RMUTT-menubar-logo.png",
      "thumbnailImageSrc": "assets\\img\\RMUTT-menubar-logo.png",
      "alt": "Description for Image 1",
      "title": "Title 1"
    },
    {
      "previewImageSrc": "assets\\img\\homepage_img.png",
      "thumbnailImageSrc": "assets\\img\\homepage_img.png",
      "alt": "Description for Image 1",
      "title": "Title 1"
    }
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private clientService: ClientService, private router: Router, private auth: AuthService) {

  }

  async ngOnInit(): Promise<void> {
    this.clientService.getElecByStudent(this.auth.user.studentId).subscribe({
      next: (res) => {
        this.election = res;
      },
       complete: async () =>{
        for(let electionList of this.election){
          const startDateSplit = electionList.election.elecStartdate.split('[UTC]');
          const endDateSplit = electionList.election.elecEnddate.split('[UTC]');
          electionList.election.elecStartdate = startDateSplit[0];
          electionList.election.elecEnddate = endDateSplit[0];
        }
        const elecIdArr = this.election.map((list:any) => list.election).map((data:any)=>data.elecId)
        elecIdArr.forEach(async (item:any) =>{
          const candidate = await lastValueFrom(this.clientService.getCandidateByElection(item));
          await this.candidateList.push(candidate.length)
        })
        console.log(this.candidateList);
        
        
        
      }
    })
  }

  goToElectionById(id: string) {
    this.router.navigate(['blockchain-evote/voting/', id])  
  }

}
