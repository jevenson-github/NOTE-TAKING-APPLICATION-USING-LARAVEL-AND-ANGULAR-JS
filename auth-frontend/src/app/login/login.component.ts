import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  submitted = false; 
  form:FormGroup; 
  data:any; 
  token:any; 
  constructor(
    private dataService:DataService , 
    private toastr:ToastrService , private formBuilder: FormBuilder , private router:Router){}

  loginForm(){
    this.form = this.formBuilder.group({
        email: ['',[Validators.required ,  Validators.email]],
        password: ['',[Validators.required]]
    })
  }
  ngOnInit(): void {
    this.loginForm();
  }
 
  get f(){
   return this.form.controls; 
  }
  submit(){
    this.submitted = true; 
    if(this.form.invalid){
        return ; 
    } 

    this.dataService.login(this.form.value).subscribe(res => {
      this.data = res; 
      

      console.log(res);   
      // success login 
      if(this.data.status === 1){
          this.token = this.data.data.token; 

          localStorage.setItem('token', this.token); 
          this.toastr.success("Welcome  " +this.data.role, JSON.stringify(this.data.code), {
              timeOut:2000,
              progressBar: true
          });   
          
            // then go to dashboard and depends on the user roles 
          console.log(this.data.role)

          
           if(this.data.role == "User"){ 
            // navigate to user side 
            this.router.navigate(['/']);  
            
           }else if(this.data.role == "Admin"){ 
                // navigate to admin side 
              this.router.navigate(['admin']);  
           }
           
      } 

      // unsuccess login 
      else if(this.data.status === 0 ){
        this.toastr.error("Maybe your password or username is not correct .", "Account not Found " , {
          timeOut:5000,
          // progressBar: true
      });   
      } 


    });


  }
}
