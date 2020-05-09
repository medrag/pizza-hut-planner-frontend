import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeePlanning} from '../models/employee-planning';

@Injectable({
  providedIn: 'root'
})
export class EmployeePlanningService {

  constructor(private http: HttpClient) { }

  private planningAPIUrl = 'http://localhost:8092/pizza-hut/api/plannings';

  public getEmployeesPlanning() {
    return this.http.get<EmployeePlanning[]>(this.planningAPIUrl + '/employees');
  }
}
