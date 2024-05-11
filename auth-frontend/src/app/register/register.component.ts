import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';

import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr'; 

import { MustMatch } from '../confirmed.validator';
import { flush } from '@angular/core/testing'; 

import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
}) 


export class RegisterComponent implements OnInit   {
  form:FormGroup; 
  submitted  = false; 


  data :any; 
  // for picture
  file:any; 

  constructor(private formBuilder: FormBuilder , private dataService: DataService , private toastr: ToastrService , private router: Router){} 

  // front-end validation 
  createForm(){ 
    this.form  = this.formBuilder.group({
      name: [null, Validators.required], 
      email : ['', [Validators.required , Validators.email]],       
      password : ['',[Validators.required , Validators.minLength(6) ]], 
      confirmPassword: ['', Validators.required]} ,
      {  validator: MustMatch('password', 'confirmPassword')}); 
  }
  
  
  // function initialization 
  ngOnInit(): void {

      this.createForm(); 
  }

  get f(){
    return this.form.controls; 
  } 


  // ADD CONTET 
  submit(){ 
    // after click submitted set to true 
    this.submitted = true;  

    // invalid form validation 
    if(this.form.invalid){
      return; 
    } 



    //  var  formData  = new FormData(); 
    //  formData.append("file",this.files , this.files.name); 
    //  formData.append("email",this.form.value.name);

    // fetch all input  

    var formData = new FormData(); 
    formData.append("name", this.form.controls['name'].value);   
    formData.append("email", this.form.controls['email'].value); 
    formData.append("file", this.file, this.file.name);   
    formData.append("password", this.form.controls['password'].value);   
    formData.append("confirmPassword", this.form.controls['confirmPassword'].value);   
    
    this.dataService.registerUser(formData).subscribe(res =>{
      this.data  = res; 
      console.log(res);   

      // appear toast message validate 
      if(this.data.status === 1){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true,
          
          
        }) ;



         //reset form  
      this.submitted = false;
      this.form.reset(); 

          // then go to login form
          this.router.navigate(['login']); 

      }else{
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true 
          
        });   
        // go to login form 
        this.router.navigate(['login']);
      }

    }); 
  } 

  // image upload
  imageUpload(event:any){
   console.log(event); 
   this.file  = event.target.files[0]; 
   console.log(this.file); 
  }
}

