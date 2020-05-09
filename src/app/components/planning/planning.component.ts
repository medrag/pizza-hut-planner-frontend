import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {EmployeePlanning} from '../../models/employee-planning';
import {EmployeePlanningService} from '../../services/employee-planning.service';
import {Employee} from '../../models/employee';
import {Planning} from '../../models/planning';

import weekNumber from 'current-week-number';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  weekDays: string[] = [];
  employeesPlanning: EmployeePlanning[] = [];
  employee: Employee = new Employee();
  planning: Planning = new Planning();
  currentWeekNumber = weekNumber();

  constructor(private employeePlanningService: EmployeePlanningService) {
  }

  ngOnInit() {
    this.getDaysOfCurrentWeek();

    this.employeePlanningService.getEmployeesPlanning().subscribe( result => {
      console.log(result);
      this.employeesPlanning = result as EmployeePlanning[];
      this.employee = this.employeesPlanning[0].employee;
      this.planning = this.employeesPlanning[0].planning;
    });
  }

  getDaysOfCurrentWeek(): void {
    const currentDate = moment();
    currentDate.locale('fr');
    const weekStart = currentDate.clone().startOf('isoWeek');

    for (let i = 0; i <= 6; i++) {
      this.weekDays.push(moment(weekStart).add(i, 'days').format('dddd, Do MMMM YYYY'));
    }
  }
}
