import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

// route import 
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 

// environment 
import { HttpClientModule } from '@angular/common/http';

// toaster
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'; 

// Authentication guard
import { AuthGuard } from './auth.guard'; 

// for search filter 
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 

// spinner 
import { NgxSpinnerModule } from "ngx-spinner";   

// ngx permissions | user role 
import { NgxPermissionsModule } from 'ngx-permissions'; 

// admin component
import { AdminComponent } from './admin/admin.component'; 

// print report 
import { NgxPrintModule } from 'ngx-print';

import {NgxPaginationModule} from 'ngx-pagination';
import { NotesComponent } from './notes/notes.component'; // <-- import the module
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';


// app.module.ts
import { ChartModule } from 'angular-highcharts';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { ChangePasswordRequestComponent } from './change-password-request/change-password-request.component';



const routes:Routes = [
  {
    //index page and will be guarded on the user  
    path:'', 
    component:HomeComponent,
    canActivate: [AuthGuard]
  }, 
  { 
    
    //registration page
   path: 'register' , 
   component:RegisterComponent  
  }, 
  {
    //login page 
    path: 'login' , 
    component:LoginComponent  
   } ,  
   //request password reset 
   {
    path:'request-password-reset',
    component:RequestPasswordResetComponent
   },  

  //  change password link 
  {
 path:'change-password', 
 component:ChangePasswordRequestComponent
  }, 

  // admin page and Guarded
  {
    path: 'admin',
    component:AdminComponent,
    canActivate:[AuthGuard], 
    
    children:[
      { 
      // make this as an index for admin
      path:'',
      component:DashboardComponent
    }, 
    {
     path: 'notes',
      component:NotesComponent, 
    }
    ,
    {
      path:'users',
      component:UsersComponent
    }
    ,
  
  ]
  }, 

 
   //fetch data page
  //  {
  //   // path: '/personal_id',
  //   // component:HomeComponent
  //  }

  // {
  //   path: 'admin/notes',
  //   component:NotesComponent, 
  // }
  // ,
  // {
  //   path:'admin/users',
  //   component:UsersComponent
  // }
  // ,
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    NotesComponent,UsersComponent, DashboardComponent, RequestPasswordResetComponent, ChangePasswordRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    //register routes here 
    RouterModule.forRoot(routes), 
    ReactiveFormsModule,
    FormsModule, 
    
    HttpClientModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot() ,
    
    //import filtration 
    Ng2SearchPipeModule , 

    NgxSpinnerModule, 

    NgxPermissionsModule.forRoot(), 
    
    NgxPaginationModule, 

    

    //highchart
    ChartModule, 

    //print pdf 
    NgxPrintModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
