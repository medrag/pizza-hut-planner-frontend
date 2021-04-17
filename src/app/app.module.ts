import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlanningComponent} from './components/planning/planning.component';
import {NgbModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './components/navbar/navbar.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {EmployeeModalComponent} from './components/employee-modal/employee-modal.component';
import {MagasinsComponent} from './components/magasins/magasins.component';
import {MagasinModalComponent} from './components/magasin-modal/magasin-modal.component';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeService} from './services/employee.service';
import {MagasinService} from './services/magasin.service';
import {DataTablesModule} from 'angular-datatables';
import { PlanningEmployeeComponent } from './components/planning-employee/planning-employee.component';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PlanningComponent,
    NavbarComponent,
    EmployeesComponent,
    EmployeeModalComponent,
    MagasinsComponent,
    MagasinModalComponent,
    PlanningEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbTimepickerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
  ],
  entryComponents: [EmployeeModalComponent, MagasinModalComponent],
  providers: [EmployeeService, MagasinService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
