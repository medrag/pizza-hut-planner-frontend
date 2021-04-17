import { Component, OnInit } from '@angular/core';
import {DatePipe, Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {PeriodeModel} from '../planning/planning.component';
import {Employee} from '../../models/employee';
import {EmployeeService} from '../../services/employee.service';
import * as moment from 'moment';
import {Periode} from '../../models/periode';
import {Jour} from '../../models/jour';
import {Planning} from '../../models/planning';
import weekNumber from 'current-week-number';
import {EmployeePlanningService} from '../../services/employee-planning.service';
import {PlanningPostWrapper} from '../../models/planningPostWrapper';

@Component({
  selector: 'app-planning-employee',
  templateUrl: './planning-employee.component.html',
  styleUrls: ['./planning-employee.component.css']
})
export class PlanningEmployeeComponent implements OnInit {

  currentWeekNumber = weekNumber();
  weekDays: string[] = [];
  employeeId: number;
  employee: Employee = new Employee();
  periodes: PeriodeModel[] = [{nom: 'Matin'}, {nom: 'Soir'}, {nom: 'Astreinte'}];
  days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  planifiedPeriodes: Periode[] = [];
  planifiedJours: Jour[] = [];
  employeePlanning: Planning = new Planning();
  planningPostWrapper: PlanningPostWrapper = new PlanningPostWrapper();

  constructor(private location: Location,
              private activatedRoute: ActivatedRoute,
              private employeeService: EmployeeService,
              private employeePlanningService: EmployeePlanningService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.getDaysOfCurrentWeek();
    this.activatedRoute.params.subscribe( params => {
      /* tslint:disable:no-string-literal */
      this.employeeId = params['employee'];
    });

    this.employeeService.getEmployeeById(this.employeeId)
      .subscribe(result => {
        this.employee = result;
      });
  }

  getDaysOfCurrentWeek(): void {
    const currentDate = moment();
    currentDate.locale('fr');
    const weekStart = currentDate.clone().startOf('isoWeek');

    for (let i = 0; i <= 6; i++) {
      this.weekDays.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD'));
    }
  }

  back() {
    this.location.back();
  }

  changeSelectValue(selectValue: any, periodeName: string, day: string) {
    const periode = new Periode();
    periode.nom = periodeName;
    periode.valeur = selectValue;

    const jourIndex = this.planifiedJours.findIndex(jour => jour.date.getTime() === new Date(day).getTime());

    if (jourIndex > -1) {
      const savedJour = this.planifiedJours[jourIndex];
      periode.jour = savedJour;
      // check if periode exists already
      const periodeIndex = this.planifiedPeriodes.findIndex(
        savedPeriode => savedPeriode.nom === periode.nom && savedPeriode.jour.date.getTime() === new Date(day).getTime());
      if (periodeIndex > -1) {
        this.planifiedPeriodes[periodeIndex] = periode;
      } else {
        this.planifiedPeriodes.push(periode);
      }
    } else {
      const date = new Date(day);
      const jour = new Jour();
      jour.nom = this.days[date.getDay()];
      jour.date = date;
      jour.planning = this.employeePlanning;
      periode.jour = jour;
      this.planifiedPeriodes.push(periode);
      this.planifiedJours.push(jour);
    }
    console.log('les périodes sauvegardés : ', this.planifiedPeriodes);
    console.log('les jours sauvegardés : ', this.planifiedJours);
  }

  savePlanning() {
    this.employeePlanning.semaine = this.currentWeekNumber;
    this.employeePlanning.employee = this.employee;

    console.log('Planning sauvegardé', this.employeePlanning);
    console.log('les jours sauvegardés : ', this.planifiedJours);

    this.planningPostWrapper.planning = this.employeePlanning;
    this.planningPostWrapper.jours = this.planifiedJours;
    this.planningPostWrapper.periodes = this.planifiedPeriodes;

    this.employeePlanningService.saveEmployeePlannning(this.planningPostWrapper)
      .subscribe( result => {
        console.log(result);
      });
  }

}
