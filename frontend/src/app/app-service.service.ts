import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  readonly ROOT_URL:string;

  constructor(private http: HttpClient) {
    if(environment.production == false){
      this.ROOT_URL = 'test';
      
    }else{
      this.ROOT_URL = 'api';
    }
  }

  initializeDB(){
    return this.http.get(`/${this.ROOT_URL}/dbinitialize`)
  }

  getTeacherData(){
    return this.http.get(`/${this.ROOT_URL}/api/listTeachers`)
  }

  getStudentData(){
    return this.http.get(`/${this.ROOT_URL}/api/listStudents`)
  }

  getOneStudentData(payload: Object){
    return this.http.post(`/${this.ROOT_URL}/api/getStudentInfo`, payload)
  }

  getOneTeacherData(payload: Object){
    return this.http.post(`/${this.ROOT_URL}/api/getTeacherInfo`, payload)
  }

  addTeacher(payload: Object){
    return this.http.post(`/${this.ROOT_URL}/api/addTeacher`, payload)
  }

  addStudent(payload: Object){
    return this.http.post(`/${this.ROOT_URL}/api/addStudent`, payload)
  }

  deleteTeacher(payload: Object){
    return this.http.post(`/${this.ROOT_URL}/api/deleteTeacher`, payload)
  }

  deleteStudent(payload: Object){
    return this.http.post(`/${this.ROOT_URL}/api/deleteStudent`, payload)
  }

  editTeacher(payload: Object){
    return this.http.post(`/${this.ROOT_URL}/api/editTeacher`, payload)
  }

  editStudent(payload: Object){
    return this.http.post(`/${this.ROOT_URL}/api/editStudent`, payload)
  }

  searchStudent(payload: Object){
    return this.http.get(`/${this.ROOT_URL}/api/searchStudent`, payload)
  }
  searchTeacher(payload: Object){
    return this.http.get(`/${this.ROOT_URL}/api/searchTeacher`, payload)
  
  }
}