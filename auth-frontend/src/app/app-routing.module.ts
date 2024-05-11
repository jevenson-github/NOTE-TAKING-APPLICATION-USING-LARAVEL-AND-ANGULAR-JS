import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotesComponent } from './notes/notes.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [ 


  // {   
  //     path: 'admin/notes',
  //     component:NotesComponent, 
  //   }
  //   ,
  //   {
  //     path:'admin/users',
  //     component:UsersComponent
  //   }
  //   ,
  //   {
  //     path :'admin/dashboard', 
  //     component : DashboardComponent
  //   }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
