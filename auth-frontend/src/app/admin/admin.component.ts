import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { NgxPermissionsService } from 'ngx-permissions';
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
}) 


export class AdminComponent implements OnInit{
    
  name:any;
  token:any;
  adminData:any; 

  constructor (

    private toastr:ToastrService, 
    private router:Router, 
    private ngxPermissionsService: NgxPermissionsService,
  ){ 

  } 

  
  ngOnInit(): void {
      this.token = localStorage.getItem('token');   
   // get the token values 
   this.adminData = jwt_decode(this.token);  
   this.name = this.adminData.name;  
  // load permission only for the 'Admin'
  this.ngxPermissionsService.loadPermissions([this.adminData.role]); 

  } 
  logout(){ 
    
    // remove the session token id 
    localStorage.removeItem('token');  
      
    this.toastr.success("Logout Success","",  {
      timeOut:3000,
      progressBar: true
    }); 
    //navigate to login page  
    this.router.navigate(['login']);  
  }  

}
