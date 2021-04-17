import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

import weekNumber from 'current-week-number';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../models/employee';

import * as $ from 'jquery';
import {Planning} from '../../models/planning';
import {Periode} from '../../models/periode';


export interface PeriodeModel {
  nom: string;
}

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  weekDays: string[] = [];
  currentWeekNumber = weekNumber();
  magasinId: number;
  magasinNom: string;
  employees: Employee[] = [];
  periodes: PeriodeModel[] = [{nom: 'Matin'}, {nom: 'Soir'}, {nom: 'Astreinte'}];

  constructor(private employeeService: EmployeeService,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.getDaysOfCurrentWeek();

    this.activatedRoute.params.subscribe( params => {
      /* tslint:disable:no-string-literal */
      this.magasinId = params['id'];
      this.magasinNom = params['magasin'];
    });

    /* Get employees by magasin id*/
    this.employeeService.getEmployeesByMagasinId(this.magasinId).subscribe( result => {
      this.employees = result;
    });

  }


  getDaysOfCurrentWeek(): void {
    const currentDate = moment();
    currentDate.locale('fr');
    const weekStart = currentDate.clone().startOf('isoWeek');

    for (let i = 0; i <= 6; i++) {
      this.weekDays.push(moment(weekStart).add(i, 'days').format('DD-MM-YYYY'));
    }
  }

  back() {
    this.location.back();
  }

  changeToInputTime(selectId: string, value: string, periode: Periode, day: string, employee: Employee) {
    if ('HM' === value) {
      $('#' + selectId).replaceWith('<input id="start' + selectId + '" type="time"/> <input  id="end' + selectId + '" type="time"/>');
    } else {
      console.log('Data : ', value + ' ' + periode.nom + ' ' + day + ' ' + employee.nomComplet);
    }
  }

  savePlanning() {
    console.log('Save planning ');
  }
}
