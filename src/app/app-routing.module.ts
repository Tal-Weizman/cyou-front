import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent,DialogOverviewExampleDialog } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {AuthenticationServiceService} from './authentication-service.service';
import { HttpClientModule  } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuardService } from './auth-guard.service';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminGuardService } from './admin-guard.service';
import {MatDividerModule} from '@angular/material/divider';
import { FileDropModule } from 'ngx-file-drop';
import { FileUploadModule } from 'ng2-file-upload';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NewUserDialogComponent } from './new-user-dialog/new-user-dialog.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { ImagesPageComponent } from './images-page/images-page.component';
import { SearchPipe } from './search.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddImageComponent } from './add-image/add-image.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PrevImageComponent } from './prev-image/prev-image.component';
import { PrevUserComponent } from './prev-user/prev-user.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PredefineComponent } from './predefine/predefine.component';
import { AddPredefineComponent } from './add-predefine/add-predefine.component';
import { ImageTableComponent } from './image-table/image-table.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { LightboxModule } from 'ngx-lightbox';

const routes: Routes = [
  //register page 
  //{ 
  //  path: 'register',
  //  component: RegisterPageComponent,
  //  data: { title: 'Heroes List' }
  //},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  { path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'admin',
  component: AdminPageComponent,
  canActivate: [AuthGuardService,AdminGuardService],
  children: [
    {
      path: 'users',
      component: UsersPageComponent,   
    },
    {
      path: 'adduser/:id',
      component: AddUserComponent,

    },
    {
      path: 'predefines',
      component: PredefineComponent,

    },
    {
      path: 'addpredefine/:id',
      component: AddPredefineComponent,

    },

    {
      path: 'user/:id',
      component: PrevUserComponent,

    },
    {
      path: 'user/:id/:from/:to',
      component: PrevUserComponent,

    },
    {
      path: 'images',
      component: ImagesPageComponent,
    },
    {
      path: 'addimage/:id',
      component: AddImageComponent,

    },
    {
      path: 'image/:id',
      component: PrevImageComponent,

    },

  ]
},
  {path:'pass-reset', component: ResetPasswordComponent},
  { path: '**', component: PageNotFoundComponent }, 

];

@NgModule({
  declarations: [   ImageTableComponent,AddPredefineComponent,AddImageComponent,
    AddUserComponent,
    PrevImageComponent,PredefineComponent,
    PrevUserComponent,SearchPipe,UsersPageComponent,ImagesPageComponent,NewUserDialogComponent,AdminPageComponent,NavbarComponent,ProfilePageComponent,RegisterPageComponent,DialogOverviewExampleDialog,LoginPageComponent,PageNotFoundComponent,HomeComponent,ResetPasswordComponent],
  imports: [LightboxModule,MatDatepickerModule, MatNativeDateModule ,MatBadgeModule,MatProgressSpinnerModule,MatTooltipModule,MatPaginatorModule,MatTableModule,MatSnackBarModule,ReactiveFormsModule,MatCheckboxModule,FileUploadModule,FileDropModule,MatDividerModule,FormsModule,MatExpansionModule,RouterModule.forRoot(routes),MatListModule,HttpClientModule,MatDialogModule,MatInputModule,MatToolbarModule,MatIconModule,MatCardModule,BrowserModule,MatButtonModule,MatMenuModule],
  exports: [RouterModule,SearchPipe],
  entryComponents: [NewUserDialogComponent,DialogOverviewExampleDialog],
  providers : [MatDatepickerModule,AuthenticationServiceService,AuthGuardService,AdminGuardService]

})
export class AppRoutingModule { }
