<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash; 
use App\Models\User;   

use Tymon\JWTAuth\Facades\JWTAuth; 
use Tymon\JWTAuth\Exceptions\JWTExceptions;   

use Mail; 
use App\Mail\Notify; 
use App\Mail\ResetPasswordMail; 


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon; 


class UserController extends Controller 

{   
     // registration request 
    public function register(Request $request){ 

        $file = $request->file("file") ; 
        $uploadPath = "profile"; //to public folder
        $originalName = $file->getClientOriginalName(); 
        
        $file->move($uploadPath , $originalName) ; 

        // check if there is an existing email 
        $user = User::where('email',$request['email'])->first(); 
        //there's a match email  
        
        if($user){
            $response['status'] = 0;
            $response['message']  = 'Email Already Exists'; 
            $response['code'] = 409; 
        }

        // email not exists . procede to registration 
        else{ 
                    
            $user  = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'profile'=> $originalName, 
                'password' => bcrypt($request->password)
            ]); 

            
            $response['status'] = 1; 
            $response['message'] = 'User Registered Successfully ! '; 
            $response['code'] = 200 ;  




            // email parameters 
            $data  = [
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password
            ];  
            
           Mail::to($data['email'])->send(new Notify($data));
          

        }   
        return response()->json($response); 
     
    }    
//    public function notifyUser(Request $request){ 

//         $mailData = [
//             'title' => 'Mail from Jevenson Peñas',
//             'body' => 'This is for testing email using smtp.'.$request->$email.''.$request->$password
//         ];  

//         Mail::to($request->$email)->send(new Notify($mailData));
//     }

 
        
    // login request 

    public function login(Request $request){

        $credentials = $request->only('email', 'password'); 
        try {
            
            if(!JWTAuth::attempt($credentials)){
                $response['status']  = 0 ; 
                $response['code'] = 401; 
                $response['data']  = null; 
                $response['message'] =  'Email or Password is Incorrect'; 
                return response()->json($response);
            }
            
        } catch (JWTException $e) {
            $response['data']  = null; 
            $response['code'] = 500; 
            $response['message'] =  'Could Not Create Token '; 
            return response()->json($response);
        }
        
        
        // get user details 
        $user = auth()->user();
        $data['token'] = auth()->claims(['user_id' => $user->id, 'email'=> $user->email , 'name' => $user->name, 'profile' => $user->profile , 'role' => $user->role])->attempt($credentials); 
        
        
        $response['data']  = $data; 
        $response['status']  = 1; 
        $response['code'] = 200; 
        $response['message'] =  'Login Successfully';  
        $response['user_id'] = $user->id; 
        $response['role'] = $user->role;
        return response()->json($response);


    } 




     // Send Email for Reset Password 
     public function sendEmail(Request $request){
        // $response['status']  = $request->all();  
        // if($this->validateEmail($request->email)){
        //     return $this->failedResponse(); 
        // }  

        $user = User::where('email', '=' , $request->all())->first();
            if ($user === null) {
                $response['code'] = 404; 
                $response['error'] = "Email Not Found on Our Database "; 
                return response()->json($response); 

            }
            else { 
                $response['code'] = 200; 
                $response['success'] = "Email Send Successfuly , Please Check your Email ";  

             
            $token = $this->createToken($request->email); 

             // email parameters 
            //  $token = Str::random(60);  
            
             $data  = [
                'email' => $request->email,
              
            ];   


            
            // $oldToken  = DB::table('password_resets')->where('email', $data['email'])->first();
            // if($oldToken){ 
            //     return $oldToken; 
            // }

            // else {

            //     DB::insert('insert into password_resets (email, token , created_at) values (?, ? , ? )', [ $data['email'], $token, Carbon::now()]);
            // }
         
            Mail::to($data['email'])->send(new ResetPasswordMail($token));
                    
            return response()->json($response); 
             
            }
        
     }

     public function createToken($email){

        $oldToken = DB::table('password_resets')->where('email',$email)->first();

        if($oldToken){
            return $oldToken->token; 
        }
        $token = Str::random(60);  

        
        $this->saveToken($token,$email); 
        return $token; 

     }


     public function saveToken($token,$email){
        DB::table('password_resets')->insert([
            'email' => $email, 
            'token' => $token,
            'created_at' => Carbon::now()
        ]); 
     }


    // //  To finaly change the password 
    // public function process(Request $request){
    //         // return $this->getPasswordResetTableRow($request)->get();  

    //         # Validation
    //     $request->validate([
    //         'old_password' => 'required',
    //         'new_password' => 'required|confirmed',
    //     ]);



    // }

    // private function getPasswordResetTableRow($request){
    //     return DB::table('password_resets')->where(['email' => $request->mail, 'token'
    //     =>$request->resetToken]); 

    // }
     
    //  public function validateEmail($email){
    //     return !!User::where('email', $email)->first(); 
    //  } 

    //  public function failedResponse(){ 

    //     $response['error'] = "Email Not Found on Our Database "; 
    //     return response()->json($response); 
    //  }



    // public function fetch(Request $request ,$id){ 
    //         // echo $id; 
    //         // $id = Auth::user()->id;
    //         // JWTAuth::user(); 
    //         //  $id = $user->id; 
    //         $data = User::where('id',$id)->get();
    //         return response()->json($data,200); 
    // } 
    

   
    
  
}
