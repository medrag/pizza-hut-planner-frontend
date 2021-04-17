import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  private employeeAPIUrl = 'http://localhost:8092/pizza-hut/api/employees';

  public getEmployees() {
    return this.http.get<Employee[]>(this.employeeAPIUrl);
  }

  public getEmployeeById(employeeId: number) {
    return this.http.get<Employee>(this.employeeAPIUrl + '/' + employeeId);
  }

  public addEmployee(employee: Employee) {
    return this.http.post<Employee>(this.employeeAPIUrl + '/ajouter', employee);
  }

  public editEmployee(employee: Employee) {
    return this.http.put<Employee>(this.employeeAPIUrl + '/modifier', employee);
  }

  public deleteEmployee(employeeId: number) {
    return this.http.delete(this.employeeAPIUrl + '/' + employeeId);
  }

  public getEmployeesByMagasinId(magasinId: number) {
    return this.http.get<Employee[]>(this.employeeAPIUrl + '/magasin/' + magasinId);
  }
}
