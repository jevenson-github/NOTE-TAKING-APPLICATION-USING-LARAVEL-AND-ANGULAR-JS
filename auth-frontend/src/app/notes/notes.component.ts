import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  AllNotes:any[] =[];
  notesCount:any;

  constructor(
    private dataService: DataService,
    private http:HttpClient, ){
  }; 


    ngOnInit(): void { 
      this.getAllNotes();
    }
    

    getAllNotes(){
      this.dataService.fetchAllNotes().subscribe((resultdata:any)=>{
        //  this.isResultLoaded = true; 
        console.log(resultdata); 
        this.AllNotes= resultdata; 
        this.notesCount  = this.AllNotes.length; 
        // this.arrayCount = this.NotesArray.length;  
        
      });  
    }
}
