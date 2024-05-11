import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { 
    
  }

  
  // register servie api 
  registerUser(data:any){
    return this.http.post(environment.apiUrl+'api/register/', data); 
  }

  //login service api 
  login(data:any){
    return this.http.post(environment.apiUrl+'api/login/', data); 
  }
  
  
  // fetch the specific notes for logged in user 
  fetchPersonalNotes(user_id:any){
    return this.http.get(environment.apiUrl+'api/get/'+user_id); 
  } 

  // insert notes 
  addUserNotes(data:any){
    return this.http.post(environment.apiUrl+'api/add/', data); 
  }
  
  // updateNotes(id:any , data:any){
  //   return this.http.put
  // }

fetchAllNotes(){
  return this.http.get(environment.apiUrl+'api/all'); 
}

// for reset password link sending 
sendPasswordResetLink(data:any){
  return this.http.post(environment.apiUrl+'api/sendPasswordResetLink', data); 
}



}