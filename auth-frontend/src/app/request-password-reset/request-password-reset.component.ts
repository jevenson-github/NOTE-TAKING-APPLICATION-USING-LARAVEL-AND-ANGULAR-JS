import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.css']
})
export class RequestPasswordResetComponent implements OnInit{ 

  form  = {
  email:null
} 

data:any; 
 
resetForm: FormGroup;
errors:any;
successMsg:any;

constructor( 
  private dataservice:DataService,
  private toastr:ToastrService, 
  private fb: FormBuilder,
  
  ){

    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })

}
  ngOnInit() {
    
  }

  onSubmit(){ 

      alert('You Press the reset password button ok ! '); 

      this.dataservice.sendPasswordResetLink(this.form).subscribe(res => {
        this.data = res; 
        

        if(this.data.code === 404){
              this.toastr.error(this.data.error,this.data.code, {
                timeOut:2000,
                progressBar: true
            });
            console.log(this.data.error);  

        }else {
          this.toastr.success(this.data.success,this.data.code, {
            timeOut:2000,
            progressBar: true
        }); 
        console.log(this.data.success);  
        }
       

      });  

//  this.dataservice.sendPasswordResetLink(this.resetForm.value).subscribe(
//       (result) => {
//         this.successMsg = result;
//       },(error) => {
//         this.errors = error.error.message;
//       })
  } 



  // handleResponse(res:any){
  //   console.log(res); 
  //   this.form.email = null
  // }
}
