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
    this.clientService.getElectionByRegisOn().subscribe(res => {
      this.election = res;
      console.log(res);
    })
  
  }

  goToRegister(id: string) {
    this.router.navigate(['blockchain-evote/register/', id])
  }


}
