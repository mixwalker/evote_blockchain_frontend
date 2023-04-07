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
  candidateList: any[] = [];
  images: any[] = [
    {
      "previewImageSrc": "assets\\img\\RMUTT-menubar-logo.png",
      "thumbnailImageSrc": "assets\\img\\RMUTT-menubar-logo.png",
      "alt": "ระบบการเลือกตั้งสโมสรนักศึกษาด้วยเทคโนโลยีบล็อกเชนสำหรับคณะวิทยาศาสตร์และเทคโนโลยี",
      "title": "ระบบการเลือกตั้งสโมสรนักศึกษาด้วยเทคโนโลยีบล็อกเชน"
    },
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
    this.clientService.getElecOnVoteByStudent(this.auth.user.studentId).subscribe({
      next: (res) => {
        this.election = res;
      },
      complete: () => {
        for (let electionList of this.election) {
          const startDateSplit = electionList.election.elecStartdate.split('[UTC]');
          const endDateSplit = electionList.election.elecEnddate.split('[UTC]');
          electionList.election.elecStartdate = startDateSplit[0];
          electionList.election.elecEnddate = endDateSplit[0];
        }
      }
    });

    this.clientService.getStatusOnAnnoucementList().subscribe(res => {
      res.map((items: any) => {
        let imageData = {
          previewImageSrc: `api/annoucement/image/${items.announcementImage}`,
          thumbnailImageSrc: `api/annoucement/image/${items.announcementImage}`,
          alt: items.announcementDetail,
          title: items.announcementTitle
        }
        this.images.push(imageData)
      });
    });
  }

  goToElectionById(id: string) {
    this.router.navigate(['blockchain-evote/voting/', id])
  }

  
  defaultImage(event: Event) {
    return (event.target as HTMLImageElement).src = "./assets/img/election_default.png";
  }

}
