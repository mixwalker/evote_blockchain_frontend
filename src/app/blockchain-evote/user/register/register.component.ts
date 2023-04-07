import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  student: any;
  items: any;
  election: any;
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

  ngOnInit(): void {
    this.clientService.getRegisByStudent(this.auth.user.studentId).subscribe({
      next: (res) => {
        this.election = res;
      },
      complete: () => {
        for (let electionList of this.election) {          
          const startDateSplit = electionList.election.elecRegisStartdate.split('[UTC]');
          const endDateSplit = electionList.election.elecRegisEnddate.split('[UTC]');
          electionList.election.elecRegisStartdate = startDateSplit[0];
          electionList.election.elecRegisEnddate = endDateSplit[0];
        }
      }
    });

  }

  goToRegister(id: string) {
    this.router.navigate(['blockchain-evote/register/', id])
  }

  defaultImage(event: Event) {
    return (event.target as HTMLImageElement).src = "./assets/img/icon/election_default.png";
  } 

}
