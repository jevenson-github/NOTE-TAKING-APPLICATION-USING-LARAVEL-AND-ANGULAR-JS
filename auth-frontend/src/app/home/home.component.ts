import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr'; 
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder , Validators, FormControl ,FormsModule} from '@angular/forms'; 

import { DataService } from '../service/data.service';

import { RouterTestingHarness } from '@angular/router/testing';
import { VirtualTimeScheduler } from 'rxjs'; 
import { NgxPermissionsService } from 'ngx-permissions';
import { NgxSpinnerService } from "ngx-spinner";  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  

  token:any ; 
  userData: any;
  email:any; 
  id:any; 
  name:any;  
  image:any; 
  // path:any = 'http://127.0.0.1:8000/profile';  
  notesid:any; 
  title:any;
  content:any; 

  // notes data container 
  NotesArray:any[]=[];  
  arrayCount:any;  
  role:any; 
  //for the note creation 
  form:FormGroup; 
  // form2:FormGroup; 
  p: number = 1;
  date:any; 

  submitNote = false; 
  data:any; 
  noteId:any; 
 
  editTitle:any; 
  editContent:any; 
  titleValue:any;
  titleValue2:any;
  contentValue:any;  

  // for keyword  searching 
  keyword:any; 

      constructor (
        private router:Router, 
        private toastr:ToastrService, 
        private http:HttpClient, 
        private dataService: DataService,
        private route:ActivatedRoute ,
        private formBuilder: FormBuilder,
        private formBuilder2: FormBuilder,
        private SpinnerService: NgxSpinnerService, 
        private ngxPermissionsService: NgxPermissionsService,)
        {  


        // load the notes 
        // this.getSpecificNotes();  
      }; 


        ngOnInit(): void {    
          
        //for pagination 
        for (let i = 1; i <= 100; i++) {
          this.NotesArray.push(`item ${i}`);
        } 
        // loading spinner 
          this.SpinnerService.show();
          setTimeout(() => {

              this.SpinnerService.hide();
          }, 2000);


          // setting values to the variables as identifier 
          // get token 
          this.token = localStorage.getItem('token');   
          // get the token values | setting data  | pang partision ng ecrypted token 
          this.userData = jwt_decode(this.token);  
          this.email = this.userData.email;
          this.id = this.userData.user_id; 
          this.name = this.userData.name; 
          this.image  = this.userData.profile;  
          // load permission only for the 'User Side'
          this.ngxPermissionsService.loadPermissions([this.userData.role]); 
          console.log(this.token);  
          console.log(this.userData.email); 
          console.log(this.userData.user_id);  
          console.log(this.userData.name);   

          //load specific notes for only user 
          this.getSpecificNotes();   

          // load here addNote() function for validation 
          this.addNote();  
          this.addNote2();  
          // console.log(this.route.snapshot.params['personal_id']);

        }   

        
  
      // Functon to get specific notes for the user only 
      getSpecificNotes(){   

        this.token = localStorage.getItem('token');   
        // get the token values 
        this.userData = jwt_decode(this.token);  
        this.email = this.userData.email;
        this.id = this.userData.user_id; 
        this.notesid = this.userData.user_id;  
       

        this.http.get("http://127.0.0.1:8000/api/get/"+this.id).subscribe((resultdata:any)=>{


          //  this.isResultLoaded = true; 
          console.log(resultdata); 
          this.NotesArray = resultdata; 
          this.arrayCount = this.NotesArray.length;  


          
          
        
        });  
      }

    // for validation of user notes created 
    addNote(){
      this.form = this.formBuilder.group({
        addTitle:  [null, Validators.required],
        addContent: [null, Validators.required], 
        userId:[this.id, Validators.required],
      }); 
    } 

      // constructor for getter in form array 
      get f(){
        return this.form.controls; 
      }  

      // submit note form 
      submit(){ 
        this.submitNote = true; 
        // invalid form validation 
        if(this.form.invalid){
          return; 
        }  



              // Function fetch all input to insert 
              this.dataService.addUserNotes(this.form.value).subscribe(res  =>{ 
                  this.data = res; 
                  console.log(res);  
                  
                  this.getSpecificNotes();

                    if(this.data.status === 1){ 
                        
                      // this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
                      this.toastr.success("Successfuly Added","Note",{
                      timeOut:2000,
                      progressBar:true,
                    
                    }) ;
                        //reset form  
                        this.submitNote = false;
                        this.form.reset();    
                    }else{
                        alert(" Something went Wrong ! ")
                    }

          }); 
    }
    //Logout Function |  to logout the current user | remove the token 
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

    
  //update Function 
      updateNote(){  

        let bodyData = {  
          "title" : this.editTitle,
          "content" : this.editContent,
        }; 


        
        this.http.put("http://127.0.0.1:8000/api/update"+"/"+this.noteId, bodyData).subscribe(res=>{
          this.data = res; 
            console.log(res);  
            this.getSpecificNotes();  

              if(this.data.status === 1){ 
                // this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
                this.toastr.success("Successfuly Updated","Note",{
                timeOut:2000,
                progressBar:true,
                  
              }) ;
                  //reset form  
                  this.submitNote = false;
                  this.form.reset();    
              }else{
                  alert(" Something went Wrong ! ")
              } 

        });  
      
      console.log(bodyData); 
      } 


      //Populate Form Function 
      setUpdate(data:any){ 
        this.editTitle = data.title; 
        this.editContent  = data.content; 
        this.noteId = data.id;
        // alert(data.id); 
      
    } 
 
    //delete function  | we can add confirmation if we want to delete this data 
    setDelete(data:any){ 
      this.http.delete("http://127.0.0.1:8000/api/delete"+ "/"+data).subscribe((resultData : any)=>{ 

      this.data = resultData; 
      console.log(resultData);  
      this.getSpecificNotes();  

        if(this.data.status === 1){ 
          // this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
                  this.toastr.success("Successfully Deleted .","Note",{
          timeOut:2000,
          progressBar:true,
        }) ;
            //reset form  
            this.submitNote = false;
            this.form.reset();    
        }else{
            alert(" Something went Wrong ! ")
        } 

        // Load again the notes table 
        this.getSpecificNotes(); 
      });
    }





    //2nd note using form builder then collect via formData instantiation . 
    form2:FormGroup; 
    submitNote2 = false; 
    file:any; 


    addNote2(){
      this.form2 = this.formBuilder2.group({
        moa:  [null, Validators.required],
        start_date:  [null, Validators.required],
        end_date:  [null, Validators.required],
      }); 

    } 

    get u(){
      return this.form2.controls; 
    }  
    sample2(){
      this.submitNote2 = true; 
      // invalid form validation 
      if(this.form2.invalid){
        return; 
      }  
      // alert('success insert'); z
      var formData = new FormData(); 
      alert(this.form2.controls['moa'].value+"\n"+this.form2.controls['start_date'].value+"\n"+this.form2.controls['end_date'].value); 
      this.form2.reset();
      this.submitNote2 = false; 
    }

    uploadMoa(event:any){
      // console.log(event); 
      this.file  = event.target.files[0]; 
      console.log(this.file); 
    }
  }
  

