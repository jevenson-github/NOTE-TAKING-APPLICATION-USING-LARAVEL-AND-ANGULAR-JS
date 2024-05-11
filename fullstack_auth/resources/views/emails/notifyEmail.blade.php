<!DOCTYPE html>
<html>
<head>
    <title>Laravel | Angular 15 </title>
</head>
<body> 
    <p>Hey <i>{{$mailData['name']}}</i> , </p>
   <p> 
     We are young Developers , The founder of this team and We would like to personally thank you for signing up to our web application. 
     We established this team in order to accomplish this internship program.
    </p> 
    
    
    <p>Account Information :</p>
    <p>Username : <i>{{$mailData['email']}}</i> | Password : <i>{{$mailData['password']}}</i></p>

<p>Welcome aboard, </p>
<p>The Intern Team</p> 


</body>
</html>