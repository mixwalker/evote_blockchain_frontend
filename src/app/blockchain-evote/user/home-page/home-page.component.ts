import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  student: any;
  items: any;
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

  constructor(private clientService: ClientService,private router:Router) {
    console.log('test');
    console.log('test');
    
  }

  ngOnInit(): void {
    this.clientService.getAllStudent().subscribe(res => {
      this.student = res;
      console.log(this.student)
    })
  }

  goToVotePage(){
    this.router.navigateByUrl("/blockchain-evote/voting");
  }

}