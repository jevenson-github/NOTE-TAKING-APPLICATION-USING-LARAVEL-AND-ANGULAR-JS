<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;  
use App\Http\Controllers\NotesController;   
use App\Http\Controllers\PasswordResetRequestController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Register User 
Route::post('register',[UserController::class, 'register']);

// Route::post('register',[UserController::class, 'notify']);  

// Login User 
Route::post('login', [UserController::class, 'login']);

// Fetch Specific Notes per user 
Route::get('/get/{id}',[NotesController::class,'fetch']); 

// Add Notes 
Route::post('add', [NotesController::class,'addUserNotes']); 

// Update Notes 
Route::put('/update/{id}',[NotesController::class, 'update']); 


//Delete Notes 
Route::delete('/delete/{id}',[NotesController::class, 'destroy']); 
// Route::post('/get', [NotesController::class,'fetch']);



Route::get('all',[NotesController::class,'all']);

// Send PasswordLink
Route::post('sendPasswordResetLink', [UserController::class, 'sendEmail' ]);


// Route::post('/change-password', [PasswordResetRequestController::class, 'passwordResetProcess']);

// Route::post('reset-password-request', [PasswordResetRequestController::class, 'sendPasswordResetEmail' ]); 

// Route::post('change-password', [PasswordResetRequestController::class, 'passwordResetProcess']);