<!DOCTYPE html>
<html>
<head>
    <title>Laravel | Angular 15 </title>
</head>
<style>

</style>
<body> 
    
    <p>Reset Password Link </p>
    {{-- <h3>Hello , {{$mailData['email']}} !</h3> --}}

    <p> 
     We are young Developers , The founder of this team and We would like to personally thank you for signing up to our web application. 
     We established this team in order to accomplish this internship program.
    </p> 
    
    {{-- @component('mail::button', ['url' => 'http://localhost:4200/change-password'])
            Reset Password
    @endcomponent  --}}

    {{-- <h4>Password Reset Details </h4>
    <p>
        Email : {{$mailData['email']}} 

    </p> --}}
{{--     
    <p> <b>Please click the button to reset your password</b> </p>
    <a href="http://localhost:4200/change-password?token={{$token['token']}}">
    <button  class="button" >Click Me </button>
    </a>  --}}
    <p> 
       Your Token for Password Reset  : {{$token}} 
    </p> 
    <p>
        As of now this works on our local machine , as if this is not yet been deployed to a production server . 
    </p>
    <p> 
        Click the button to follow the link in Reseting Your Password
        <a href="http://localhost:4200/change-password?token={{$token}}">
            <button  class="button" >Reset Password  </button>
        </a>
    </p> 

<p>Thank You, </p>
<p>The Intern Team</p> 


</body>
</html>


{{-- @component('mail::message')
# Reset Password
Reset or change your password.
@component('mail::button', ['url' => 'http://localhost:4200/change-password?token='.$token])
Change Password
@endcomponent
Thanks,<br>
{{ config('app.name') }}
@endcomponent --}}


{{-- <x-mail::message>
# Order Shipped
 
Your order has been shipped!
 
<x-mail::button :url="$url">
View Order
</x-mail::button>
 
Thanks,<br>
{{ config('app.name') }}
</x-mail::message> --}}
{{-- 
@component('mail::panel')
This is the panel content.
@endcomponent --}}
