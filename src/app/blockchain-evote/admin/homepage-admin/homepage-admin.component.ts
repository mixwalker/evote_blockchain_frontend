import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-homepage-admin',
  templateUrl: './homepage-admin.component.html',
  styleUrls: ['./homepage-admin.component.scss']
})
export class HomepageAdminComponent implements OnInit {
  student: any;
  items: any;
  options:any;
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

  constructor(private clientService: ClientService, private router: Router) {
    console.log('test');
    console.log('test');
  }

  ngOnInit(): void {
    this.clientService.getAllStudent().subscribe(res => {
      this.student = res;
      console.log(this.student)
    })

    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
  };
  }

  goToCreateElection() {
    this.router.navigateByUrl("/blockchain-evote/create_election");
  }

  goToManageVoter() {
    this.router.navigateByUrl("/blockchain-evote/managevoter");
  }

  goToCandidatelist() {
    this.router.navigateByUrl("/blockchain-evote/candidatelist");
  }
}
