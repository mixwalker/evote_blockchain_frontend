import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Election } from 'src/app/interface/Election';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-homepage-admin',
  templateUrl: './homepage-admin.component.html',
  styleUrls: ['./homepage-admin.component.scss']
})
export class HomepageAdminComponent implements OnInit {
  items: any;
  options: any;
  electionOnVoteList: any;
  activate: boolean = false;
  images: any[] = [
    {
      "previewImageSrc": "assets\\img\\RMUTT-menubar-logo.png",
      "thumbnailImageSrc": "assets\\img\\RMUTT-menubar-logo.png",
      "alt": "ระบบการเลือกตั้งสโมสรนักศึกษาด้วยเทคโนโลยีบล็อกเชนสำหรับคณะวิทยาศาสตร์และเทคโนโลยี",
      "title": "ระบบการเลือกตั้งสโมสรนักศึกษาด้วยเทคโนโลยีบล็อกเชน"
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
  }

  ngOnInit(): void {
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };

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


    this.clientService.getElectionOnVote().subscribe({
      next: (res) => {
        this.electionOnVoteList = res
      },
      complete: () => {
        for (let electionList of this.electionOnVoteList) {
          const startDateSplit = electionList.elecStartdate.split('[UTC]');
          const endDateSplit = electionList.elecEnddate.split('[UTC]');
          electionList.elecStartdate = startDateSplit[0];
          electionList.elecEnddate = endDateSplit[0];
        }
      }
    })


  }

  goToCreateElection() {
    this.router.navigateByUrl("/blockchain-admin/manage_election");
  }

  goToManageVoter() {
    this.router.navigateByUrl("/blockchain-admin/managevoter");
  }

  goToCandidatelist() {
    this.router.navigateByUrl("/blockchain-admin/candidatelist");
  }

  goToElectionDetail(id: number) {
    this.router.navigate(['blockchain-admin/election_detail/', id])
  }

  onActivate() {
    this.activate = true;
  }

  unActivate(unActivate: boolean) {
    this.activate = unActivate;
    window.location.reload();
  }

  defaultImage(event: Event) {
    return (event.target as HTMLImageElement).src = "./assets/img/election_default.png";
  }

}
