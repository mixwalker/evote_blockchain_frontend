import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { BlockchainEvoteComponent } from './blockchain-evote/blockchain-evote.component';
import { LogInComponent } from './blockchain-evote/log-in/log-in.component';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { HomePageComponent } from './blockchain-evote/user/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MenuBarComponent } from './blockchain-evote/menu-bar/menu-bar.component';
import { GalleriaModule } from 'primeng/galleria';
import { FooterComponent } from './blockchain-evote/footer/footer.component';
import { MenuModule } from 'primeng/menu';
import { RegPresidentComponent } from './blockchain-evote/user/register/reg-president/reg-president.component';
import { RegMemclubComponent } from './blockchain-evote/user/register/reg-memclub/reg-memclub.component';
import { RegMemconcilComponent } from './blockchain-evote/user/register/reg-memconcil/reg-memconcil.component';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { RegisStatusComponent } from './blockchain-evote/user/regis-status/regis-status.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { VotingPageComponent } from './blockchain-evote/user/voting-page/voting-page.component';
import { VotingScoreComponent } from './blockchain-evote/user/voting-score/voting-score.component';
import { ChartModule } from 'primeng/chart';
import { HomepageAdminComponent } from './blockchain-evote/admin/homepage-admin/homepage-admin.component';
import { VotingscoreAdminComponent } from './blockchain-evote/admin/votingscore-admin/votingscore-admin.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CreateElectionAdminComponent } from './blockchain-evote/admin/create-election-admin/create-election-admin.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AddCandidateComponent } from './blockchain-evote/admin/create-election-admin/add-candidate/add-candidate.component';
import { BlockUIModule } from 'primeng/blockui';

@NgModule({
  declarations: [
    AppComponent,
    BlockchainEvoteComponent,
    LogInComponent,
    HomePageComponent,
    MenuBarComponent,
    FooterComponent,
    RegPresidentComponent,
    RegMemclubComponent,
    RegMemconcilComponent,
    RegisStatusComponent,
    VotingPageComponent,
    VotingScoreComponent,
    HomepageAdminComponent,
    VotingscoreAdminComponent,
    CreateElectionAdminComponent,
    AddCandidateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    ToastModule,
    InputTextModule,
    MenubarModule,
    HttpClientModule,
    GalleriaModule,
    MenuModule,
    PanelModule,
    CalendarModule,
    TableModule,
    FileUploadModule,
    ButtonModule,
    SplitButtonModule,
    ChartModule,
    InputTextareaModule,
    InputSwitchModule,
    BlockUIModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
