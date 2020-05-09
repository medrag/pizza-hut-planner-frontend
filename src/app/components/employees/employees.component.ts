import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeModalComponent} from '../employee-modal/employee-modal.component';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../models/employee';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  employeeList: Employee[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private modalService: NgbModal, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.dtOptions = {
      paging: false,
      ordering: false,
      info: false,
      language: {
        url: '/assets/resources/datatable-french.json'
      }
    };

    this.employeeService.getEmployees()
      .subscribe(result => {
        this.employeeList = result;
        this.dtTrigger.next();
      });
  }

  openModal(action: string, employee: Employee): void {
    const modalRef = this.modalService.open(EmployeeModalComponent, {centered: true, backdrop: 'static'});

    if ('add' === action) {
      modalRef.componentInstance.modalAction = 'add';
      modalRef.result.then((result) => {
        if (result && result !== 'closed') {
          this.employeeService.addEmployee(result)
            .subscribe( data => {
              this.employeeList.push(data);
            });
        }
      });
    } else if ('edit' === action) {
      modalRef.componentInstance.modalAction = 'edit';
      modalRef.componentInstance.employee = employee;
      modalRef.result.then((result) => {
        if (result && result !== 'closed') {
          this.employeeService.editEmployee(result)
            .subscribe( data => {
              const index = this.employeeList.indexOf(employee);
              this.employeeList[index] = data;
            });
        }
      });
    } else {
      modalRef.componentInstance.modalAction = 'delete';
      modalRef.componentInstance.employee = employee;
      modalRef.result.then((result) => {
        if (result && result === 'confirmed') {
          this.employeeService.deleteEmployee(employee.id)
            .subscribe( data => {
              this.employeeList = this.employeeList.filter(savedEmployee => savedEmployee !== employee);
            });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}


