import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

interface teacher {
  
  id: number;
  name: string;
  age: number;
  
}
@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  dummyData : teacher[] = [
    {id:1,name: 'Siripala Nonis', age:54},
    {id:2,name: 'Padma Gamage', age:44},
    {id:3,name: 'Maduranga Athapaththu', age:34},
  ]
  teacherData: teacher[]= this.dummyData;
  selected: any;

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher() {
    this.router.navigate(['addTeacher'])
  }

  editTeacher(id) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['editTeacher'], navigationExtras)
  }

  initializeDB(){
    this.service.initializeDB().subscribe((response) => {
      console.log('DB is Initialized')
    }, (error) => {
      console.log('ERROR - ', error)
    })
  }

  getTeacherData() {
    this.selected = 'Teachers';
    this.service.getTeacherData().subscribe((response) => {
      this.teacherData = Object.keys(response).map((key) => response[key]);
    }, (error) => {
      console.log('ERROR - ', error)
    })
  }
 
    
  deleteTeacher(itemid) {
    const test = {
      id: itemid
    }
    this.service.deleteTeacher(test).subscribe((response) => {
      this.getTeacherData()
    })
  }

  search(value:string) {
    let foundItems:teacher[]= [];
    if (value.length <= 0) {
      this.getTeacherData();
    } else {
      foundItems= this.teacherData.filter((teacher) => 
         teacher[0].name.toLowerCase().includes(value.toLowerCase())
          
      );
      this.teacherData = foundItems;
    }
    
  }

}