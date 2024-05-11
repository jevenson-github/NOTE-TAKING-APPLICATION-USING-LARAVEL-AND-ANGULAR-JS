//to save the token from JWT 
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'   
})

export class AuthGuard implements CanActivate{
    constructor(private router:Router){}

    token:any; 
    canActivate():any{ 

        // get the set token coming from the sign-in 
        this.token = localStorage.getItem('token'); 
        
        if(this.token){
            return true; 
        }
        else{
            //return to login page all of the user 
            this.router.navigate(['login']); 
        }
    }
}