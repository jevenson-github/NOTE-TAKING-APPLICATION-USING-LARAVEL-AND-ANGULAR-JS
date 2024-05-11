import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { 
  AllNotes:any[] =[];
  notesCount:any;
  lineChart:any;
  barChart:any; 
  areaChart: any;
  arrayData_userCount:any[] = []; 
  arrayData_userName:any[] = [];

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
        this.AllNotes = resultdata;  
        this.notesCount  = this.AllNotes.length; 
        // this.arrayCount = this.NotesArray.length;  



        // /loop or push muna naten yung specific values ng json data 
         for (var val of this.AllNotes) {
          console.log(val.count); 
            this.arrayData_userName.push(val.name); 
           this.arrayData_userCount.push(val.count); // prints | holds values: [10, 20, 30, 40]
        }  
          //line chart analytics 
          this.lineChart = new Chart({ 
              chart:  {
                // type: 'pie'
              },
              xAxis:{
                categories:this.arrayData_userName
                // ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            yAxis: {          
              title:{
                 text:"Note Count"
              } 
           },
              title:  {text: 'User Notes Analytics'},
              credits:{enabled: false},
              series: [
                { 
                  name: 'Notes Count', 
                  color:'violet',
                  type: 'spline',
                  
                data:this.arrayData_userCount
                } as any
              ]
            }); 




         //bar chart analytics 
         this.barChart = new Chart({ 
          chart:  {
            // type: 'pie'
          },
          xAxis:{
            categories:this.arrayData_userName
            // ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        yAxis: {          
          title:{
             text:"Note Count"
          } 
       },
          title:  {text: 'User Notes Analytics'},
          credits:{enabled: false},
          plotOptions : {
            area: {
               fillOpacity: 0.4, 
              
            }
         },
          series: [
            { 
              name: 'Notes Count', 
              color:'#6805f3',
              type: 'column',

            data:this.arrayData_userCount 
            } as any
          ]
        });   



        // area chart
         this.areaChart = new Chart({ 
          chart: {
            type: 'area'
         },
         title: {
            text: 'Average Notes Creation'
         },
         credits:{enabled: false},
         subtitle : {
            style: {
               position: 'absolute',
               right: '0px',
               bottom: '10px'
            }
         },
         legend : {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: -150,
            y: 100,
            floating: true,
            borderWidth: 3,
            backgroundColor: '#ffffff', 
         
         },
         xAxis:{
          categories:this.arrayData_userName
         },
         
        //  tooltip : {
        //     formatter: function () {
        //        return '<b>' + this.series.name + '</b><br/>' +
        //           this.x + ': ' + this.y;
        //     }
        //  },
         plotOptions : {
            area: {
               fillOpacity: 0.0, 
           
            }
         },
        //  credits:{
        //     enabled: false
        //  },
         series: [

            {
              data:this.arrayData_userCount, 
              color: '#7a06ed'
            }as any
         ]


        });   
        


      });   
      
    } 


   
}
