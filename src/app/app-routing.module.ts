import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlanningComponent} from './components/planning/planning.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {MagasinsComponent} from './components/magasins/magasins.component';
import {PlanningEmployeeComponent} from './components/planning-employee/planning-employee.component';


const routes: Routes = [
  {path: 'planning/:employee', component: PlanningEmployeeComponent},
  {path: 'planning/:id/:magasin', component: PlanningComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'magasins', component: MagasinsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
