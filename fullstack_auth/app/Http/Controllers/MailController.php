<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail; 
use App\Mail\Notify; 
// Laravel Mailer : jevenson.p.7789@gmail.com
//htzmykohhejtdfhd : generated password 
class MailController extends Controller
{
    
    public function index()
    { 
        $mailData = [
            'title' => 'Mail from ItSolutionStuff.com',
            'body' => 'This is for testing email using smtp.'
        ];
         
        Mail::to('jevenson.p.7789@gmail.com')->send(new Notify($mailData));
        
        dd("Email is sent successfully.");
    }
}
