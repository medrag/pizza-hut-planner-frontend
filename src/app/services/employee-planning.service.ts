import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Planning} from '../models/planning';
import {PlanningPostWrapper} from '../models/planningPostWrapper';

@Injectable({
  providedIn: 'root'
})
export class EmployeePlanningService {

  constructor(private http: HttpClient) { }

  private planningAPIUrl = 'http://localhost:8092/pizza-hut/api/plannings';

  public saveEmployeePlannning(planningPostWrapper: PlanningPostWrapper) {
    return this.http.post<Planning>(this.planningAPIUrl + '/save', planningPostWrapper);
  }
}
