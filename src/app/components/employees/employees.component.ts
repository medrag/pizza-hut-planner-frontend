import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeModalComponent} from '../employee-modal/employee-modal.component';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../models/employee';
import {Subject} from 'rxjs';
import {MagasinService} from '../../services/magasin.service';
import {Magasin} from '../../models/magasin';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  employeeList: Employee[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  magasinsList: Magasin[] = [];

  constructor(private modalService: NgbModal,
              private employeeService: EmployeeService,
              private magasinService: MagasinService,
              private router: Router) {
  }

  ngOnInit() {
    this.dtOptions = {
      paging: true,
      pagingType: 'simple_numbers',
      pageLength: 10,
      ordering: false,
      stateSave: true,
      lengthChange: false,
      info: false,
      dom: 'lfrtp',
      language: {
        url: '/assets/resources/datatable-french.json'
      },
      autoWidth: false
    };

    this.employeeService.getEmployees()
      .subscribe(result => {
        this.employeeList = result;
        this.dtTrigger.next();
      });

    this.magasinService.getMagasins()
      .subscribe(result => {
        this.magasinsList = result;
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

  filterEmployees(selectValue: string) {
    const magasinId = Number(selectValue);
    if (magasinId === 0) {
      this.employeeService.getEmployees()
        .subscribe( result => {
          this.employeeList = result;
        });
    } else {
      this.employeeService.getEmployeesByMagasinId(Number(selectValue))
        .subscribe( result => {
          this.employeeList = result;
        });
    }
  }

  openPlanning(employeeId: number) {
    this.router.navigate(['planning/' + employeeId]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}


