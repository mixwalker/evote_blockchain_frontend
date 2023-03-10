import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockchainEvoteComponent } from './blockchain-evote/blockchain-evote.component';
import { HomePageComponent } from './blockchain-evote/user/home-page/home-page.component';
import { LogInComponent } from './blockchain-evote/auth/log-in/log-in.component';
import { RegMemclubComponent } from './blockchain-evote/user/register/reg-memclub/reg-memclub.component';
import { RegCandidateComponent } from './blockchain-evote/user/register/reg-candidate/reg-candidate.component';
import { RegisStatusComponent } from './blockchain-evote/user/regis-status/regis-status.component';
import { VotingPageComponent } from './blockchain-evote/user/voting-page/voting-page.component';
import { VotingScoreComponent } from './blockchain-evote/user/voting-score/voting-score.component';
import { HomepageAdminComponent } from './blockchain-evote/admin/homepage-admin/homepage-admin.component';
import { VotingscoreAdminComponent } from './blockchain-evote/admin/votingscore-admin/votingscore-admin.component';
import { CreateElectionAdminComponent } from './blockchain-evote/admin/create-election-admin/create-election-admin.component';
import { ManagevoterAdminComponent } from './blockchain-evote/admin/managevoter-admin/managevoter-admin.component';
import { CandidatelistAdminComponent } from './blockchain-evote/admin/candidatelist-admin/candidatelist-admin.component';
import { HasLoginGuard } from './blockchain-evote/guard/has-login.guard';
import { HasAdminloginGuard } from './blockchain-evote/guard/has-adminlogin.guard';
import { RegisterComponent } from './blockchain-evote/user/register/register.component';
import { EditRegisterComponent } from './blockchain-evote/user/regis-status/edit-register/edit-register.component';
import { EditElectionComponent } from './blockchain-evote/admin/manage-election/edit-election/edit-election.component';
import { ManageElectionComponent } from './blockchain-evote/admin/manage-election/manage-election.component';
import { ElectionDetailOnvoteComponent } from './blockchain-evote/admin/homepage-admin/election-detail-onvote/election-detail-onvote.component';

const routes: Routes = [
  { path: '', redirectTo: 'blockchain-evote/login', pathMatch: 'full' },
  {
    path: 'blockchain-evote/login',
    component: LogInComponent
  },
  {
    path: 'blockchain-evote',
    component: BlockchainEvoteComponent,
    canActivate:[HasLoginGuard],
    data:{
      role: 'student'
    },
    children: [
      {
        path: 'homepage',
        component: HomePageComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'register/:id',
        component: RegCandidateComponent
      },
      {
        path: 'edit_register/:id',
        component: EditRegisterComponent
      },
      {
        path: 'reg_memclub',
        component: RegMemclubComponent
      },
      {
        path: 'reg_status',
        component: RegisStatusComponent
      },
      {
        path: 'voting/:id',
        component: VotingPageComponent
      },
      {
        path: 'score/:id',
        component: VotingScoreComponent
      },
    ]
  },{
    path: 'blockchain-admin',
    component: BlockchainEvoteComponent,
    canActivate:[HasLoginGuard,HasAdminloginGuard],
    data: {
      role: 'admin'
    },
    children: [
      {
        path: 'homepage',
        component: HomepageAdminComponent
      },
      {
        path: 'score/:id',
        component: VotingscoreAdminComponent
      },
      {
        path: 'create_election',
        component: CreateElectionAdminComponent
      },
      {
        path: 'election_detail/:id',
        component: ElectionDetailOnvoteComponent
      },
      {
        path: 'managevoter',
        component: ManagevoterAdminComponent
      },
      {
        path: 'manage_election',
        component: ManageElectionComponent
      },
      {
        path: 'candidatelist',
        component: CandidatelistAdminComponent
      },
      {
        path: 'edit_election/:id',
        component: EditElectionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
