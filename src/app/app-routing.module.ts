import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockchainEvoteComponent } from './blockchain-evote/blockchain-evote.component';
import { HomePageComponent } from './blockchain-evote/user/home-page/home-page.component';
import { LogInComponent } from './blockchain-evote/log-in/log-in.component';
import { RegMemclubComponent } from './blockchain-evote/user/register/reg-memclub/reg-memclub.component';
import { RegMemconcilComponent } from './blockchain-evote/user/register/reg-memconcil/reg-memconcil.component';
import { RegPresidentComponent } from './blockchain-evote/user/register/reg-president/reg-president.component';
import { RegisStatusComponent } from './blockchain-evote/user/regis-status/regis-status.component';
import { VotingPageComponent } from './blockchain-evote/user/voting-page/voting-page.component';
import { VotingScoreComponent } from './blockchain-evote/user/voting-score/voting-score.component';
import { HomepageAdminComponent } from './blockchain-evote/admin/homepage-admin/homepage-admin.component';
import { VotingscoreAdminComponent } from './blockchain-evote/admin/votingscore-admin/votingscore-admin.component';
import { CreateElectionAdminComponent } from './blockchain-evote/admin/create-election-admin/create-election-admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'blockchain-evote/login', pathMatch: 'full' },
  {
    path: 'blockchain-evote/login',
    component: LogInComponent
  },
  {
    path: 'blockchain-evote',
    component: BlockchainEvoteComponent,
    children: [
      {
        path: 'homepage',
        component: HomePageComponent
      },
      {
        path: 'reg_president',
        component: RegPresidentComponent
      },
      {
        path: 'reg_memclub',
        component: RegMemclubComponent
      },
      {
        path: 'reg_memconcil',
        component: RegMemconcilComponent
      },
      {
        path: 'reg_status',
        component: RegisStatusComponent
      },
      {
        path: 'voting',
        component: VotingPageComponent
      },
      {
        path: 'score',
        component: VotingScoreComponent
      },
      {
        path: 'homepage_admin',
        component: HomepageAdminComponent
      },
      {
        path: 'score_admin',
        component: VotingscoreAdminComponent
      },
      {
        path: 'create_election',
        component: CreateElectionAdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
