import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlanningComponent} from './components/planning/planning.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {MagasinsComponent} from './components/magasins/magasins.component';


const routes: Routes = [
  {path: 'planning', component: PlanningComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'magasins', component: MagasinsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
