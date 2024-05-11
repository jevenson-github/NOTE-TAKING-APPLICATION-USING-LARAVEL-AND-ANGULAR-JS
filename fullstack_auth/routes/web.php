<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MailController; 
use App\Mail\Notify; 
use Illuminate\Support\Facades\Mail;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', function () {
    // return view('emails/passwordReset');
    return view('welcome');
});

// Route::get('send-email', [MailController::class, 'index']);
// Route::get('send-email', function () {
//     Mail::to('jeremiahnana04@gmail.com')->send(new Notify);
// });
