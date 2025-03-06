import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import {AppServiceService} from '../../app-service.service';

interface Student {
  id: number;
  name: string;
  age: number;
  hometown: string;
}
@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
 
  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  dummyData: Student[]= [
    {id:1,name: 'Amal Perera',age:23,hometown:'Colombo'},
    {id:2,name: 'Nadun Wijesiri',age:28,hometown:'Gampaha'},
    {id:3,name: 'Sawani Natasha',age:26,hometown:'Kandy'},
  ]
  studentData:Student[] = this.dummyData;
  selected: any;
 
  constructor(private service : AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
    
  }

  addNewStudent(){
    this.router.navigate(['addStudent'])
  }

  editStudent(id){
    const navigationExtras: NavigationExtras = {
      state: {
        id : id
      }
    };
    this.router.navigate(['editStudent'], navigationExtras )
  }

  getStudentData(){
    this.service.getStudentData().subscribe((response)=>{
      this.studentData = Object.keys(response).map((key) => response[key]);
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

  deleteStudent(itemid){
    const student = {
      id: itemid
    }
    this.service.deleteStudent(student).subscribe((response)=>{
      this.getStudentData()
    })
  }

  search(value:string) {
    let foundItems:Student[] = [];
    if (value.length <= 0) {
      this.getStudentData();
    } else {
      foundItems = this.studentData.filter((student) => 
         student.name.toLowerCase().includes(value.toLowerCase())
          
      );
      this.studentData = foundItems;
    }
    
  }
}
  
