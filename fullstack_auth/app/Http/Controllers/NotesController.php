<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\notes; 


class NotesController extends Controller
{
    //   
    public function fetch(Request $request , $id){ 
        // echo $id; 
        // $id = Auth::user()->id;
        // JWTAuth::user(); 
        //  $id = $user->id; 
        $data = notes::where('user_id', '=',  $id)->orderBy('id', 'desc')->get();
        
        return response()->json($data,200); 
} 


public function addUserNotes(Request $request){ 

    $user  = notes::create([
        'user_id' => $request->userId,
        'title' =>   $request->addTitle,
        'content' => $request->addContent,
    ]); 
    
    $response['status'] = 1 ; 
    $response['message'] = 'Successfuly Added'; 
    $response['code'] = 200 ;   


    return response()->json($response);

}
// public function fetch(){ 

//     $notes = notes::all(); 
//     return response()->json($notes); 
// } 



// update Function 
public function update(Request $request, $id)
{ 

    
   $notes = notes::find($id);
   $notes->update($request->all()); 

   $response['status'] = 1 ; 
   $response['message'] = 'Successfuly Updated'; 
   $response['code'] = 200 ;   

   return response()->json($response);
}

//delete
public function destroy($id){
    $notes = notes::find($id); 
    $notes->delete(); 

    $response['status'] = 1 ; 
    $response['message'] = ' Successfuly Deleted'; 
    $response['code'] = 200 ;   
 
    return response()->json($response);
    
} 


//fetch notes and users for admin 
public function all(){
    // joining tables 
    // $data = notes::leftJoin('users', 'users.id', '=', 'notes.user_id')->get();
    // $data = notes::select('user_id')->groupBy('user_id')->get(); 
    // $data = notes::leftJoin('users', 'users.id', '=', 'notes.user_id')->select(notes::raw("COUNT('*') as content"),)->groupBy(notes::raw("user_id"))->get(); 
    

   // $data = notes::join('users','users.id' ,'=' ,'programs.lead_id')->select('users.name','users.profile', notes::raw("COUNT('notes.content') as count"))->groupBy('notes.user_id')->get(); 
    $data = notes::join('users','users.id' ,'=' ,'notes.user_id')->select('users.name','users.profile', notes::raw("COUNT('notes.content') as count"))->groupBy('notes.user_id')->get(); 
    return response()->json($data, 200);


    
}
}